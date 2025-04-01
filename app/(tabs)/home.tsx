import React from "react";
import { View, ScrollView, Text, Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from "@expo/vector-icons";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const HomeScreen = () => {
  return (
    <ScrollView className="flex-1 bg-[#0A0E1F]">
      {/* HEADER */}
      <LinearGradient 
        colors={["#1F1F34", "#0C1022"]} 
        locations={[0.21, 0.51]} 
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 1 }} // Restored gradient direction
        style={{
          height: screenHeight * 0.138,
          marginBottom: screenHeight * 0.03,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
        className="flex-row justify-between items-center px-4"
      >
        <View className="flex-row items-center">
          <View className="w-[60px] h-[60px] rounded-full bg-[#2A2A3C] mt-[4%]" />
          <View className="ml-3 mt-[4%]">
            <Text className="text-white font-bold text-lg">Lv.74</Text>
            <View className="w-[90px] h-[9px] bg-[#2A2A3C] rounded-md mt-1">
              <View className="h-full bg-[#4361EE] rounded-md" style={{ width: "57%" }} />
            </View>
          </View>
        </View>
        <View className="flex-row items-center">
          <FontAwesome5 name="fire" size={18} color="orange" />
          <Text className="text-white text-lg mx-2">5</Text>
          <FontAwesome5 name="gem" size={18} color="purple" />
          <Text className="text-white text-lg mx-2">257</Text>
        </View>
      </LinearGradient>

      {/* XP Earned Card */}
      <LinearGradient 
        colors={["#151C32", "#0C1223", "#0E1325"]} 
        locations={[0, 0.5, 1]} // Restored locations
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 0 }} // Horizontal gradient
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
    paddingHorizontal: 20, // Adds padding for better alignment
  }}
  className="items-center justify-center self-center my-4"
>
  {/* Container for the text and progress bar */}
  <View className="w-[80%]">
    {/* Align text to the start */}
    <Text className="text-white text-2xl font-extrabold self-start">Personal Goals</Text>
    
    {/* Centered Progress Bar */}
    <View className="w-full flex items-center">
      <View className="w-[100%] bg-[#2A2A3C] rounded-full mt-2" style={{ height: screenHeight * 0.018 }}>
        <View className="h-full bg-[#127D26] rounded-full" style={{ width: "33%" }} />
      </View>
    </View>
  </View>

  {/* Right-aligned text (progress indicator) */}
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
  );
};

export default HomeScreen;