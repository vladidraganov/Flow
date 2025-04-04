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
  id: string; // Changed to string since your IDs are UUID
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
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({}); // Changed to string
  const [fadeAnims, setFadeAnims] = useState<Record<string, Animated.Value>>({}); // Changed to string

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
      const animations: Record<string, Animated.Value> = {};
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

      // Set XP to 0 for personal tasks
      const xpReward = activeTab === "personal" ? 0 : 10;

      const { data, error } = await supabase
        .from("tasks")
        .insert([{ title: newTask, user_id: user.id, category: activeTab, xp_reward: xpReward }])
        .select();

      if (error) {
        console.error("Error adding task:", error);
        return;
      }

      if (data && data.length > 0) {
        if (activeTab === "personal") {
          setPersonalTasks(prevTasks => [...prevTasks, data[0] as Task]);
        } else {
          setTasks(prevTasks => [...prevTasks, data[0] as Task]);
        }
      }
      
      // Handle animations for new task
      setFadeAnims(prev => ({
        ...prev,
        [data[0].id]: new Animated.Value(1), // Ensure the new task's fade animation is added
      }));

      setNewTask("");
      setModalVisible(false);
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  const markTaskComplete = async (task: Task) => {
    setCompletedTasks(prev => ({ ...prev, [task.id]: true }));

    try {
      if (task.xp_reward && task.xp_reward > 0) {
        const { data, error } = await supabase.rpc("add_xp", {
          p_user_id: task.user_id as string,
          p_xp: task.xp_reward,
        });

        if (error) {
          console.error("Error updating XP:", error);
        } else {
          console.log("XP added successfully:", data);
        }
      }

      // Ensure fade animation exists before animating
      if (fadeAnims[task.id]) {
        Animated.timing(fadeAnims[task.id], {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }).start(async () => {
          await removeTask(task);
        });
      } else {
        console.warn(`No animation reference for task ID: ${task.id}`);
        await removeTask(task);
      }
    } catch (err) {
      console.error("Error marking task complete:", err);
    }
  };

  const removeTask = async (task: Task) => {
    try {
      console.log("Attempting to delete task with ID:", task.id);

      const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
          console.error("Authentication error:", authError);
          return;
    }


      // Changed to use single instead of select()
      const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", task.id)
        .eq("user_id", user.id); // Ensure user ID matches
      
      if (error) {
        console.error("Error deleting task:", error);
        return;
      }
      
      console.log(`Task with ID ${task.id} was successfully deleted from the database.`);
      
      // Remove task from both local state arrays
      setTasks(prevTasks => prevTasks.filter(t => t.id !== task.id));
      setPersonalTasks(prevTasks => prevTasks.filter(t => t.id !== task.id));
      
      // Also remove the task from completedTasks and fadeAnims state
      setCompletedTasks(prev => {
        const updated = { ...prev };
        delete updated[task.id];
        return updated;
      });
      
      setFadeAnims(prev => {
        const updated = { ...prev };
        delete updated[task.id];
        return updated;
      });

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
          {activeTab === "daily" && (
            <Text className="text-yellow-500 mr-2">+{task.xp_reward || 10} XP</Text>
          )}
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

      {/* Modal for Adding Task */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-[#151C32] p-6 rounded-lg w-80">
            <TextInput
              value={newTask}
              onChangeText={setNewTask}
              placeholder="Enter task title"
              placeholderTextColor="#aaa"
              className="text-white p-2 border-b border-gray-500 mb-4"
            />
            <TouchableOpacity
              onPress={addTask}
              className="bg-[#3366FF] py-2 rounded-lg"
            >
              <Text className="text-white text-center">Add Task</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="mt-4 text-center"
            >
              <Text className="text-white">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default TasksScreen;