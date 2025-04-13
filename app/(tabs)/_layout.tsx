import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";
import { View, StyleSheet, Pressable } from "react-native";

// Import the custom icon components
import HomeIcon from "@/components/icons/HomeIcon";
import TasksIcon from "@/components/icons/TasksIcon";
import SocialIcon from "@/components/icons/SocialIcon";
import ProfileIcon from "@/components/icons/ProfileIcon";

export default function TabsLayout() {
  useEffect(() => {
    // Set the system navigation bar background color
    NavigationBar.setBackgroundColorAsync("#0A0E1F");
  }, []);

  return (
    <View style={styles.container}>
      {/* Configure the status bar */}
      <StatusBar style="light" translucent={false} backgroundColor="#0A0E1F" />

      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#0C1023", // Dark background
            borderTopWidth: 0, // Remove top border
            height: "10%", // Responsive height
            paddingBottom: "2%", // Responsive padding
            borderTopLeftRadius: 17, // Round top-left corner
            borderTopRightRadius: 20, // Round top-right corner
            overflow: "hidden", // Ensure content respects the rounded corners
            justifyContent: "center", // Center content vertically
          },
          tabBarLabelStyle: {
            fontSize: 12, // Adjust font size
            fontWeight: "600", // Make labels bold
            marginTop: -4, // Reduce space between icon and text
          },
          tabBarActiveTintColor: "#293CA5", // Active tab color
          tabBarInactiveTintColor: "#5C5E67", // Inactive tab color
          headerShown: false,
          tabBarIconStyle: {
            alignItems: "center", // Center icons horizontally
          },
          tabBarButton: (props) => (
            <Pressable
              {...props}
              android_ripple={{ color: "transparent" }} // Disable ripple effect
              style={[props.style, { justifyContent: "center" }]} // Center button content
            >
              {props.children}
            </Pressable>
          ),
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <HomeIcon size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="tasks"
          options={{
            title: "Tasks",
            tabBarIcon: ({ color, size }) => (
              <TasksIcon size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="social"
          options={{
            title: "Social",
            tabBarIcon: ({ color, size }) => (
              <SocialIcon size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <ProfileIcon size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0E1F", // Match the tab bar background color
  },
});