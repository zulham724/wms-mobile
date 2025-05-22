import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

type BadgeStatus =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "default"
  | "secondary";
type BadgeVariant = "solid" | "outline";
type BadgeSize = "small" | "medium" | "default";

type BadgeProps = {
  label: string;
  status?: BadgeStatus;
  variant?: BadgeVariant;
  size?: BadgeSize;
  customContainerStyle?: StyleProp<ViewStyle>;
  customTextStyle?: StyleProp<TextStyle>;
};

const statusStyles = {
  success: {
    bg: "#C2F9D9",
    border: "#28A745",
    text: "#27AE60",
  },
  error: {
    bg: "#FCDEDE",
    border: "#ED3636",
    text: "#ED3636",
  },
  warning: {
    bg: "#F9EAB6",
    border: "#FFC107",
    text: "#BB940A",
  },
  info: {
    bg: "#6BB9F0",
    border: "#17A2B8",
    text: "#fff",
  },
  default: {
    bg: "#000",
    border: "#000",
    text: "#000",
    solidText: "#FFFFFF",
    outlineText: "#000",
  },
  secondary: {
    bg: "#7A8487",
    border: "#7A8487",
    text: "#FFFFFF", // White text because background is dark
  },
};

const sizeStyles = {
  small: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    fontSize: 10,
  },
  medium: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 11,
  },
  default: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 12,
  },
};

const BadgeComponent: React.FC<BadgeProps> = ({
  label,
  status = "info",
  variant = "solid",
  size = "default",
  customContainerStyle,
  customTextStyle,
}) => {
  const { bg, border, text } = statusStyles[status];
  const sizeStyle = sizeStyles[size];

  const containerStyle: StyleProp<ViewStyle> = [
    styles.badgeContainer,
    {
      backgroundColor: variant === "solid" ? bg : "transparent",
      borderColor: border,
      borderWidth: variant === "outline" ? 1 : 0,
      paddingHorizontal: sizeStyle.paddingHorizontal,
      paddingVertical: sizeStyle.paddingVertical,
    },
    customContainerStyle,
  ];

  // Determine text color for default status based on variant
  let textColor = text;
  if (status === "default") {
    textColor =
      variant === "solid"
        ? statusStyles.default.solidText
        : statusStyles.default.outlineText;
  }

  const textStyle: StyleProp<TextStyle> = [
    styles.badgeText,
    {
      color: textColor,
      fontSize: sizeStyle.fontSize,
    },
    customTextStyle,
  ];

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontWeight: "600",
  },
});

export default BadgeComponent;
