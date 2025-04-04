import React, { useEffect, useState } from "react";
import { View, Text, Image, Dimensions, SafeAreaView, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { supabase } from "@/lib/supabase";
import { FontAwesome5 } from "@expo/vector-icons";
import LevelXp, {getLevel} from "@/components/levelsConfig"; // Assuming you have a function to get level from XP

const screenHeight = Dimensions.get("window").height;

const Header = () => {
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [customProfilePictureUrl, setCustomProfilePictureUrl] = useState(null);
  const [level, setLevel] = useState(0);
  const [loading, setLoading] = useState(true);
  const [overallXP, setOverallXP] = useState(0);

    



  


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
            .select("profile_picture_id, custom_profile_picture_url, overall_xp")
            .eq("user_id", userId)
            .single();
  
          if (profileError) {
            console.error("Error fetching profile:", profileError);
            return;
          }
  
          setOverallXP(profileData?.overall_xp || 0);
          setLevel(getLevel(profileData?.overall_xp || 0));
          setCustomProfilePictureUrl(profileData?.custom_profile_picture_url);
  
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
        colors={["#1F1F34", "#0C1022"]}
        locations={[0.21, 0.51]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          height: screenHeight * 0.138,
          marginBottom: screenHeight * 0.03,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          paddingHorizontal: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Profile Picture */}
          <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: "#2A2A3C", overflow: "hidden" }}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" style={{ flex: 1 }} />
            ) : (
              <Image source={{ uri: profileImage }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
            )}
          </View>

          {/* Level */}
          <View style={{ marginLeft: 12 }}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>Lv.{level}</Text>
            <View style={{ width: 90, height: 9, backgroundColor: "#2A2A3C", borderRadius: 5, marginTop: 4 }}>
              <View style={{ height: "100%", backgroundColor: "#4361EE", borderRadius: 5, width: `${progressPercent}%` }} />
            </View>
          </View>
        </View>

        {/* Currency Display */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome5 name="fire" size={18} color="orange" />
          <Text style={{ color: "white", fontSize: 18, marginHorizontal: 8 }}>5</Text>
          <FontAwesome5 name="gem" size={18} color="purple" />
          <Text style={{ color: "white", fontSize: 18, marginHorizontal: 8 }}>257</Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Header;
