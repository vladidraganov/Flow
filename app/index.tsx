import { Text, View, Dimensions } from "react-native";
import Logo from "../assets/images/svg_images/welcome.svg"; // Correct path
import Button from "@/components/button";
import tw from "twrnc"; // Import Tailwind for other styles
import { router } from "expo-router";
const { height } = Dimensions.get("window");

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center bg-[#0A0E1F] m-0 p-0">
      <View className="absolute w-full" style={{ left: "30%", top: height * 0.15 }}>
        <Logo width={200} height={200} />
      </View>

      <Text className="text-5xl text-white mt-10">Habit Hero</Text>

      <Text className="text-xl text-white mt-15">Level Up in Real Life</Text>

      {/* Apply custom gradient style here */}
      <Button
        title="Login"
        onPress={() => router.push("/login")}
        customStyle={{
          paddingHorizontal: 20,
          paddingVertical: 12,
          borderRadius: 12,
          width: '85%', // Button width (optional),
          alignItems: 'center', // Center the text inside the button
          justifyContent: 'center', // Center the text inside the button
        }}
      />
    </View>
  );
}
