import React from "react";
import { View, ScrollView, Text, Dimensions, SafeAreaView, TouchableOpacity, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font"; // Import useFonts
import Header from "@/components/header"; // Import the new Header component
import CompetitionsIcon from "@/assets/icons/Competitions.svg"; // Import the SVG icon
import SpinWheelIcon from "@/assets/icons/spinwheel.svg"; // Import the SpinWheel icon

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const PersonalTasksPercentage = "57%";

const HomeScreen = () => {
  const [fontsLoaded] = useFonts({
    "CustomFont-Bold": require("@/assets/fonts/SF-Pro-Rounded-Bold.otf"),
    "CustomFont-Regular": require("@/assets/fonts/SF-Pro-Rounded-Regular.otf"),
    "CustomFont-Semibold": require("@/assets/fonts/SF-Pro-Rounded-Semibold.otf"),
    "CustomFont-Heavy": require("@/assets/fonts/SF-Pro-Rounded-Heavy.otf"),
    "CustomFont-Medium": require("@/assets/fonts/SF-Pro-Rounded-Medium.otf"),
  });

  if (!fontsLoaded) {
    return (
      <SafeAreaView className="flex-1 bg-[#0A0E1F] items-center justify-center">
        <ActivityIndicator size="large" color="#FFFFFF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#0A0E1F]">
      {/* Fixed Header */}
      <View className="absolute top-0 w-full z-10">
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
            colors={["#13172D", "#0C1024"]}
            locations={[0.0, 0.7]}
            start={{ x: 0, y: 0.3 }}
            end={{ x: 0.8, y: 1 }}
            style={{
              width: screenWidth * 0.87,
              height: screenHeight * 0.18,
              marginTop: 25,
              borderRadius: 22,
            }}
            className="items-center justify-center self-center my-4"
          >
            <View className="w-[80%]">
              <Text className="text-white text-2xl " style={{ fontFamily: "CustomFont-Medium", textAlign: "left", fontSize: 25, }}>
                XP Earned Today
              </Text>
              <View className="bg-[#2A2A3C] rounded-full mt-2" style={{ height: screenHeight * 0.018 }}>
                <View className="h-full bg-[#5D16A4] rounded-full" style={{ width: "57%" }} />
              </View>
              <Text
                className="text-white text-xl"
                style={{
                  fontSize: 20,
                  marginTop: 5,
                  fontFamily: "CustomFont-Medium",
                  textAlign: "right",
                  alignSelf: "flex-end", // Align to the end of the container
                }}
              >
                170/300
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Personal Goals Card */}
        <TouchableOpacity>
          <LinearGradient
            colors={["#13172D", "#0C1024"]}
            locations={[0.0, 0.7]}
            start={{ x: 0, y: 0.3 }}
            end={{ x: 0.8, y: 1 }}
            style={{
              width: screenWidth * 0.87,
              height: screenHeight * 0.158,
              borderRadius: 22, // Explicitly set borderRadius
              paddingHorizontal: 20,
            }}
            className="items-center justify-center self-center my-4"
          >
            <View className="w-[80%]">
            <Text className="text-white text-2xl " style={{ fontFamily: "CustomFont-Medium", textAlign: "left", fontSize: 25, }}>
                Personal Tasks
              </Text>
              <View className="w-full flex items-center">
                <View className="w-full bg-[#2A2A3C] rounded-full mt-2" style={{ height: screenHeight * 0.018, width: 250, }}>
                  <View className="h-full bg-[#127D26] rounded-full" style={{ width: PersonalTasksPercentage }} />
                </View>
              </View>
            </View>
            <Text className="text-white text-2xl self-center mt-2 mr-6" style={{ fontFamily: "CustomFont-Medium" }}>
              1/3
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Weekly Competition Card */}
        <TouchableOpacity>
          <LinearGradient
            colors={["#13172D", "#0C1024"]}
            locations={[0.0, 0.7]}
            start={{ x: 0, y: 0.3 }}
            end={{ x: 0.8, y: 1 }}
            style={{
              width: screenWidth * 0.87,
              height: screenHeight * 0.112,
              borderRadius: 22, // Explicitly set borderRadius
            }}
            className="flex-row items-center justify-start self-center my-4"
          >
            <Text
              className="text-white text-2xl"
              style={{
                fontFamily: "CustomFont-Medium",
                fontSize: 25,
                lineHeight: 30,
                paddingLeft: 30, // Move text slightly to the right
                textAlign: "left", // Align text to the left
                alignSelf: "center", // Center text vertically
              }}
            >
              Weekly{"\n"}Competition
            </Text>
            <CompetitionsIcon
              width={50}
              height={50}
              style={{
                marginRight: 0,
                marginLeft: 50, // Add spacing between the text and the icon
                alignSelf: "center", // Center icon vertically
              }}
            />
          </LinearGradient>
        </TouchableOpacity>

        {/* Spin for a reward Card */}
        <TouchableOpacity>
          <LinearGradient
            colors={["#13172D", "#0C1024"]}
            locations={[0.0, 0.7]}
            start={{ x: 0, y: 0.3 }}
            end={{ x: 0.8, y: 1 }}
            style={{
              width: screenWidth * 0.87,
              height: screenHeight * 0.112,
              borderRadius: 22, // Explicitly set borderRadius
            }}
            className="flex-row items-center justify-start self-center my-4 px-4"
          >
            <SpinWheelIcon
              width={50}
              height={50}
              style={{
                marginLeft: 40,
                marginRight: 40, // Add spacing between the icon and the text
                alignSelf: "center", // Center icon vertically
              }}
            />
            <Text
              className="text-white text-2xl"
              style={{
                fontFamily: "CustomFont-Medium",
                fontSize: 25,
                lineHeight: 30,
                textAlign: "center", // Align text to the left
                alignSelf: "center", // Center text vertically
              }}
            >
              Spin for a{"\n"}reward!
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
