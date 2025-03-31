import React from "react";
import { TouchableOpacity, Text, ViewStyle, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";

interface ButtonProps {
  title: string;
  onPress: () => void;
  customStyle?: ViewStyle | object;
  gradientColors?: [string, string] | null; // Can be null to disable gradient
  gradientStart?: { x: number; y: number };
  gradientEnd?: { x: number; y: number };
  innerBorderOnly?: boolean;
  innerBorderColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  customStyle,
  gradientColors,
  gradientStart,
  gradientEnd,
  innerBorderOnly = false,
  innerBorderColor = "#B0B0B0" // Default blue color
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[tw`w-full`, customStyle]}
    >
      {gradientColors ? (
        
        <LinearGradient
          colors={gradientColors}
          start={gradientStart}
          end={gradientEnd}
          style={[tw`p-4 rounded-2xl items-center justify-center`, { width: "100%" }]}
        >
          <Text style={tw`text-white text-2xl font-extrabold`}>{title}</Text>
        </LinearGradient>
      ) : (
      
        <View
          style={[
            tw`rounded-lg items-center justify-center`,
            
            {
              ...customStyle as object,
              borderWidth: innerBorderOnly ? 0 : (customStyle as any)?.borderWidth,
            }
          ]}
        >
          {innerBorderOnly ? (
            <View style={[
              tw`border rounded-2xl items-center justify-center w-full`,
              {
                borderColor: innerBorderColor,
                paddingVertical: 12,
                paddingHorizontal: 20,
              }
            ]}>
              <Text style={tw`text-white text-2xl font-bold`}>{title}</Text>
            </View>
          ) : (
            <Text style={tw`text-white text-lg font-bold`}>{title}</Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;