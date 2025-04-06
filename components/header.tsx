import React, { useEffect, useState } from "react";
import { View, Text, Image, Dimensions, SafeAreaView, ActivityIndicator, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { supabase } from "@/lib/supabase";
import { FontAwesome5 } from "@expo/vector-icons";
import LevelXp, {getLevel} from "@/components/levelsConfig"; // Assuming you have a function to get level from XP
import DiamondsIcon from "@/assets/icons/diamonds.svg";
import StreakIcon from "@/assets/icons/streak.svg";
import NotificationsIcon from "@/assets/icons/notifications.svg"; // Import the Notifications icon

const screenHeight = Dimensions.get("window").height;

const Header = () => {
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [customProfilePictureUrl, setCustomProfilePictureUrl] = useState(null);
  const [level, setLevel] = useState(0);
  const [loading, setLoading] = useState(true);
  const [overallXP, setOverallXP] = useState(0);
  const [gems, setGems] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData?.user) {
          console.error("Error fetching user:", userError);
          return;
        }

        const userId = userData.user.id;

        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("profile_picture_id, custom_profile_picture_url, overall_xp, gems, streak")
          .eq("user_id", userId)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
          return;
        }

        setOverallXP(profileData?.overall_xp || 0);
        setLevel(getLevel(profileData?.overall_xp || 0));
        setCustomProfilePictureUrl(profileData?.custom_profile_picture_url);
        setGems(profileData?.gems || 0);
        setStreak(profileData?.streak || 0);

        if (!profileData?.custom_profile_picture_url && profileData?.profile_picture_id) {
          const { data: pictureData, error: pictureError } = await supabase
            .from("profile_pictures")
            .select("image_url")
            .eq("id", profileData.profile_picture_id)
            .single();

          if (pictureError) {
            console.error("Error fetching profile picture:", pictureError);
          } else {
            setProfilePictureUrl(pictureData?.image_url);
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

  //calculate level and progress
  const currentXP = overallXP - LevelXp[level - 1]; // current level xp
  const nextLevelXP = LevelXp[level] - LevelXp[level - 1]; // XP for next level
  const progressPercent = nextLevelXP ? (currentXP / nextLevelXP) * 100 : 100;
  //image url
  const profileImage = customProfilePictureUrl || profilePictureUrl || "https://via.placeholder.com/60";

  return (
    <SafeAreaView>
      <LinearGradient
        colors={["#13172D", "#0C1022"]} 
        locations={[0.0, 0.7]} 
        start={{ x: 1, y: 0 }} 
        end={{ x: 1, y: 1 }} 
        style={{
          height: screenHeight * 0.138,
          marginBottom: screenHeight * 0.03,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          paddingHorizontal: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Profile Picture */}
          <View style={{ width: 50, height: 50, borderRadius: 30, backgroundColor: "#2A2A3C", overflow: "hidden" }}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" style={{ flex: 1 }} />
            ) : (
              <Image source={{ uri: profileImage }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
            )}
          </View>

          {/* Level */}
          <View style={{ marginLeft: 12 }}>
            <Text style={{ color: "white", fontFamily: "CustomFont-Semibold", fontSize: 18,  }}>Lv.{level}</Text>
            <View style={{ width: 90, height: 9, backgroundColor: "#2A2A3C", borderRadius: 5, marginTop: 0, overflow: "hidden" }}>
              <LinearGradient
                colors={["#3D5AFE", "#253698"]}
                start={{ x: 1, y: 0.3 }}
                end={{ x: 1, y: 1 }}
                style={{ height: "100%", width: `${progressPercent}%` }}
              />
            </View>
          </View>
        </View>

        {/* Currency Display */}
        <View style={{ flexDirection: "row", alignItems: "center", marginRight: 16 }}>
          <View style={{ marginRight: 40 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: -5 }}>
              <StreakIcon width={18} height={18} />
              <Text style={{ color: "white", fontFamily: "CustomFont-Semibold", fontSize: 18, marginLeft: 8 }}>{streak}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <DiamondsIcon width={25} height={25} />
              <Text style={{ color: "white", fontFamily: "CustomFont-Semibold", fontSize: 16, marginLeft: 6, marginBottom: 6 }}>{gems}</Text>
            </View>
          </View>

          {/* Notification Icon */}
          <TouchableOpacity>
            <NotificationsIcon
              width={30}
              height={30}
              style={{
                alignSelf: "center",
              }}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Header;
