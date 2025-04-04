import { View, Text, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import StatisticsIcon from '@/assets/icons/statistics-icon.svg';
import AchievementsIcon from '@/assets/icons/achievements-icon.svg';
import InventoryIcon from '@/assets/icons/inventory-icon.svg';
import StoreIcon from '@/assets/icons/store-icon.svg';
import SettingsIcon from '@/assets/icons/settings-icon.svg';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get("window");

const profile = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(true);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [customProfilePictureUrl, setCustomProfilePictureUrl] = useState("");
  const [level, setLevel] = useState(0);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
          console.error("Error fetching user:", userError);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("profiles")
          .select("username, full_name, user_id, profile_picture_id, custom_profile_picture_url, level")
          .eq("user_id", user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
        } else if (data) {
          setUsername(data.username);
          setFullName(data.full_name || "Unknown Name");
          setLevel(data.level || 0);
          setCustomProfilePictureUrl(data.custom_profile_picture_url || "");

          if (!data.custom_profile_picture_url && data.profile_picture_id) {
            const { data: pictureData, error: pictureError } = await supabase
              .from("profile_pictures")
              .select("image_url")
              .eq("id", data.profile_picture_id)
              .single();

            if (pictureError) {
              console.error("Error fetching profile picture:", pictureError);
            } else if (pictureData) {
              setProfilePictureUrl(pictureData.image_url);
            }
          }
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
        contentContainerStyle={{
          alignItems: "center",
          paddingVertical: height * 0.03,
        }}
        className="bg-[#0A0E1F]"
      >
        {/* Settings Button */}
        <TouchableOpacity
          className="absolute z-10"
          style={{
            top: height * 0.03,
            right: width * 0.05,
          }}
          onPress={() => router.push('../other_screens/settings')}
        >
          <SettingsIcon width={width * 0.08} height={width * 0.08} />
        </TouchableOpacity>

        {/* Profile Section */}
        <View className="items-center mb-6">
          <View
            className="rounded-full overflow-hidden bg-[#2A2A3C]"
            style={{
              width: width * 0.35,
              height: width * 0.35,
              marginBottom: height * 0.02,
            }}
          >
            {customProfilePictureUrl || profilePictureUrl ? (
              <Image
                source={{ uri: customProfilePictureUrl || profilePictureUrl }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            ) : null}
          </View>
          <Text className="text-white font-bold" style={{ fontSize: width * 0.08, marginBottom: height * 0.005 }}>
            {loading ? "Loading..." : fullName}
          </Text>
          <Text className="text-gray-400" style={{ fontSize: width * 0.045, marginBottom: height * 0.02 }}>
            @{loading ? "loading..." : username || "unknown"}
          </Text>
          <LinearGradient
            colors={["#13172D", "#0C1022"]}
            locations={[0.0, 0.7]}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 20,
              paddingVertical: height * 0.01,
              paddingHorizontal: width * 0.05,
            }}
          >
            <TouchableOpacity
              className="rounded-3xl"
              onPress={() => router.push('../other_screens/edit_profile')}
            >
              <Text className="text-white font-medium" style={{ fontSize: width * 0.045 }}>
                Edit Profile
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Level and Progress */}
        <LinearGradient
          colors={["#13172D", "#0C1022"]}
          locations={[0.0, 0.7]}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: width * 0.9,
            borderRadius: 20,
            padding: width * 0.05,
            marginBottom: height * 0.03,
          }}
        >
          <View className="items-center">
            <Text className="text-white font-bold" style={{ fontSize: width * 0.07, marginBottom: height * 0.01 }}>
              Level {loading ? "..." : level}
            </Text>
            <View className="bg-[#2A2A3C] rounded-full overflow-hidden" style={{ width: "100%", height: height * 0.02 }}>
              <View className="bg-[#5D16A4] h-full" style={{ width: "50%" }} />
            </View>
            <Text className="text-gray-400" style={{ fontSize: width * 0.045, marginTop: height * 0.005 }}>
              200 / 400 XP
            </Text>
          </View>
        </LinearGradient>

        {/* Action Buttons */}
        <View
          className="flex-row justify-between"
          style={{
            width: width * 0.9,
            marginBottom: height * 0.03,
          }}
        >
          <LinearGradient
            colors={["#13172D", "#0C1022"]}
            locations={[0.0, 0.7]}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: width * 0.43,
              height: height * 0.14,
              borderRadius: 20,
              marginRight: width * 0.02,
            }}
          >
            <TouchableOpacity
              className="items-center justify-center flex-1"
              onPress={() => router.push("../other_screens/inventory")}
            >
              <InventoryIcon width={width * 0.12} height={width * 0.12} />
              <Text className="text-white font-medium" style={{ fontSize: width * 0.045, marginTop: height * 0.01 }}>
                Inventory
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={["#13172D", "#0C1022"]}
            locations={[0.0, 0.7]}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: width * 0.43,
              height: height * 0.14,
              borderRadius: 20,
            }}
          >
            <TouchableOpacity
              className="items-center justify-center flex-1"
              onPress={() => router.push("../other_screens/store")}
            >
              <StoreIcon width={width * 0.12} height={width * 0.12} />
              <Text className="text-white font-medium" style={{ fontSize: width * 0.045, marginTop: height * 0.01 }}>
                Store
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Statistics and Achievements */}
        <View
          className="flex-row justify-between"
          style={{
            width: width * 0.9,
          }}
        >
          <LinearGradient
            colors={["#13172D", "#0C1022"]}
            locations={[0.0, 0.7]}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: width * 0.43,
              height: height * 0.14,
              borderRadius: 20,
              marginRight: width * 0.02,
            }}
          >
            <TouchableOpacity className="items-center justify-center flex-1">
              <StatisticsIcon width={width * 0.15} height={width * 0.15} />
              <Text className="text-white font-medium" style={{ fontSize: width * 0.045, marginTop: height * 0.01 }}>
                Statistics
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={["#13172D", "#0C1022"]}
            locations={[0.0, 0.7]}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: width * 0.43,
              height: height * 0.14,
              borderRadius: 20,
            }}
          >
            <TouchableOpacity className="items-center justify-center flex-1">
              <AchievementsIcon width={width * 0.15} height={width * 0.15} />
              <Text className="text-white font-medium" style={{ fontSize: width * 0.045, marginTop: height * 0.01 }}>
                Achievements
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default profile;