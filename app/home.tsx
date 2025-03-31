import { View, Text, Image, useWindowDimensions } from "react-native";
import tw from "twrnc";

export default function Home() {
  const { width } = useWindowDimensions();

  return (
    <View className="flex-1 bg-[#0A0E1F] px-5 pt-10">
      {/* Profile Section */}
      <View className="flex-row items-center justify-between p-4 rounded-xl bg-[#10172A]">
        <View className="flex-row items-center">
          <Image
            source={{ uri: "https://via.placeholder.com/50" }}
            className="w-12 h-12 rounded-full"
          />
          <View style={{ marginLeft: width * 0.03 }}>
            <Text className="text-white text-lg font-semibold">Lv.74</Text>
            <View className="bg-gray-700 w-32 h-2 rounded-full mt-1">
              <View className="bg-indigo-500 h-2 rounded-full" style={{ width: "70%" }} />
            </View>
          </View>
        </View>
        <View className="flex-row items-center space-x-3">
          <Text className="text-white text-lg">🔥 5</Text>
          <Text className="text-white text-lg">💎 257</Text>
        </View>
      </View>

      {/* XP Earned Today */}
      <View className="mt-5 p-4 rounded-xl bg-[#10172A]">
        <Text className="text-white text-lg">XP Earned today</Text>
        <View className="bg-gray-700 w-full h-3 rounded-full mt-2">
          <View className="bg-purple-500 h-3 rounded-full" style={{ width: "57%" }} />
        </View>
        <Text className="text-white mt-2">170/300</Text>
      </View>

      {/* Personal Goals */}
      <View className="mt-5 p-4 rounded-xl bg-[#10172A]">
        <Text className="text-white text-lg">Personal goals</Text>
        <View className="bg-gray-700 w-full h-3 rounded-full mt-2">
          <View className="bg-green-500 h-3 rounded-full" style={{ width: "33%" }} />
        </View>
        <Text className="text-white mt-2">1/3</Text>
      </View>

      {/* Weekly Competition */}
      <View className="mt-5 p-4 rounded-xl bg-[#10172A]">
        <Text className="text-white text-lg">Weekly Competition</Text>
      </View>

      {/* Spin for a Reward */}
      <View className="mt-5 p-4 rounded-xl bg-[#10172A]">
        <Text className="text-white text-lg">Spin for a reward!</Text>
      </View>
    </View>
  );
}
