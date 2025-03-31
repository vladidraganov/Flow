import { Text, View, Dimensions, useWindowDimensions } from "react-native";
import Logo from "../assets/images/svg_images/welcome.svg";
import Button from "@/components/button";
import tw from "twrnc";
import { useRouter } from "expo-router";

export default function Index() {
  const { height, width } = useWindowDimensions();
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-[#0A0E1F]">
      <View
        className="absolute w-full justify-center"
        style={{ left: "23%", top: height * 0.17 }}
      >
        <Logo width={220} height={220} />
      </View>

      {/* Habit Hero Text */}
      <Text
        className="text-white"
        style={{ fontSize: width * 0.1, marginTop: height * 0.45 }}
      >
        Habit Hero
      </Text>

      {/* Level Up Text */}
      <Text
        className="text-white"
        style={{ fontSize: width * 0.05, marginTop: height * 0.02 }}
      >
        Level Up in Real Life
      </Text>

      {/* Login Button */}
      <Button
        title="Login"
        onPress={() => router.push("/login")}
        customStyle={{
          marginTop: height * 0.02,
          paddingHorizontal: width * 0.05,
          paddingVertical: height * 0.015,
          borderRadius: 16,
          width: width * 0.85,
          alignItems: "center",
          justifyContent: "center",
        }}
        gradientColors={["#293CA5", "#1A2668"]}
        gradientStart={{ x: 0.19, y: 0 }}
        gradientEnd={{ x: 0.32, y: 1 }}
      />

      {/* Sign Up Button */}
      <Button
        title="Sign Up"
        onPress={() => router.push("/signup")}
        customStyle={{
          marginTop: -8,
          paddingHorizontal: width * 0.05,
          paddingVertical: height * 0.015,
          borderRadius: 16,
          width: width * 0.85,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
        }}
        gradientColors={null}
        innerBorderOnly={true}
        innerBorderColor="#B0B0B0"
      />
    </View>
  );
}
