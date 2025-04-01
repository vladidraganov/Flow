import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'expo-router'

const home = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/welcome"); // Redirect to the welcome page after logout
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0A0E1F]">
      <View className=''>
        <Text className=''>home</Text>
        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="mt-4 bg-red-500 p-4 rounded-lg"
        >
          <Text className="text-white text-center">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default home