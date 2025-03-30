import React from "react";
import { TouchableOpacity, Text, ViewStyle } from "react-native";
import tw from "twrnc";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient from expo

interface ButtonProps {
  title: string;
  onPress: () => void;
  customStyle?: ViewStyle | object;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, customStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={customStyle}>
      <LinearGradient
        colors={['#3D5AFE', '#253698']} // Gradient colors
        start={{ x: 0.19, y: 0 }} // Gradient start position
        end={{ x: 0.92, y: 1 }} // Gradient end position
        style={[tw`p-4 rounded-lg items-center`, customStyle]} // Apply custom styles here
      >
        <Text style={tw`text-white text-lg font-bold`}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Button;
