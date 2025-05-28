import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import HeaderComponent from "@components/ui/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import ModalStartScanner from "@components/ui/ModalStartScanner";
import { useSelector } from "react-redux";
import ScannerBarcode from "@components/ui/ScannerBarcode";
import { NavigationStateInterface } from "@services/features/navigationSlice";
import {CustomText} from "@components/common";

interface GlobalWrapperProps {
  title?: string;
  showBackAction?: boolean;
  showScannerButton?: boolean;
  children: React.ReactNode;
}

const GlobalWrapper = ({
  title,
  showBackAction = true,
  showScannerButton = false,
  children,
}: GlobalWrapperProps) => {
  const navigation = useNavigation();
  const navigationState: NavigationStateInterface = useSelector(
    (state: any) => state.navigation
  );

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <StatusBar style="dark" />
      <View className="flex-1 bg-[#EFF1F4]">
        <HeaderComponent />
        <View
          className={`${showBackAction && "py-4"} px-4 flex-row items-center`}
        >
          {showBackAction && (
            <TouchableOpacity
              className="absolute left-4"
              onPress={handleGoBack}
            >
              <Ionicons name="arrow-back" size={22} color="black" />
            </TouchableOpacity>
          )}
          <View className="flex-1 items-center">
            {title && <CustomText fontFamily="Poppins-SemiBold">{title}</CustomText>}
          </View>
        </View>

        {/* Floating button untuk scanner */}
        {/* <FloatingButtonScanner /> */}

        {/* Modal untuk scanner */}
        <ModalStartScanner />

        {/* Scanner overlay */}
        {navigationState.isScannerVisible && (
          <View className="absolute inset-0 z-[100] bg-white">
            <ScannerBarcode />
          </View>
        )}

        {/* Here goes the dynamic content */}
        <View className="flex-1 px-4">{children}</View>
      </View>
    </SafeAreaView>
  );
};

export default GlobalWrapper;
