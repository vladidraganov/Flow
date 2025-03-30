import React from "react";
import { TouchableOpacity, Text } from "react-native";
import tw from "twrnc";

const Button = ({ title, onPress, customStyle  }) => {
  return (
    <TouchableOpacity
    style={[tw`bg-blue-600 p-4 rounded-lg items-center `, customStyle]}
      onPress={onPress}
    >
      <Text style={tw`text-white text-lg font-bold ` }>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
