import { useEffect } from "react";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        router.replace("/(tabs)/home"); // Redirect to home if logged in
      } else {
        router.replace("/welcome"); // Redirect to welcome page if not logged in
      }
    };

    checkAuthStatus();
  }, []);

  return null; // No UI needed here
}