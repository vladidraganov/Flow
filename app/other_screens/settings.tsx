import React from "react";
import { View, Text, TouchableOpacity, Dimensions, ScrollView , Image} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";

const { width, height } = Dimensions.get("window");

const SettingsScreen = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.replace("/welcome");
    } else {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, alignItems: "center", paddingVertical: height * 0.02 }}
      className="bg-[#0A0E1F]"
    >
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
                        width: width * 0.05, // Make arrow responsive
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
        <Text className="text-white font-bold" style={{ fontSize: width * 0.07 }}>
          Settings
        </Text>
      </View>

      {/* Settings Options */}
      <TouchableOpacity
        className="bg-[#0E1325] rounded-3xl items-center justify-center"
        style={{
          width: width * 0.85,
          height: height * 0.12,
          marginBottom: height * 0.02,
        }}
        onPress={() => router.push("/profile")}
      >
        <Text className="text-white font-bold" style={{ fontSize: width * 0.05 }}>
          Profile
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-[#0E1325] rounded-3xl items-center justify-center"
        style={{
          width: width * 0.85,
          height: height * 0.12,
          marginBottom: height * 0.02,
        }}
      >
        <Text className="text-white font-bold" style={{ fontSize: width * 0.05 }}>
          Notifications
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-[#0E1325] rounded-3xl items-center justify-center"
        style={{
          width: width * 0.85,
          height: height * 0.12,
          marginBottom: height * 0.02,
        }}        
      >
        <Text className="text-white font-bold" style={{ fontSize: width * 0.05 }}>
          Privacy
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-[#0E1325] rounded-3xl items-center justify-center"
        style={{
          width: width * 0.85,
          height: height * 0.12,
          marginBottom: height * 0.02,
        }}
        
      >
        <Text className="text-white font-bold" style={{ fontSize: width * 0.05 }}>
          Help & Support
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-[#0E1325] rounded-3xl items-center justify-center"
        style={{
          width: width * 0.85,
          height: height * 0.12,
          marginBottom: height * 0.02,
        }}
        onPress={handleLogout}
      >
        <Text className="text-red-500 font-bold" style={{ fontSize: width * 0.05 }}>
          Log Out
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SettingsScreen;