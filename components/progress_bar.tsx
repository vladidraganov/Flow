import React from "react";
import { View, StyleSheet } from "react-native";
import {LinearGradient} from "expo-linear-gradient";

interface GradientProgressBarProps {
  progress: number; // Value between 0 and 1
}

const GradientProgressBar: React.FC<GradientProgressBarProps> = ({ progress }) => {
  return (
    <View style={styles.progressContainer}>
      <LinearGradient
        colors={["#6366F1", "#A855F7"]} // Purple gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.progressFill, { width: `${progress * 100}%` }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    width: "100%",
    height: 10,
    backgroundColor: "#232333",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 10,
  },
});

export default GradientProgressBar;