import React, { useEffect } from "react";
import { View, Image, Dimensions, StatusBar } from "react-native";
import { CustomText } from "@components/common";

interface SplashScreenProps {
  onFinish: () => void;
}

const { width, height } = Dimensions.get("window");

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  // Auto finish after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000); // 3 seconds total

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <StatusBar hidden />

      {/* Logo Container */}
      <View className="flex-1 justify-center items-center">
        <Image
          source={require("@assets/images/splash-icon.png")}
          style={{
            width: width * 0.4,
            height: width * 0.4,
            maxWidth: 160,
            maxHeight: 160,
          }}
          resizeMode="contain"
        />
      </View>

      {/* Version Text */}
      <View className="pb-20">
        <CustomText className="text-center text-xs">App Version</CustomText>
        <CustomText className="text-center text-xs">V.1.0-Dev</CustomText>
      </View>
    </View>
  );
}
