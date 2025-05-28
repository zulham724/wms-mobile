import React from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { CustomText } from "@components/common";

type ButtonSize = "small" | "medium" | "large";
type ButtonVariant = "solid" | "outline";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  size?: ButtonSize;
  variant?: ButtonVariant;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  textStyle?: StyleProp<TextStyle>;
  iconName?: string;
  iconColor?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  borderColor?: string;
};

const sizeStyles = {
  small: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 12,
    iconSize: 14,
  },
  medium: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    fontSize: 16,
    iconSize: 18,
  },
  large: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    fontSize: 20,
    iconSize: 22,
  },
};

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  size = "medium",
  variant = "solid",
  backgroundColor = "#4CAF50",
  textColor,
  borderRadius = 10,
  textStyle,
  iconName,
  iconColor,
  buttonStyle,
  borderColor,
}) => {
  const currentSize = sizeStyles[size];

  // Calculate styles based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case "outline":
        return {
          backgroundColor: "transparent",
          borderColor: borderColor || backgroundColor,
          borderWidth: 1,
          buttonTextColor: textColor || backgroundColor,
          buttonIconColor: iconColor || textColor || backgroundColor,
        };
      case "solid":
      default:
        return {
          backgroundColor: backgroundColor,
          borderColor: "transparent",
          borderWidth: 0,
          buttonTextColor: textColor || "#fff",
          buttonIconColor: iconColor || textColor || "#fff",
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: variantStyles.backgroundColor,
          borderRadius,
          borderColor: variantStyles.borderColor,
          borderWidth: variantStyles.borderWidth,
          paddingVertical: currentSize.paddingVertical,
          paddingHorizontal: currentSize.paddingHorizontal,
        },
        buttonStyle,
      ]}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {iconName && (
          <Icon
            name={iconName}
            size={currentSize.iconSize}
            color={variantStyles.buttonIconColor}
            style={styles.icon}
          />
        )}
        <CustomText
          style={[
            {
              fontSize: currentSize.fontSize,
              color: variantStyles.buttonTextColor,
            },
            textStyle,
          ]}
          fontFamily="Poppins-SemiBold"
        >
          {title}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
});

export default CustomButton;
