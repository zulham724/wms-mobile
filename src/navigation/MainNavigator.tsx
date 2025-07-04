import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "@screens/main/HomeScreen";
import ProfileScreen from "@screens/main/ProfileScreen";
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { CustomBottomSheet } from "@components/common";
import {
  setIsBottomSheetVisible,
  setIsTransactionVisible,
} from "@services/features/uiVisibilitySlice";
import FilterTransactionDetails from "@components/FilterTransactionDetails";
import { useNavigation } from "@react-navigation/native";
import TransactionDetailsSheet from "@components/TransactionDetailSheet";
import FloatingButtonScanner from "@components/ui/FloatingButtonScanner";
import { RootStateInterface } from "@services/store";

// Define the type untuk Stack Navigator yang berisi Home dan layar tambahan
export type HomeStackParamList = {
  HomeMain: undefined;
  WasteBag: undefined;
  FollowUp: undefined;
  WasteData: undefined;
  // Tambahkan screen lain yang terkait dengan Home di sini
};

// Define the type for the main tab parameter list
export type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
  Notifications: undefined;
  Settings: undefined;
  // Add other main app screens here
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator = () => {
  const uiVisibility = useSelector(
    (state: RootStateInterface) => state.uiVisibility
  );
  const navigationRoute = useNavigation();
  const dispatch = useDispatch();

  const closeBottomSheet = () => {
    dispatch(setIsBottomSheetVisible(false));
  };

  const closeTransactionSheet = () => {
    dispatch(setIsTransactionVisible(false));
  };

  return (
    <View className="flex-1 ">
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarButton: (props) => {
            const { children, onPress } = props;
            return (
              <TouchableOpacity
                className="flex-1 justify-center items-center"
                onPress={onPress}
              >
                {children}
              </TouchableOpacity>
            );
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "search" : "search-outline";
            } else if (route.name === "Notifications") {
              iconName = focused ? "notifications" : "notifications-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline";
            }

            // Return the Ionicon with custom styles
            return (
              <Ionicons
                name={iconName as any}
                size={size}
                color={focused ? "white" : "black"}
              />
            );
          },
          headerShown: false,
          tabBarShowLabel: false, // Menghilangkan text pada icon
          tabBarBackground: () => (
            <ImageBackground
              source={require("@assets/images/subtract.png")} // Sesuaikan path gambar Anda
              className="flex-1"
              resizeMode="cover"
            />
          ),
          tabBarStyle: {
            elevation: 0, // Hapus shadow di Android
            borderTopWidth: 0, // Hapus border di iOS
            position: "absolute",
            zIndex: uiVisibility.isTabBarVisible ? 1 : -1,
          },
          tabBarLabelStyle: {
            display: "none",
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Settings" component={ProfileScreen} />
        <Tab.Screen name="Notifications" component={ProfileScreen} />
        {/* Add other main app screens here */}
      </Tab.Navigator>

      {/* Bottom sheets dari HomeScreen bisa dipindah ke sini */}
      {!uiVisibility.isModalScannerVisible && (
        <CustomBottomSheet
          vision={uiVisibility.isBottomSheetVisible}
          onClose={closeBottomSheet}
        >
          <View className="mt-2 flex-1 mx-4">
            <Text className="text-lg font-semibold">Filter</Text>
            <FilterTransactionDetails />
          </View>
        </CustomBottomSheet>
      )}
      {!uiVisibility.isModalScannerVisible && (
        <CustomBottomSheet
          vision={uiVisibility.isTransactionVisible}
          onClose={closeTransactionSheet}
          initialSnapIndex={2}
        >
          <TransactionDetailsSheet />
        </CustomBottomSheet>
      )}

      <FloatingButtonScanner />
    </View>
  );
};

export default MainNavigator;
