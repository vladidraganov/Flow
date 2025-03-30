import { Text, View, Dimensions } from "react-native";
import Logo from "../assets/images/svg_images/welcome.svg";
import Button from "@/components/button";
import tw from "twrnc";

const { height } = Dimensions.get("window");
const { router } = require("expo-router");

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center bg-[#0A0E1F] m-0 p-0">
      <View
        className="absolute w-full"
        style={{ left: "30%", top: height * 0.1 }}
      >
        <Logo width={200} height={200} />
      </View>
      
      {/* Habit Hero Text */}
      <Text className="text-5xl text-white mt-40">Habit Hero</Text>
      
      {/* Level Up Text */}
      <Text className="text-xl text-white mt-5">Level Up in Real Life</Text>
      
      {/* First Button: Standard Button */}
      <Button
        title="Login"
        onPress={() => router.push("/login")}
        customStyle={{
          marginTop: 40,
          paddingHorizontal: 20,
          paddingVertical: 12,
          borderRadius: 16,
          width: '80%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        gradientColors={['#293CA5', '#1A2668']}
        gradientStart={{ x: 0.19, y: 0 }}
        gradientEnd={{ x: 0.32, y: 1 }}
      />
      
      {/* Sign Up Button with ONLY inner blue border */}
      <Button
        title="Sign Up"
        onPress={() => router.push("/signup")}
        customStyle={{
          marginTop: -8,
          paddingHorizontal: 20,
          paddingVertical: 12,
          borderRadius: 16,
          width: '95%',
          
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
        }}
        gradientColors={null}
        innerBorderOnly={true}
        innerBorderColor="#B0B0B0"
      />
    </View>
  );
}