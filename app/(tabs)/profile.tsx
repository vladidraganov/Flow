import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import StatisticsIcon from '@/assets/icons/statistics-icon.svg';
import AchievementsIcon from '@/assets/icons/achievements-icon.svg';
import InventoryIcon from '@/assets/icons/inventory-icon.svg';
import StoreIcon from '@/assets/icons/store-icon.svg';
import SettingsIcon from '@/assets/icons/settings-icon.svg';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get("window");

const profile = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
          console.error("Error fetching user:", userError);
          setLoading(false);
          return;
        }

        console.log("Authenticated user ID:", user.id); // Debugging log

        const { data, error } = await supabase
          .from("profiles")
          .select("username, full_name, user_id")
          .eq("user_id", user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
        } else if (data) {
          console.log("Fetched profile data:", data); // Debugging log
          setUsername(data.username);
          setFullName(data.full_name || "Unknown Name");
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#0A0E1F]">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, alignItems: "center", paddingVertical: height * 0.02 }}
        className="bg-[#0A0E1F]"
      >
        {/* Settings Button */}
        <TouchableOpacity
          style={{
            position: "absolute",
            top: height * 0.02,
            right: width * 0.05,
            zIndex: 10,
          }}
          onPress={() => router.push('../other_screens/settings')}
        >
          <SettingsIcon width={width * 0.08} height={width * 0.08} />
        </TouchableOpacity>

        {/* Profile Picture */}
        <View
          className="bg-gray-500 rounded-full"
          style={{
            width: width * 0.35,
            height: width * 0.35,
            marginBottom: height * 0.01,
            marginTop: height * 0.02,
          }}
        />

        {/* Full Name and Username */}
        <Text
          className="text-white font-bold"
          style={{
            fontSize: width * 0.08,
            marginBottom: height * 0.003,
          }}
        >
          {loading ? "Loading..." : fullName}
        </Text>
        <Text
          className="text-gray-400"
          style={{
            fontSize: width * 0.04,
            marginBottom: height * 0.01,
          }}
        >
          @{loading ? "loading..." : username || "unknown"}
        </Text>

        {/* Edit Button */}
        <TouchableOpacity
          className="bg-[#0E1325] rounded-3xl items-center justify-center"
          style={{
            width: width * 0.15,
            height: height * 0.04,
            marginBottom: height * 0.02,
          }}
          onPress={() => router.push('../other_screens/edit_profile')}
        >
          <Text
            className="text-white "
            style={{
              fontSize: width * 0.04,
            }}
          >
            Edit
          </Text>
        </TouchableOpacity>

        {/* Level and Progress */}
        <TouchableOpacity
          className="bg-[#0E1325] rounded-3xl items-center justify-center"
          style={{
            width: width * 0.85,
            height: height * 0.12,
            marginBottom: height * 0.02,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: width * 0.05,
          }}
        >
          <Text
            className="text-white font-bold"
            style={{
              fontSize: width * 0.07,
              marginBottom: height * 0.04,
            }}
          >
            LV 10
          </Text>
          <View style={{ width: "70%" }}>
            <View className=" bg-[#2A2A3C] rounded-full mt-2" style={{ height: height * 0.04 }}>
              <View className="h-full bg-[#5D16A4] rounded-full" style={{ width: "50%" }} />
            </View>
            <Text
              className="text-gray-400"
              style={{
                fontSize: width * 0.05,
                textAlign: "right",
                marginTop: height * 0.005,
              }}
            >
              200/400
            </Text>
          </View>
        </TouchableOpacity>

        {/* Buttons */}
        <View
          className="flex-row justify-between"
          style={{
            width: width * 0.85,
            marginBottom: height * 0.02,
          }}
        >
          <TouchableOpacity
            className="bg-[#0E1325] rounded-3xl items-center justify-center"
            style={{
              width: width * 0.405,
              height: height * 0.11,
            }}
          >
            <Text
              className="text-white"
              style={{
                fontSize: width * 0.05,
                marginBottom: height * 0.01,
              }}
            >
              Inventory
            </Text>
            <InventoryIcon
              width={width * 0.12}
              height={width * 0.12}
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#0E1325] rounded-3xl items-center justify-center"
            style={{
              width: width * 0.405,
              height: height * 0.11,
            }}
          >
            <Text
              className="text-white"
              style={{
                fontSize: width * 0.05,
                marginBottom: height * 0.01,
              }}
            >
              Store
            </Text>
            <StoreIcon
              width={width * 0.12}
              height={width * 0.12}
            />
          </TouchableOpacity>
        </View>

        {/* Statistics and Achievements */}
        <View
          className="flex-row justify-between"
          style={{
            width: width * 0.85,
          }}
        >
          <TouchableOpacity
            className="bg-[#0E1325] rounded-3xl items-center justify-center"
            style={{
              width: width * 0.405,
              height: height * 0.16,
            }}
          >
            <StatisticsIcon
              width={width * 0.17}
              height={width * 0.17}
              style={{ marginBottom: height * 0.01, marginTop: height * 0.02, }}
            />
            <Text
              className="text-white"
              style={{
                fontSize: width * 0.05,
              }}
            >
              Statistics
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#0E1325] rounded-3xl items-center justify-center"
            style={{
              width: width * 0.405,
              height: height * 0.16,
            }}
          >
            <AchievementsIcon
              width={width * 0.17}
              height={width * 0.17}
              style={{ marginBottom: height * 0.01, marginTop: height * 0.02, }}
            />
            <Text
              className="text-white"
              style={{
                fontSize: width * 0.05,
              }}
            >
              Achievements
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default profile;