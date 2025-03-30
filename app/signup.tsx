import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import Button from "@/components/button";
import tw from "twrnc";
import { Stack } from "expo-router";
const { router } = require("expo-router");
import { supabase } from "@/lib/supabase";






const SignUpScreen = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async () => {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
  
    if (error) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage("");
      router.push("/login");
    }
  };
  
  
  return (
    <View className="flex-1 bg-[#0A0E1F] px-6 pt-20 justify-start">
      {/* Back Button */}
      <TouchableOpacity
        className="absolute top-5 left-6 p-3 border border-[#5C5E67] rounded-full"
        onPress={() => {
            router.push("/login");
        }}
      >
        <Text className="text-white text-lg">←</Text>
      </TouchableOpacity>

      
      <Text className="text-white text-3xl font-semibold ml-9 mt-11 mb-8 " >Sign Up</Text>

      <View className="mt-6 w-full items-center">
      <TextInput
        className="bg-transparent text-white p-4 rounded-2xl  w-full max-w-[320px] mb-5 text-base border border-[#5C5E67]"
        placeholder="Full name"
        placeholderTextColor="gray"
        value={fullName}
        onChangeText={setFullName}


      />
      <TextInput
        className="bg-transparent text-white p-4 rounded-2xl  w-full max-w-[320px] mb-5 text-base border border-[#5C5E67]"
        placeholder="E-mail address"
        placeholderTextColor="gray"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}

      />
      <TextInput
        className="bg-transparent text-white p-4 rounded-2xl  w-full max-w-[320px] mb-5 text-base border border-[#5C5E67]"
        placeholder="Create password"
        placeholderTextColor="gray"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      
      

      <Button
      title="Sign Up"
      onPress={() => console.log("Button pressed")}
      customStyle={{
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      gradientColors={['#3D5AFE', '#253698']}
      gradientStart={{ x: 0.19, y: 0 }}
      gradientEnd={{ x: 0.52, y: 1 }}
/>
      </View >
    </View>
  );
};



export default SignUpScreen;
