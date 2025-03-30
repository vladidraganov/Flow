import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import Button from "@/components/button";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import tw from "twrnc";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Holds the error message
  const router = useRouter();

  const handleLogin = async () => {
    setErrorMessage("");
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message); // Show error below inputs
    } else {
      router.push("/home"); // Redirect to home page after login
    }
  };

  return (
    <View className="flex-1 bg-[#0A0E1F] px-6 pt-20 justify-start ">
      <TouchableOpacity
      className="absolute top-5 mt-8 left-6 p-3 border w-full max-w-[40px] h-full max-h-[40px] items-center border-[#5C5E67] rounded-2xl"
      onPress={() => {
        router.push("/signup");
      }}
      >
      <Image
        source={require("@/assets/images/back-arrow.png")}
        className="w-4 h-4 "
        style={{ tintColor: "#5C5E67" }}
      />
      </TouchableOpacity>
      <Text className="text-white text-3xl font-semibold ml-6 mt-16 mb-4">Login</Text>

      <View className="mt-6 w-full  items-center">
        <TextInput
          className="bg-transparent text-white p-4 rounded-2xl w-full max-w-[300px] h-full max-h-[60px]  mb-5 text-base border border-[#5C5E67]"
          placeholder="E-mail address"
          placeholderTextColor="gray"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          className="bg-transparent text-white p-4 rounded-2xl w-full max-w-[300px] h-full max-h-[60px] mb-5 text-base border border-[#5C5E67]"
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Button title="Login" onPress={handleLogin} />
        {errorMessage ? (
          <Text className="text-red-500 text-center mb-4">{errorMessage}</Text>
        ) : null}
      </View>
    </View>
  );
};

export default LoginScreen;
