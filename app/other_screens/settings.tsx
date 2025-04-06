import React from "react";
import { View, Text, TouchableOpacity, Dimensions, ScrollView, Image, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient

const { width, height } = Dimensions.get("window");

const SettingsScreen = () => {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    "CustomFont-Bold": require("@/assets/fonts/SF-Pro-Rounded-Bold.otf"),
    "CustomFont-Regular": require("@/assets/fonts/SF-Pro-Rounded-Regular.otf"),
    "CustomFont-Semibold": require("@/assets/fonts/SF-Pro-Rounded-Semibold.otf"),
    "CustomFont-Heavy": require("@/assets/fonts/SF-Pro-Rounded-Heavy.otf"),
    "CustomFont-Medium": require("@/assets/fonts/SF-Pro-Rounded-Medium.otf"),
  });

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.replace("/welcome");
    } else {
      console.error("Logout error:", error.message);
    }
  };

  if (!fontsLoaded) {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}
        className="bg-[#0A0E1F]"
      >
        <ActivityIndicator size="large" color="#FFFFFF" />
      </ScrollView>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, alignItems: "center", paddingVertical: height * 0.02 }}
      className="bg-[#0A0E1F]"
    >
      {/* Back Button */}
      <TouchableOpacity
        className="absolute border border-[#5C5E67] rounded-2xl"
        style={{
          width: width * 0.12,
          height: width * 0.12,
          top: height * 0.02,
          left: width * 0.06,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => router.push("/profile")}
      >
        <Image
          source={require("@/assets/images/back-arrow.png")}
          style={{
            width: width * 0.05,
            height: width * 0.05,
            tintColor: "#5C5E67",
          }}
        />
      </TouchableOpacity>

      {/* Header */}
      <View
        style={{
          height: height * 0.138,
          marginBottom: height * 0.03,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          className="text-white font-bold"
          style={{
            fontSize: width * 0.07,
            fontFamily: "CustomFont-Bold",
          }}
        >
          Settings
        </Text>
      </View>

      {/* Settings Options */}
      {[
        { title: "Profile", onPress: () => router.push("/profile") },
        { title: "Notifications" },
        { title: "Privacy" },
        { title: "Help & Support" },
        { title: "Log Out", onPress: handleLogout, textColor: "text-red-500" },
      ].map((option, index) => (
        <LinearGradient
          key={index}
          colors={["#13172D", "#0C1024"]}
          locations={[0.0, 0.7]}
          start={{ x: 0, y: 0.3 }}
          end={{ x: 0.8, y: 1 }}
          style={{
            width: width * 0.87,
            height: height * 0.12,
            marginBottom: height * 0.02,
            borderRadius: 22,
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity
            className="items-center justify-center flex-1"
            onPress={option.onPress}
          >
            <Text
              className={`${option.textColor || "text-white"} font-bold`}
              style={{
                fontSize: width * 0.05,
                fontFamily: "CustomFont-Semibold",
              }}
            >
              {option.title}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      ))}
    </ScrollView>
  );
};

export default SettingsScreen;