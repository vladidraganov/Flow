import React from "react";
import { View, ScrollView, Text, Dimensions, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import Header from "@/components/header"; // Import the new Header component

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#0A0E1F]">
      <ScrollView>
        {/* HEADER COMPONENT */}
        <Header /> 

        {/* XP Earned Card */}
        <LinearGradient 
          colors={["#151C32", "#0C1223", "#0E1325"]} 
          locations={[0, 0.5, 1]} 
          start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 0 }} 
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

        {/* Personal Goals Card */}
        <LinearGradient 
          colors={["#151C32", "#0C1223", "#0E1325"]} 
          locations={[0, 0.5, 1]} 
          start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 0 }} 
          style={{
            width: screenWidth * 0.87, 
            height: screenHeight * 0.158,
            borderRadius: 20, 
            paddingHorizontal: 20, 
          }}
          className="items-center justify-center self-center my-4"
        >
          <View className="w-[80%]">
            <Text className="text-white text-2xl font-extrabold self-start">Personal Goals</Text>
            <View className="w-full flex items-center">
              <View className="w-[100%] bg-[#2A2A3C] rounded-full mt-2" style={{ height: screenHeight * 0.018 }}>
                <View className="h-full bg-[#127D26] rounded-full" style={{ width: "33%" }} />
              </View>
            </View>
          </View>
          <Text className="text-white text-2xl font-bold self-center mr-6">1/3</Text>
        </LinearGradient>

        {/* Weekly Competition Card */}
        <LinearGradient 
          colors={["#151C32", "#0C1223", "#0E1325"]} 
          locations={[0, 0.5, 1]} 
          start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 0 }} 
          style={{
            width: screenWidth * 0.87, 
            height: screenHeight * 0.112,
            borderRadius: 20, 
          }}
          className="items-center justify-center self-center my-4"
        >
          <Text className="text-white text-2xl font-extrabold">Weekly Competition</Text>
        </LinearGradient>

        {/* Spin for a reward Card */}
        <LinearGradient 
          colors={["#151C32", "#0C1223", "#0E1325"]} 
          locations={[0, 0.5, 1]} 
          start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 0 }} 
          style={{
            width: screenWidth * 0.87, 
            height: screenHeight * 0.112,
            borderRadius: 20, 
          }}
          className="items-center justify-center self-center my-4"
        >
          <Text className="text-white text-2xl font-extrabold">Spin for a reward!</Text>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
