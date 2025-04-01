import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import GradientProgressBar from "../components/progress_bar";

interface CardProps {
  title: string;
  subtitle?: string;
  progress?: number; // Progress is optional
  style?: object; // Allows custom styling from Home.tsx
  gradientColors?: [string, string]; // Optional gradient colors for the card
  gradientStart?: { x: number; y: number }; // Optional start position of the gradient
  gradientEnd?: { x: number; y: number }; // Optional end position of the gradient
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  progress,
  style,
  gradientColors,
  gradientStart = { x: 0, y: 0 }, // Default start position if not provided
  gradientEnd = { x: 1, y: 1 }, // Default end position if not provided
}) => {
  return (
    <View style={[styles.cardContainer, style]}>
      {gradientColors ? (
        // Apply the gradient if gradientColors are provided
        <LinearGradient
          colors={gradientColors}
          start={gradientStart} // Apply gradient start position
          end={gradientEnd} // Apply gradient end position
          style={styles.gradientBackground} // Apply the gradient to the background only
        >
          <View style={styles.cardContent}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            {progress !== undefined && <GradientProgressBar progress={progress} />}
          </View>
        </LinearGradient>
      ) : (
        // If no gradientColors are provided, just use a solid background color
        <View style={styles.cardContent}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          {progress !== undefined && <GradientProgressBar progress={progress} />}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: "#000",
    width: "80%",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    alignSelf: "center",
    shadowOffset: { width: 0, height: 4 },
  },
  gradientBackground: {
    flex: 1, // Ensures the gradient fills the container
    borderRadius: 20,
  },
  cardContent: {
    padding: 20, // Keeps the inner content properly padded
    borderRadius: 20,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#AAA",
    fontSize: 14,
    marginBottom: 8,
  },
});

export default Card;
