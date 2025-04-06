import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import Header from "@/components/header"; // Reuse the Header component
import { supabase } from "@/lib/supabase";

const { width, height } = Dimensions.get("window");

const SocialScreen = () => {
  const [friends, setFriends] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    "CustomFont-Bold": require("@/assets/fonts/SF-Pro-Rounded-Bold.otf"),
    "CustomFont-Regular": require("@/assets/fonts/SF-Pro-Rounded-Regular.otf"),
    "CustomFont-Semibold": require("@/assets/fonts/SF-Pro-Rounded-Semibold.otf"),
    "CustomFont-Heavy": require("@/assets/fonts/SF-Pro-Rounded-Heavy.otf"),
    "CustomFont-Medium": require("@/assets/fonts/SF-Pro-Rounded-Medium.otf"),
  });

  useEffect(() => {
    const fetchSocialData = async () => {
      try {
        setLoading(true);

        // Fetch friends
        const { data: friendsData, error: friendsError } = await supabase
          .from("friends")
          .select("id, username, profile_picture_url");
        if (friendsError) {
          console.error("Error fetching friends:", friendsError);
        } else {
          setFriends(friendsData || []);
        }

        // Fetch leaderboard
        const { data: leaderboardData, error: leaderboardError } = await supabase
          .from("profiles")
          .select("username, level, overall_xp")
          .order("overall_xp", { ascending: false })
          .limit(10);
        if (leaderboardError) {
          console.error("Error fetching leaderboard:", leaderboardError);
        } else {
          setLeaderboard(leaderboardData || []);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialData();
  }, []);

  if (!fontsLoaded || loading) {
    return (
      <SafeAreaView className="flex-1 bg-[#0A0E1F] items-center justify-center">
        <ActivityIndicator size="large" color="#FFFFFF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#0A0E1F]">
      {/* Fixed Header */}
      <View style={{ position: "absolute", top: 0, width: "100%", zIndex: 10 }}>
        <Header />
      </View>

      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={{
          paddingTop: height * 0.138, // Offset for the fixed header
          paddingBottom: height * 0.02,
        }}
      >
        {/* Friends Section */}
        <View style={{ marginBottom: height * 0.03 }}>
          <Text
            style={{
              color: "white",
              fontSize: width * 0.06,
              fontFamily: "CustomFont-Bold",
              marginLeft: width * 0.05,
              marginBottom: height * 0.01,
            }}
          >
            Friends
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: width * 0.05 }}
          >
            {friends.map((friend) => (
              <View
                key={friend.id}
                style={{
                  alignItems: "center",
                  marginRight: width * 0.05,
                }}
              >
                <Image
                  source={{ uri: friend.profile_picture_url || "https://via.placeholder.com/60" }}
                  style={{
                    width: width * 0.2,
                    height: width * 0.2,
                    borderRadius: width * 0.1,
                    backgroundColor: "#2A2A3C",
                  }}
                />
                <Text
                  style={{
                    color: "white",
                    fontSize: width * 0.04,
                    fontFamily: "CustomFont-Semibold",
                    marginTop: height * 0.01,
                  }}
                >
                  {friend.username}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Leaderboard Section */}
        <View>
          <Text
            style={{
              color: "white",
              fontSize: width * 0.06,
              fontFamily: "CustomFont-Bold",
              marginLeft: width * 0.05,
              marginBottom: height * 0.01,
            }}
          >
            Leaderboard
          </Text>
          {leaderboard.map((user, index) => (
            <LinearGradient
              key={index}
              colors={["#13172D", "#0C1022"]}
              locations={[0.0, 0.7]}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                borderRadius: 15,
                marginHorizontal: width * 0.05,
                marginBottom: height * 0.02,
                padding: width * 0.05,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: width * 0.05,
                  fontFamily: "CustomFont-Semibold",
                }}
              >
                {index + 1}. {user.username}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: width * 0.045,
                  fontFamily: "CustomFont-Medium",
                }}
              >
                Lv. {user.level} - {user.overall_xp} XP
              </Text>
            </LinearGradient>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SocialScreen;