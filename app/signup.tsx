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

const { width, height } = Dimensions.get("window");

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    setErrorMessage("");
    const { data, error } = await supabase.auth.signUp({ email, password });

    console.log("SignUp Response:", data, error); // Debugging log

    if (error) {
      setErrorMessage(error.message);
    } else {
      const userId = data.user?.id;
      if (userId) {
        const { error: profileError } = await supabase
          .from("profiles")
          .insert({ user_id: userId, username });

        console.log("Profile Insert Response:", profileError); // Debugging log

        if (profileError) {
          setErrorMessage(profileError.message);
          return;
        }
      }
      router.push("/login");
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
              className="absolute border border-[#5C5E67] rounded-2xl"
              style={{
                width: width * 0.12,
                height: width * 0.12,
                top: height * 0.02,
                left: width * 0.06,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => router.push("/")}
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

            {/* Title */}
            <Text
              className="text-white font-semibold "
              style={{
                fontSize: width * 0.08, // Responsive font size
                marginLeft: width * 0.08,
                marginBottom: width * 0.12,
                marginTop: width * 0.3,
              }}
            >
              Sign up
            </Text>

            {/* Input Fields */}
            <View className="w-full items-center">
              <TextInput
                className="bg-transparent text-white rounded-2xl border border-[#5C5E67]"
                style={{
                  width: width * 0.79,
                  height: height * 0.08,
                  fontSize: width * 0.045,
                  paddingHorizontal: width * 0.04,
                  paddingVertical: height * 0.02,
                  marginBottom: width * 0.015,
                }}
                placeholder="Username"
                placeholderTextColor="gray"
                value={username}
                onChangeText={setUsername}
              />

              <TextInput
                className="bg-transparent text-white rounded-2xl border border-[#5C5E67] "
                style={{
                  width: width * 0.79,
                  height: height * 0.08,
                  fontSize: width * 0.045,
                  paddingHorizontal: width * 0.04,
                  paddingVertical: height * 0.02,
                  marginBottom: width * 0.015,
                  marginTop: height * 0.02,
                }}
                placeholder="E-mail address"
                placeholderTextColor="gray"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />

              <TextInput
                className="bg-transparent text-white rounded-2xl border border-[#5C5E67] "
                style={{
                  width: width * 0.79,
                  height: height * 0.08,
                  fontSize: width * 0.045,
                  paddingHorizontal: width * 0.04,
                  paddingVertical: height * 0.02,
                  marginBottom: width * 0.015,
                  marginTop: height * 0.02,
                }}
                placeholder="Create password"
                placeholderTextColor="gray"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              {/* Sign Up Button */}
              <Button
                title="Sign Up"
                onPress={handleSignUp}
                customStyle={{
                  marginTop: width * 0.07,
                  height: height * 0.09,
                  width: width * 0.79,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                gradientColors={["#293CA5", "#1A2668"]}
                gradientStart={{ x: 0.19, y: 0 }}
                gradientEnd={{ x: 0.32, y: 1 }}
              />

              {errorMessage ? (
                <Text
                  className="text-red-500 text-center"
                  style={{
                    fontSize: width * 0.04,
                    marginTop: height * 0.02,
                  }}
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

export default SignUpScreen;