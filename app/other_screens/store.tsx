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
  Modal,
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
  const [selectedPowerup, setSelectedPowerup] = useState(null); // Track selected powerup
  const [modalVisible, setModalVisible] = useState(false); // Track modal visibility
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false); // Track purchase modal visibility

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
    setModalVisible(false); // Close confirmation modal

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
    setPurchaseModalVisible(true); // Show purchase modal
    setTimeout(() => setPurchaseModalVisible(false), 2000); // Hide modal after 2 seconds
  };

  // Show confirmation modal
  const confirmPurchase = (powerup) => {
    setSelectedPowerup(powerup);
    setModalVisible(true);
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
      {/* Modal for purchase confirmation */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Purchase {selectedPowerup?.name}?</Text>
            <View style={styles.modalBalanceContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.modalText}>Current Balance:</Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 5 }}>
                  <DiamondsIcon width={width * 0.04} height={width * 0.04} />
                  <Text style={styles.modalText}> {user?.gems || 0}</Text>
                </View>
              </View>
            </View>
            <View style={styles.modalCostContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <DiamondsIcon width={width * 0.08} height={width * 0.08} />
                <Text style={styles.modalCostText}>{selectedPowerup?.cost}</Text>
              </View>
            </View>
            <View style={styles.modalButtonsBackground}>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.confirmButton]}
                  onPress={() => handlePurchase(selectedPowerup)}
                >
                  <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Purchase Success Modal */}
      {purchaseModalVisible && (
        <View style={styles.purchaseModal}>
          <Text style={styles.purchaseModalText}>Item Purchased!</Text>
        </View>
      )}

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
    marginTop: height * 0.03,
    backgroundColor: "#0E1325",
    borderRadius: 30,
    padding: width * 0.05, // Increased padding for a taller card
    margin: width * 0.025,
    alignItems: "center",
    width: width * 0.4,
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
    marginBottom: height * 0.01, // Adjusted for spacing
  },
  costContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute", // Position it absolutely
    bottom: -height * 0.025, // Half under the card
    alignSelf: "center", // Center horizontally
    backgroundColor: "#0A0E1F",
    borderRadius: 20,
    borderWidth: 3, // Add border
    borderColor: "#151C32", // Border color
    paddingHorizontal: width * 0.013,
    paddingVertical: height * 0.005,
  },
  powerupCost: {
    color: "#FFFFFF",
    fontSize: width * 0.04,
    fontWeight: "bold",
    marginLeft: width * 0.005, // Reduced margin for less space
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#0A0E1F",
    borderRadius: 35,
    borderWidth: 3, // Add border
    borderColor: "#151C32", // Border color
    paddingTop: 20,
    alignItems: "center",
  },
  modalTitle: {
    color: "#FFFFFF",
    fontSize: width * 0.05,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalBalanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  modalText: {
    color: "#FFFFFF",
    fontSize: width * 0.035, // Smaller font size for "Current Balance"
    textAlign: "center",
  },
  modalCostContainer: {
    
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  modalCostText: {
    color: "#FFFFFF",
    fontSize: width * 0.06, // Larger font size for cost
    fontWeight: "bold",
    marginLeft: width * 0.02, // Space between icon and text
  },
  modalButtonsBackground: {
    width: "100%", // Match the modal container width
    backgroundColor: "#1A1F38", // Background color behind buttons
    borderBottomLeftRadius: 30, // Rounded bottom-left corner
    borderBottomRightRadius: 30, // Rounded bottom-right corner
    paddingVertical: 10,
    marginTop: 10,
    alignItems: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginBottom: 10,
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: "#5C5E67",
  },
  confirmButton: {
    backgroundColor: "#3D5AFE",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  purchaseModal: {
    position: "absolute",
    top: height * 0.15, // Position under the header
    right: width * 0.05, // Align to the right
    backgroundColor: "#0A0E1F",
    borderRadius: 20,
    borderWidth: 3, // Add border
    borderColor: "#151C32", // Border color
    paddingVertical: 10,
    paddingHorizontal: 15,
    zIndex: 10, // Ensure it appears above other elements

  },
  purchaseModalText: {
    color: "#FFFFFF",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
});

export default Store;