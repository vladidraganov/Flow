import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Button from "@/components/button";
import tw from "twrnc";
import { Stack } from "expo-router";



const SignUpScreen = () => {
  
  return (
    <View className="flex-1 bg-[#0A0E1F] px-6 pt-20 justify-start">
      {/* Back Button */}
      <TouchableOpacity className="absolute top-5 left-6 p-3 border border-[#5C5E67] rounded-full">
        <Text className="text-white text-lg">←</Text>
      </TouchableOpacity>

      
      <Text className="text-white text-3xl font-semibold ml-9 mt-11 mb-8 " >Sign Up</Text>

      <View className="mt-6 w-full items-center">
      <TextInput
        className="bg-transparent text-white p-4 rounded-2xl  w-full max-w-[320px] mb-5 text-base border border-[#5C5E67]"
        placeholder="Full name"
        placeholderTextColor="gray"
      />
      <TextInput
        className="bg-transparent text-white p-4 rounded-2xl  w-full max-w-[320px] mb-5 text-base border border-[#5C5E67]"
        placeholder="E-mail address"
        placeholderTextColor="gray"
        keyboardType="email-address"
      />
      <TextInput
        className="bg-transparent text-white p-4 rounded-2xl  w-full max-w-[320px] mb-5 text-base border border-[#5C5E67]"
        placeholder="Create password"
        placeholderTextColor="gray"
        secureTextEntry
      />
      

      <Button title="Sign Up" customStyle={tw`p-4 rounded-2xl mt-6 w-full max-w-[320px] h-full max-h-[57px] mb-5`} onPress={() => console.log("Signed Up")} />
      </View >
    </View>
  );
};



export default SignUpScreen;
