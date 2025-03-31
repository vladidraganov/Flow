import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Button from "@/components/button";
import { supabase } from "@/lib/supabase";
import tw from "twrnc";

const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setErrorMessage("");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      router.push("/home");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0A0E1F]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 px-6 justify-start">
            {/* Back Button */}
            <TouchableOpacity
              className="absolute top-5 left-6 p-3 border items-center border-[#5C5E67] rounded-2xl"
              style={{ width: width * 0.12, height: width * 0.12 }}
              onPress={() => router.push("/")}
            >
              <Image
                source={require("@/assets/images/back-arrow.png")}
                className="w-4 h-4"
                style={{ tintColor: "#5C5E67" }}
              />
            </TouchableOpacity>

            {/* Title */}
            <Text
              className="text-white font-semibold "
              style={{
                fontSize: width * 0.08, // Responsive font size
                marginLeft: width * 0.08,
                marginBottom: width * 0.12,
                marginTop: width * 0.30,
              }}
            >
              Login
            </Text>

            {/* Input Fields */}
            <View className="w-full items-center">
              <TextInput
                className="bg-transparent text-white p-4 rounded-2xl border border-[#5C5E67]"
                style={{
                  width: width * 0.75, // 85% of screen width
                  height: height * 0.07, // 7% of screen height
                  fontSize: width * 0.045, // Responsive font size
                }}
                placeholder="E-mail address"
                placeholderTextColor="gray"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />

              <TextInput
                className="bg-transparent text-white p-4 rounded-2xl border border-[#5C5E67] mt-4"
                style={{
                  width: width * 0.75,
                  height: height * 0.07,
                  fontSize: width * 0.045,
                }}
                placeholder="Password"
                placeholderTextColor="gray"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              {/* Login Button */}
              <Button
                title="Login"
                onPress={handleLogin}
                customStyle={{
                  marginTop: height * 0.04,
                  paddingVertical: 12,
                  borderRadius: 16,
                  width: width * 0.75,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                gradientColors={["#3D5AFE", "#253698"]}
                gradientStart={{ x: 0.19, y: 0 }}
                gradientEnd={{ x: 0.52, y: 1 }}
              />

              {errorMessage ? (
                <Text
                  className="text-red-500 text-center mt-4"
                  style={{ fontSize: width * 0.04 }}
                >
                  {errorMessage}
                </Text>
              ) : null}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
