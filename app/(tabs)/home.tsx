import React from "react";
import { View, ScrollView, Text, Dimensions, SafeAreaView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import Header from "@/components/header"; // Import the new Header component

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const PersonalTasksPercentage = "57%";
const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#0A0E1F]">
      {/* Fixed Header */}
      <View style={{ position: "absolute", top: 0, width: "100%", zIndex: 10 }}>
        <Header />
      </View>

      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={{
          paddingTop: screenHeight * 0.138, // Offset for the fixed header
          paddingBottom: screenHeight * 0.02,
        }}
      >
        {/* XP Earned Card */}
        <TouchableOpacity>
          <LinearGradient 
            colors={["#13172D", "#0C1022"]} 
            locations={[0.0, 0.7]} 
            start={{ x: 1, y: 0 }} 
            end={{ x: 1, y: 1 }} 
            style={{
              width: screenWidth * 0.87, 
              height: screenHeight * 0.18,
              borderRadius: 20, 
            }}
            className="items-center justify-center self-center my-4"
          >
            <Text className="text-white text-2xl font-extrabold">XP Earned Today</Text>
            <View className="w-[80%] bg-[#2A2A3C] rounded-full mt-2" style={{ height: screenHeight * 0.018 }}>
              <View className="h-full bg-[#5D16A4] rounded-full" style={{ width: "57%" }} />
            </View>
            <Text className="text-white text-xl font-bold self-end mr-6">170/300</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Personal Goals Card */}
        <TouchableOpacity>
          <LinearGradient 
            colors={["#13172D", "#0C1022"]} 
            locations={[0.0, 0.7]} 
            start={{ x: 1, y: 0 }} 
            end={{ x: 1, y: 1 }} 
            style={{
              width: screenWidth * 0.87, 
              height: screenHeight * 0.158,
              borderRadius: 20, 
              paddingHorizontal: 20, 
            }}
            className="items-center justify-center self-center my-4"
          >
            <View className="w-[80%]">
              <Text className="text-white text-2xl font-extrabold self-start">Personal Tasks</Text>
              <View className="w-full flex items-center">
                <View className="w-[100%] bg-[#2A2A3C] rounded-full mt-2" style={{ height: screenHeight * 0.018 }}>
                  <View className="h-full bg-[#127D26] rounded-full" style={{ width: PersonalTasksPercentage }} />
                </View>
              </View>
            </View>
            <Text className="text-white text-2xl font-bold self-center mr-6">1/3</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Weekly Competition Card */}
        <TouchableOpacity>
          <LinearGradient 
            colors={["#13172D", "#0C1022"]} 
            locations={[0.0, 0.7]} 
            start={{ x: 1, y: 0 }} 
            end={{ x: 1, y: 1 }} 
            style={{
              width: screenWidth * 0.87, 
              height: screenHeight * 0.112,
              borderRadius: 20, 
            }}
            className="items-center justify-center self-center my-4"
          >
            <Text className="text-white text-2xl font-extrabold">Weekly Competition</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Spin for a reward Card */}
        <TouchableOpacity>
          <LinearGradient 
            colors={["#13172D", "#0C1022"]} 
            locations={[0.0, 0.7]} 
            start={{ x: 1, y: 0 }} 
            end={{ x: 1, y: 1 }} 
            style={{
              width: screenWidth * 0.87, 
              height: screenHeight * 0.112,
              borderRadius: 20, 
            }}
            className="items-center justify-center self-center my-4"
          >
            <Text className="text-white text-2xl font-extrabold">Spin for a reward!</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
