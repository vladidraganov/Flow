import React, { useEffect, useState } from "react";
import { View, Text, Image, Dimensions, SafeAreaView, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { supabase } from "@/lib/supabase";
import { FontAwesome5 } from "@expo/vector-icons";

const screenHeight = Dimensions.get("window").height;

const Header = () => {
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [customProfilePictureUrl, setCustomProfilePictureUrl] = useState(null);
  const [level, setLevel] = useState(0);
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

        const { data, error } = await supabase
          .from("profiles")
          .select("profile_picture_id, custom_profile_picture_url, level")
          .eq("user_id", user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
        } else if (data) {
          setLevel(data.level || 0);
          setCustomProfilePictureUrl(data.custom_profile_picture_url);

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
              <View style={{ height: "100%", backgroundColor: "#4361EE", borderRadius: 5, width: "57%" }} />
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
