import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/lib/supabase";
import Button from "@/components/button";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

const { width, height } = Dimensions.get("window");

const EditProfileScreen = () => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [customProfilePictureUrl, setCustomProfilePictureUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        console.error("Error fetching user:", userError);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("username, full_name, profile_picture_id, custom_profile_picture_url")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        setUsername(data.username || "");
        setFullName(data.full_name || "");
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
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleUploadPicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const file = result.assets[0];
      const fileName = file.uri.split("/").pop();
      const { data, error } = await supabase.storage
        .from("profile-pictures")
        .upload(`custom/${fileName}`, {
          uri: file.uri,
          type: "image/jpeg",
          name: fileName,
        });

      if (error) {
        alert("Failed to upload image. Please try again.");
        console.error(error);
      } else {
        const { data: publicUrlData } = supabase.storage
          .from("profile-pictures")
          .getPublicUrl(data.path);
        setCustomProfilePictureUrl(publicUrlData.publicUrl);
      }
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        alert("Failed to fetch user. Please try again.");
        setLoading(false);
        return;
      }

      // Validate inputs
      if (!username.trim() || !fullName.trim()) {
        alert("Username and Full Name cannot be empty.");
        setLoading(false);
        return;
      }

      if (username.length > 50 || fullName.length > 100) {
        alert("Username or Full Name exceeds the allowed length.");
        setLoading(false);
        return;
      }

      // Update the profile in the database
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          username: username.trim(),
          full_name: fullName.trim(),
          custom_profile_picture_url: customProfilePictureUrl || null,
        })
        .eq("user_id", user.id);

      if (updateError) {
        alert("Failed to update profile. Please try again.");
        setLoading(false);
        return;
      }

      alert("Profile updated successfully!");
      router.push("/(tabs)/profile");
    } catch (err) {
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0A0E1F]">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, alignItems: "center", paddingVertical: height * 0.02 }}
      >
        {/* Profile Picture */}
        <TouchableOpacity
          className="rounded-full"
          style={{
            width: width * 0.35,
            height: width * 0.35,
            marginTop: height * 0.05,
            marginBottom: height * 0.02,
            overflow: "hidden",
            backgroundColor: customProfilePictureUrl || profilePictureUrl ? "transparent" : "gray",
          }}
          onPress={handleUploadPicture}
        >
          {customProfilePictureUrl || profilePictureUrl ? (
            <Image
              source={{ uri: customProfilePictureUrl || profilePictureUrl }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          ) : (
            <Text className="text-white text-center" style={{ marginTop: height * 0.12 }}>
              Add Photo
            </Text>
          )}
        </TouchableOpacity>

        {/* Username Label and Input */}
        <View style={{ width: width * 0.85, marginBottom: height * 0.02 }}>
          <Text
            className="text-[#5C5E67]"
            style={{
              fontSize: width * 0.045,
              marginBottom: height * 0.005,
            }}
          >
            Username
          </Text>
          <TextInput
            className="bg-transparent text-white rounded-2xl border border-[#5C5E67]"
            style={{
              width: "100%",
              height: height * 0.08,
              fontSize: width * 0.045,
              paddingHorizontal: width * 0.04,
            }}
            placeholder="Enter your username"
            placeholderTextColor="gray"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        {/* Full Name Label and Input */}
        <View style={{ width: width * 0.85, marginBottom: height * 0.02 }}>
          <Text
            className="text-[#5C5E67]"
            style={{
              fontSize: width * 0.045,
              marginBottom: height * 0.005,
            }}
          >
            Full Name
          </Text>
          <TextInput
            className="bg-transparent text-white rounded-2xl border border-[#5C5E67]"
            style={{
              width: "100%",
              height: height * 0.08,
              fontSize: width * 0.045,
              paddingHorizontal: width * 0.04,
            }}
            placeholder="Enter your full name"
            placeholderTextColor="gray"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        {/* Save Button */}
        <Button
          title={loading ? "Saving..." : "Save"}
          onPress={handleSave}
          customStyle={{
            marginTop: height * 0.02,
            height: height * 0.08,
            width: width * 0.85,
            alignItems: "center",
            justifyContent: "center",
          }}
          gradientColors={["#293CA5", "#1A2668"]}
          gradientStart={{ x: 0.19, y: 0 }}
          gradientEnd={{ x: 0.32, y: 1 }}
          disabled={loading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
