import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "@screens/main/HomeScreen";
import ProfileScreen from "@screens/main/ProfileScreen";
import { View, ImageBackground, StyleSheet, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import WasteBagLabelScreen from "@screens/main/WasteBagLabelScreen";
import FollowUpScreen from "@screens/main/FollowUpScreen";
import WasteDataScreen from "@screens/main/WasteDataScreen";
import { useSelector } from "react-redux";

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

const HomeStack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="WasteBag" component={WasteBagLabelScreen} />
      <HomeStack.Screen name="FollowUp" component={FollowUpScreen} />
      <HomeStack.Screen name="WasteData" component={WasteDataScreen} />
    </HomeStack.Navigator>
  );
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator = () => {
  const navigation = useSelector((state: any) => state.navigation);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
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
              style={styles.iconStyle} // Custom icon styling
            />
          );
        },
        tabBarActiveTintColor: "#1FA6DE",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarShowLabel: false, // Menghilangkan text pada icon
        // tabBarBackground: () => (
        //   <ImageBackground
        //     source={require("@assets/images/subtract.png")} // Sesuaikan path gambar Anda
        //     style={styles.tabBackground}
        //     resizeMode="cover"
        //   />
        // ),
        tabBarStyle: {
          backgroundColor: "#42A5DC",
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
          elevation: 0, // Hapus shadow di Android
          borderTopWidth: 0, // Hapus border di iOS
          display: navigation.hideBar ? "none" : "flex",
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={ProfileScreen} />
      <Tab.Screen name="Notifications" component={ProfileScreen} />
      {/* Add other main app screens here */}
    </Tab.Navigator>
  );
};

// Define the styles
const styles = StyleSheet.create({
  tabBackground: {
    flex: 1,
    width: "100%",
  },
  iconStyle: {
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
    flexDirection: "row",
    height: "100%",
    width: "100%",
    marginTop: 14,
  },
});

export default MainNavigator;
