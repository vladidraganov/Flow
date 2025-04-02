import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SvgUri } from "react-native-svg";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const Inventory = () => {
  const router = useRouter();
  const [groupedPowerups, setGroupedPowerups] = useState([]);
  const [user, setUser] = useState(null);

  // Fetch and group user power-ups on component mount
  useEffect(() => {
    const fetchUserPowerups = async () => {
      try {
        const { data: currentUser, error: authError } = await supabase.auth.getUser();

        if (authError || !currentUser?.user) {
          console.error("No user is logged in or failed to fetch user:", authError);
          return;
        }

        const userId = currentUser.user.id;

        const { data: userData, error: userError } = await supabase
          .from("profiles")
          .select("id")
          .eq("user_id", userId)
          .single();

        if (userError) {
          console.error("Error fetching user data:", userError);
          return;
        }

        setUser(userData);

        const { data: powerups, error: powerupsError } = await supabase
          .from("user_powerups")
          .select("powerup_id, activated_at, expires_at, powerups(name, effect, icon_url)")
          .eq("user_id", userData.id);

        if (powerupsError) {
          console.error("Error fetching user power-ups:", powerupsError);
          return;
        }

        // Group power-ups by powerup_id
        const grouped = powerups.reduce((acc, item) => {
          const existing = acc.find((p) => p.powerup_id === item.powerup_id);
          if (existing) {
            existing.count += 1;
          } else {
            acc.push({ ...item, count: 1 });
          }
          return acc;
        }, []);

        setGroupedPowerups(grouped);
      } catch (error) {
        console.error("Unexpected error fetching user power-ups:", error);
      }
    };

    fetchUserPowerups();
  }, []);

  // Render each grouped power-up item
  const renderPowerup = ({ item }) => (
    <TouchableOpacity style={styles.powerupCard}>
      {/* Power-up Name */}
      <Text style={styles.powerupName}>{item.powerups.name}</Text>

      {/* Power-up Icon */}
      {item.powerups.icon_url && item.powerups.icon_url.endsWith(".svg") ? (
        <SvgUri
          uri={item.powerups.icon_url}
          width={width * 0.15}
          height={width * 0.15}
          onError={(e) => console.error("SVG load error:", e.nativeEvent.error)}
        />
      ) : (
        <Text style={styles.placeholderText}>No Icon</Text>
      )}

      {/* Power-up Count */}
      <Text style={styles.powerupCount}>Count: {item.count}</Text>

      {/* Power-up Status */}
      <Text style={styles.powerupStatus}>
        {item.activated_at
          ? `Activated: ${new Date(item.activated_at).toLocaleString()}`
          : "Not Activated"}
      </Text>
      {item.expires_at && (
        <Text style={styles.powerupStatus}>
          Expires: {new Date(item.expires_at).toLocaleString()}
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#0A0E1F]">
      {/* Header */}
      <LinearGradient
        colors={["#13172D", "#0C1022"]}
        locations={[0.0, 0.7]}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          height: height * 0.138,
          marginBottom: height * 0.03,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          paddingHorizontal: 16,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
            className="absolute border border-[#5C5E67] rounded-2xl"
                style={{
                    width: width * 0.12,
                    height: width * 0.12,
                    top: height * 0.02,
                    left: width * 0.06,
                    justifyContent: "center",
                    alignItems: "center",
                    }}
                     onPress={() => router.push("/profile")}
                      >
                     <Image
                     source={require("@/assets/images/back-arrow.png")}
                     style={{
                     width: width * 0.05, // Make arrow responsive
                     height: width * 0.05,
                     tintColor: "#5C5E67",
                     }}
                     />
            </TouchableOpacity>
        {/* Title */}
        <Text
          style={{
            color: "white",
            fontSize: width * 0.06,
            fontWeight: "bold",
          }}
        >
          Inventory
        </Text>
      </LinearGradient>

      {/* Power-ups List */}
      <FlatList
        data={groupedPowerups}
        keyExtractor={(item) => item.powerup_id.toString()}
        renderItem={renderPowerup}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.02,
  },
  powerupCard: {
    backgroundColor: "#0E1325",
    borderRadius: 30,
    padding: width * 0.04,
    margin: width * 0.025,
    alignItems: "center",
    width: width * 0.4,
  },
  placeholderText: {
    color: "#6c757d",
    fontSize: width * 0.04,
    textAlign: "center",
  },
  powerupName: {
    color: "#FFFFFF",
    fontSize: width * 0.045,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: height * 0.01,
  },
  powerupCount: {
    color: "#FFD700",
    fontSize: width * 0.04,
    fontWeight: "bold",
    marginTop: height * 0.01,
  },
  powerupStatus: {
    color: "#28a745",
    fontSize: width * 0.035,
    textAlign: "center",
    marginTop: height * 0.005,
  },
});

export default Inventory;