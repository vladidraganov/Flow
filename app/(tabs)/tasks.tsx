import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Modal,
  Animated,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";
import Header from "@/components/header";

const screenHeight = Dimensions.get("window").height;

interface Task {
  id: number;
  title: string;
  category: string;
  xp_reward?: number;
  user_id?: string;
}

const TasksScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [personalTasks, setPersonalTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [activeTab, setActiveTab] = useState<"daily" | "personal">("daily");
  const [completedTasks, setCompletedTasks] = useState<Record<number, boolean>>({});
  const [fadeAnims, setFadeAnims] = useState<Record<number, Animated.Value>>({});

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase.from("tasks").select("*");
      if (error) {
        console.error("Error fetching tasks:", error);
        return;
      }

      const dailyTasks = data?.filter(task => task.category === "daily") || [];
      const personal = data?.filter(task => task.category === "personal") || [];

      setTasks(dailyTasks as Task[]);
      setPersonalTasks(personal as Task[]);

      // Initialize fade animations
      const animations: Record<number, Animated.Value> = {};
      [...dailyTasks, ...personal].forEach(task => {
        animations[task.id] = new Animated.Value(1);
      });
      setFadeAnims(animations);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  const addTask = async () => {
    if (newTask.trim() === "") return;

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        console.error("Authentication error:", authError);
        return;
      }

      const { data, error } = await supabase
        .from("tasks")
        .insert([{ title: newTask, user_id: user.id, category: "personal", xp_reward: 10 }])
        .select();

      if (error) {
        console.error("Error adding task:", error);
        return;
      }

      if (data && data.length > 0) {
        setPersonalTasks(prevTasks => [...prevTasks, data[0] as Task]);
      }

      setNewTask("");
      setModalVisible(false);
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  const markTaskComplete = async (task: Task) => {
    setCompletedTasks(prev => ({ ...prev, [task.id]: true }));
  
    try {
      
      const { data, error } = await supabase
        .rpc("add_xp", {
          p_user_id: task.user_id as string,  // Ensure it's passed as a string
          p_xp: task.xp_reward || 10,         // Use default XP of 10
        });
  
      if (error) {
        console.error("Error updating XP:", error);
        return;
      }
  
      console.log("XP added successfully:", data);
  
      // Start fade-out animation
      Animated.timing(fadeAnims[task.id], {
        toValue: 0,
        duration: 2000, // 2 seconds fade out
        useNativeDriver: true,
      }).start(async () => {
        // Remove from database after animation completes
        await removeTask(task);
      });
    } catch (err) {
      console.error("Error marking task complete:", err);
    }
  };
  

  const removeTask = async (task: Task) => {
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", task.id);
      if (error) {
        console.error("Error deleting task:", error);
        return;
      }

      // Remove from state
      setTasks(prevTasks => prevTasks.filter(t => t.id !== task.id));
      setPersonalTasks(prevTasks => prevTasks.filter(t => t.id !== task.id));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };



  const renderTask = (task: Task) => (
    <Animated.View
      key={task.id}
      style={{ opacity: fadeAnims[task.id] }} // Apply fade-out effect
      className="bg-[#151C32] mx-4 my-2 rounded-xl overflow-hidden"
    >
      <View className="flex-row items-center justify-between p-4">
        <Text className="text-white text-base font-medium">{task.title}</Text>
        <View className="flex-row items-center">
          <Text className="text-yellow-500 mr-2">+{task.xp_reward || 10} XP</Text>
          <TouchableOpacity
            onPress={() => markTaskComplete(task)}
            className={`px-4 py-2 rounded-lg ${completedTasks[task.id] ? "bg-green-600" : "bg-[#29366D]"}`}
          >
            <Text className="text-white font-medium">
              {completedTasks[task.id] ? "Completed" : "Complete"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#0A0E1F]">
      <Header />

      <View className="mt-6 mb-4 px-4">
        <Text className="text-white text-2xl font-bold">Your tasks</Text>
      </View>

      <View className="flex-row mx-4 mb-4">
        <TouchableOpacity
          onPress={() => setActiveTab("daily")}
          className={`py-2 px-6 rounded-full mr-2 ${activeTab === "daily" ? "bg-[#3366FF]" : "bg-[#1A2244]"}`}
        >
          <Text className="text-white font-medium">Daily</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("personal")}
          className={`py-2 px-6 rounded-full ${activeTab === "personal" ? "bg-[#3366FF]" : "bg-[#1A2244]"}`}
        >
          <Text className="text-white font-medium">Personal</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {activeTab === "daily"
          ? tasks.map(renderTask)
          : personalTasks.map(renderTask)
        }

        <View className="h-20" />
      </ScrollView>

      {activeTab === "personal" && (
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="absolute bottom-20 right-6 w-14 h-14 rounded-full bg-[#3366FF] items-center justify-center shadow-lg"
        >
          <FontAwesome5 name="plus" size={24} color="white" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default TasksScreen;
