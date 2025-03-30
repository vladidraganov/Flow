import { Stack } from "expo-router";
import './globals.css'

export default function RootLayout() {
  return <Stack>
    <Stack.Screen
      name="index"
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="welcome"
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="login"
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="signup"
      options={{
        headerShown: false,
      }}
    />  
  </Stack>;
}
