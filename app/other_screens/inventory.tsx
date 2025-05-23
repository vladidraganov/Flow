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
  ActivityIndicator,
  Modal,
} from "react-native";
import { SvgUri } from "react-native-svg";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";

const { width, height } = Dimensions.get("window");

const Inventory = () => {
  const router = useRouter();
  const [groupedPowerups, setGroupedPowerups] = useState([]);
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPowerUp, setSelectedPowerUp] = useState(null);
  const [fontsLoaded] = useFonts({
    "CustomFont-Bold": require("@/assets/fonts/SF-Pro-Rounded-Bold.otf"),
    "CustomFont-Regular": require("@/assets/fonts/SF-Pro-Rounded-Regular.otf"),
    "CustomFont-Semibold": require("@/assets/fonts/SF-Pro-Rounded-Semibold.otf"),
    "CustomFont-Heavy": require("@/assets/fonts/SF-Pro-Rounded-Heavy.otf"),
    "CustomFont-Medium": require("@/assets/fonts/SF-Pro-Rounded-Medium.otf"),
  });

  if (!fontsLoaded) {
    return (
      <SafeAreaView className="flex-1 bg-[#0A0E1F] items-center justify-center">
        <ActivityIndicator size="large" color="#FFFFFF" />
      </SafeAreaView>
    );
  }

  // Fetch and group user power-ups on component mount
  useEffect(() => {
    fetchUserPowerups();
  }, []);

  const fetchUserPowerups = async () => {
    try {
      const { data: currentUser, error: authError } = await supabase.auth.getUser();

      if (authError || !currentUser?.user) {
        console.error("No user is logged in or failed to fetch user:", authError);
        return;
      }

      const userId = currentUser.user.id;

      const { data: powerups, error: powerupsError } = await supabase
        .from("user_powerups")
        .select("powerup_id, count, powerups(name, effect, icon_url)")
        .eq("user_id", userId);

      if (powerupsError) {
        console.error("Error fetching user power-ups:", powerupsError);
        return;
      }

      setGroupedPowerups(powerups);
    } catch (error) {
      console.error("Unexpected error fetching user power-ups:", error);
    }
  };

  const confirmActivatePowerUp = (powerUp) => {
    setSelectedPowerUp(powerUp);
    setModalVisible(true);
  };

  const activatePowerUp = async () => {
    if (!selectedPowerUp) return;

    try {
      const { data: currentUser, error: authError } = await supabase.auth.getUser();

      if (authError || !currentUser?.user) {
        console.error("No user is logged in or failed to fetch user:", authError);
        return;
      }

      const userId = currentUser.user.id;

      const { error } = await supabase.rpc("apply_powerup", {
        p_user_id: userId,
        p_powerup_id: selectedPowerUp.powerup_id,
      });

      if (error) {
        console.error("Error activating power-up:", error);
        alert("Failed to activate power-up.");
        return;
      }

      alert("Power-up activated successfully!");
      setModalVisible(false);
      fetchUserPowerups();
    } catch (error) {
      console.error("Unexpected error activating power-up:", error);
    }
  };

  // Render each grouped power-up item
  const renderPowerup = ({ item }) => (
    <TouchableOpacity
      style={styles.powerupCard}
      onPress={() => confirmActivatePowerUp(item)}
    >
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
      <Text style={[styles.powerupCount, { fontFamily: "CustomFont-Bold" }]}>{item.count}</Text>
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
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
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
          onPress={() => router.back()}
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
            fontFamily: "CustomFont-Bold",
          }}
        >
          Inventory
        </Text>
      </LinearGradient>

      {/* Power-ups List */}
      <FlatList
        data={groupedPowerups}
        key={`numColumns-${3}`} // Force re-render when numColumns changes
        keyExtractor={(item) => item.powerup_id.toString()}
        renderItem={renderPowerup}
        numColumns={3} // Display 3 cards in a row
        contentContainerStyle={styles.listContainer}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Activate {selectedPowerUp?.powerups.name}?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={activatePowerUp}
              >
                <Text style={styles.buttonText}>Activate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: width * 0.03, // Adjust padding for smaller cards
    paddingBottom: height * 0.02,
  },
  powerupCard: {
    backgroundColor: "#0E1325",
    borderRadius: 20, // Smaller radius for smaller cards
    padding: width * 0.03, // Reduced padding
    margin: width * 0.02, // Adjust margin for spacing
    alignItems: "center",
    width: width * 0.27, // Smaller width for 3 cards in a row
    height: height * 0.13, // Reduced height
    position: "relative", // For positioning the count
    borderWidth: 3, // Add border
    borderColor: "#151C32", // Border color
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
    position: "absolute",
    bottom: 5, // Adjusted for smaller card
    right: 9, // Adjusted for smaller card
    color: "#FFFFFF",
    fontSize: width * 0.038,
    marginBottom: height * -0.01, // Slightly smaller font size
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width * 0.8,
    backgroundColor: "#1E2236",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    color: "#FFFFFF",
    fontSize: width * 0.05,
    fontFamily: "CustomFont-Bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#6c757d",
  },
  confirmButton: {
    backgroundColor: "#28a745",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: width * 0.04,
    fontFamily: "CustomFont-Bold",
  },
});

export default Inventory;