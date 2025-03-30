import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "./globals.css";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" translucent />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="login" />
        <Stack.Screen name="home" />
        <Stack.Screen name="signup" />
      </Stack>
    </>
  );
}
