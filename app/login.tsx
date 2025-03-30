import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Button from "@/components/button";
import { supabase } from "@/lib/supabase";
import tw from "twrnc";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Login successful!");
      // Navigate to home screen after login
    }
  };

  return (
    <View className="flex-1 bg-[#0A0E1F] px-6 pt-20 justify-start">
      <Text className="text-white text-3xl font-semibold ml-9 mt-11 mb-8">Login</Text>

      <View className="mt-6 w-full items-center">
        <TextInput
          className="bg-transparent text-white p-4 rounded-2xl w-full max-w-[320px] mb-5 text-base border border-[#5C5E67]"
          placeholder="E-mail address"
          placeholderTextColor="gray"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          className="bg-transparent text-white p-4 rounded-2xl w-full max-w-[320px] mb-5 text-base border border-[#5C5E67]"
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
};

export default LoginScreen;
