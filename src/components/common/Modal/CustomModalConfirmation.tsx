import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Alert, Modal, View, Animated } from "react-native";

type CustomModalConfirmationProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  status?: "success" | "alert";
};

const CustomModalConfirmation: React.FC<CustomModalConfirmationProps> = ({
  visible,
  onClose,
  children,
  status = "alert",
}) => {
  // Animated values untuk icon
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  // Effect untuk memulai animasi ketika modal terbuka
  useEffect(() => {
    if (visible) {
      // Reset values
      scaleAnim.setValue(0);
      shakeAnim.setValue(0);

      if (status === "success") {
        // Success animation: bouncy scale
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 120,
          friction: 4,
          useNativeDriver: true,
        }).start();
      } else {
        // Alert animation: scale + shake
        Animated.sequence([
          Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 200,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(shakeAnim, {
              toValue: 10,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
              toValue: -10,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
              toValue: 10,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
              toValue: 0,
              duration: 100,
              useNativeDriver: true,
            }),
          ]),
        ]).start();
      }
    }
  }, [visible, status, scaleAnim, shakeAnim]);

  // Konfigurasi icon berdasarkan status
  const getIconConfig = () => {
    if (status === "success") {
      return {
        name: "checkmark-circle" as keyof typeof Ionicons.glyphMap,
        color: "#27AE60",
        size: 60,
      };
    } else {
      return {
        name: "warning" as keyof typeof Ionicons.glyphMap,
        color: "#E74C3C",
        size: 60,
      };
    }
  };

  const iconConfig = getIconConfig();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        onClose();
      }}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-2xl p-4 items-center shadow-lg">
          {/* Animated Icon */}
          <Animated.View
            style={{
              transform: [
                { scale: scaleAnim },
                { translateX: status === "alert" ? shakeAnim : 0 },
              ],
            }}
          >
            <Ionicons
              name={iconConfig.name}
              size={iconConfig.size}
              color={iconConfig.color}
            />
          </Animated.View>

          <View className="m-2 p-4">{children}</View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModalConfirmation;
