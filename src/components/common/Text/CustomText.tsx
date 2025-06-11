import React from "react";
import { Text, TextProps } from "react-native";

interface CustomTextProps extends TextProps {
  className?: string;
  fontFamily?: string;
  children?: React.ReactNode;
}

const CustomText: React.FC<CustomTextProps> = ({
  className,
  fontFamily,
  style,
  children,
  ...props
}) => {
  return (
    <Text
      className={`${className || ""}`}
      style={[{ fontFamily: fontFamily ?? "Poppins-Regular" }, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default CustomText;
