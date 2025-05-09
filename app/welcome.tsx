import { Text, View, Dimensions, useWindowDimensions, SafeAreaView } from "react-native";
import Logo from "@/assets/images/svg_images/welcome.svg";
import Button from "@/components/button";
import tw from "twrnc";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";

export default function Index() {
  const { height, width } = useWindowDimensions();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    "CustomFont-Bold": require("@/assets/fonts/SF-Pro-Rounded-Bold.otf"),
    "CustomFont-Regular": require("@/assets/fonts/SF-Pro-Rounded-Regular.otf"),
    "CustomFont-Semibold": require("@/assets/fonts/SF-Pro-Rounded-Semibold.otf"),
    "CustomFont-Heavy": require("@/assets/fonts/SF-Pro-Rounded-Heavy.otf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading Fonts...</Text>;
  }

  return (
    <SafeAreaView className="flex-1 bg-[#0A0E1F]">
      <View className="flex-1 justify-center items-center">
        <View
          className="absolute w-full justify-center"
          style={{ left: "23%", top: height * 0.17 }}
        >
          <Logo width={220} height={220} />
        </View>

        {/* Habit Hero Text */}
        <Text
          className="text-white"
          style={{
            fontFamily: "CustomFont-Semibold",
            fontSize: width * 0.093,
            marginTop: height * 0.45,
          }}
        >
          Flow
        </Text>

        {/* Level Up Text */}
        <Text
          className="text-gray-400"
          style={{
            fontFamily: "CustomFont-Regular",
            fontSize: width * 0.05,
            marginTop: height * 0.00,
          }}
        >
          Level Up in Real Life!
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
          gradientColors={["#3D5AFE", "#253698"]}
          gradientStart={{ x: 1, y: 0.3 }}
          gradientEnd={{ x: 1, y: 1 }}
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
          textStyle={{
            fontFamily: "CustomFont-Regular",
            fontSize: width * 0.045,
            color: "white",
          }}
        />
      </View>
    </SafeAreaView>
  );
}
