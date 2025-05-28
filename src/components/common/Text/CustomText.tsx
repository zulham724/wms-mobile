import React from "react";
import { Text, TextProps } from "react-native";

interface CustomTextProps extends TextProps {
  className?: string;
  fontFamily?: string;
}

const CustomText: React.FC<CustomTextProps> = ({
  className,
  fontFamily,
  style,
  ...props
}) => {
  return (
    <Text
      className={`${className || ""}`}
      style={[{ fontFamily: fontFamily ?? "Poppins-Regular" }, style]}
      {...props}
    />
  );
};

export default CustomText;
