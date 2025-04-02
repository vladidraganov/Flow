import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Alert,
  Image,
} from "react-native";
import { SvgUri } from "react-native-svg";
import { supabase } from "@/lib/supabase";
import { fetchPowerups } from "@/api/powerups"; // Adjust the path as needed
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import DiamondsIcon from "@/assets/icons/diamonds.svg"; // Import the gem icon

const { width, height } = Dimensions.get("window");

const Store = () => {
  const router = useRouter();
  const [powerups, setPowerups] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getPowerups = async () => {
      const data = await fetchPowerups();
      setPowerups(data);
    };

    const fetchUser = async () => {
      try {
        const { data: currentUser, error: authError } = await supabase.auth.getUser();

        if (authError || !currentUser?.user) {
          console.error("No user is logged in or failed to fetch user:", authError);
          return;
        }

        const userId = currentUser.user.id;

        const { data, error } = await supabase
          .from("profiles")
          .select("id, gems")
          .eq("user_id", userId)
          .single();

        if (error) {
          console.error("Error fetching user data:", error);
          return;
        }

        setUser(data);
      } catch (error) {
        console.error("Unexpected error fetching user data:", error);
      }
    };

    getPowerups();
    fetchUser();
  }, []);

  // Handle power-up purchase
  const handlePurchase = async (powerup) => {
    if (!user) {
      alert("User data not loaded.");
      return;
    }

    if (user.gems < powerup.cost) {
      alert("Not Enough Gems: You do not have enough gems to purchase this power-up.");
      return;
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ gems: user.gems - powerup.cost })
      .eq("id", user.id);

    if (updateError) {
      alert("Failed to deduct gems.");
      console.error(updateError);
      return;
    }

    const { error: insertError } = await supabase
      .from("user_powerups")
      .insert({
        user_id: user.id,
        powerup_id: powerup.id,
        activated_at: null,
        expires_at: null,
      });

    if (insertError) {
      alert("Failed to add power-up to inventory.");
      console.error(insertError);
      return;
    }

    setUser((prevUser) => ({ ...prevUser, gems: prevUser.gems - powerup.cost }));
    alert(`You have purchased the ${powerup.name} power-up!`);
  };

  // Show confirmation prompt
  const confirmPurchase = (powerup) => {
    Alert.alert(
      "Confirm Purchase",
      `Do you want to purchase the ${powerup.name} power-up for ${powerup.cost} gems?`,
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => handlePurchase(powerup),
        },
      ]
    );
  };

  // Render each power-up item
  const renderPowerup = ({ item }) => (
    <TouchableOpacity style={styles.powerupCard} onPress={() => confirmPurchase(item)}>
      {/* Power-up Name */}
      <Text style={styles.powerupName}>{item.name}</Text>

      {/* Power-up Icon */}
      {item.icon_url && item.icon_url.endsWith(".svg") ? (
        <SvgUri
          uri={item.icon_url}
          width={width * 0.15}
          height={width * 0.15}
          onError={(e) => console.error("SVG load error:", e.nativeEvent.error)}
        />
      ) : (
        <Text style={styles.placeholderText}>No Icon</Text>
      )}

      {/* Power-up Cost */}
      <View style={styles.costContainer}>
        <DiamondsIcon width={width * 0.05} height={width * 0.05} />
        <Text style={styles.powerupCost}>{item.cost}</Text>
      </View>
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
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Back Button Placeholder */}
        <View style={{ width: width * 0.1 }} />
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
            marginLeft: width * 0.09,
          }}
        >
          Store
        </Text>

        {/* Gems Display */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <DiamondsIcon width={width * 0.08} height={width * 0.08} />
          <Text
            style={{
              color: "white",
              fontSize: width * 0.05,
              fontWeight: "bold",
              marginLeft: 5,
              marginBottom: 5,
              marginRight: 10,
            }}
          >
            {user ? user.gems : "..."}
          </Text>
        </View>
      </LinearGradient>

      {/* Power-ups List */}
      <FlatList
        data={powerups}
        keyExtractor={(item) => item.id.toString()}
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
    marginBottom: height * 0.01, // Adjusted for spacing
  },
  costContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.01,
    backgroundColor: "#1A1F38",
    borderRadius: 20,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.005,
  },
  powerupCost: {
    color: "#FFFFFF",
    fontSize: width * 0.04,
    fontWeight: "bold",
    marginLeft: width * 0.02,
  },
});

export default Store;