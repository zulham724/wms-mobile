import { Tabs } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Using Ionicons directly
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Scannerbarcode from "@/components/ScannerBarcode"; // Import ScannerBarcode component
import ModalComponent from "@/components/Modal/ModalComponent";
import ButtonComponent from "@/components/Button/ButtonComponent";

const { width } = Dimensions.get("window");

const CenteredIcon = ({ children }: { children: React.ReactNode }) => (
  <View
    style={{
      alignItems: "center",
      justifyContent: "center",
      height: 60,
      flex: 1,
      paddingBottom: 0,
    }}
  >
    {children}
  </View>
);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isScannerVisible, setIsScannerVisible] = useState(false); // State to toggle the scanner visibility

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenScanner = () => {
    setIsScannerVisible(true); // Show the scanner when the button is pressed
    setIsModalVisible(false);
  };

  const handleCloseScanner = () => {
    setIsScannerVisible(false); // Close the scanner
  };

  return (
    <>
      {!isScannerVisible && (
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            tabBarShowLabel: false,
            headerShown: false,
            tabBarItemStyle: {
              height: 60,
              paddingTop: 0,
              paddingBottom: 0,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              // display: 'none'
            },
            tabBarStyle: Platform.select({
              ios: {
                // position: "absolute",
                // backgroundColor: "transparent", // Tab bar color for iOS
                borderTopWidth: 0, // Remove border on top
                height: 60, // Adjust the height of the tab bar
                flexDirection: "row",
                justifyContent: "space-around", // Spread out the icons evenly
                alignItems: "center", // Center items vertically
                paddingBottom: 0,
              },
              default: {
                // backgroundColor: "transparent", // Tab bar color for Android
                borderTopWidth: 0, // Remove border on top
                height: 60, // Adjust the height of the tab bar
                flexDirection: "row",
                justifyContent: "space-around", // Spread out the icons evenly
                alignItems: "center", // Center items vertically
                paddingBottom: 0,
              },
            }),
            tabBarBackground: () => (
              <View style={{ flex: 1, overflow: "hidden" }}>
                <ImageBackground
                  source={require("../../assets/images/subtract.jpg")}
                  style={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                  }}
                  resizeMode="stretch"
                />
                <View
                  style={{
                    position: "absolute",
                    width: 70, // Sesuaikan dengan lebar area tengah
                    height: "100%",
                    backgroundColor: "transparent",
                    alignSelf: "center",
                    top: 0,
                  }}
                />
              </View>
            ),
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ focused }) => (
                <CenteredIcon>
                  <Icon
                    name={focused ? "home" : "home-outline"}
                    size={28}
                    color={focused ? "white" : "black"}
                  />
                </CenteredIcon>
              ),
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              title: "Explore",
              tabBarIcon: ({ focused }) => (
                <CenteredIcon>
                  <Icon
                    name={focused ? "search" : "search-outline"}
                    size={28}
                    color={focused ? "white" : "black"}
                  />
                </CenteredIcon>
              ),
            }}
          />
          <Tabs.Screen
            name="notifications"
            options={{
              title: "Notifications",
              tabBarIcon: ({ focused }) => (
                <CenteredIcon>
                  <Icon
                    name={focused ? "notifications" : "notifications-outline"}
                    size={28}
                    color={focused ? "white" : "black"}
                  />
                </CenteredIcon>
              ),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: "Settings",
              tabBarIcon: ({ focused }) => (
                <CenteredIcon>
                  <Icon
                    name={focused ? "settings" : "settings-outline"}
                    size={28}
                    color={focused ? "white" : "black"}
                  />
                </CenteredIcon>
              ),
            }}
          />
        </Tabs>
      )}

      {/* Floating Plus Button */}
      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)} // Open Scanner on button click
          style={styles.floatingButton}
        >
          <Icon name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <ModalComponent
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      >
        <ButtonComponent
          title="Scan QR Code"
          onPress={handleOpenScanner}
          backgroundColor="transparent"
          textStyle={styles.text}
          buttonStyle={{ borderWidth: 2, borderColor: "#A558E1" }}
        />
      </ModalComponent>

      {/* Render Scanner Barcode component when button is pressed */}
      {isScannerVisible && <Scannerbarcode onClose={handleCloseScanner} />}
    </>
  );
}

const styles = StyleSheet.create({
  centeredIcon: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: "100%",
    paddingBottom: 0,
  },
  floatingButtonContainer: {
    position: "absolute",
    left: width / 2 - 30,
    bottom: 45, // Adjust this as needed
    zIndex: 1,
    display: "none"
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  text: {
    color: "#A558E1",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 14,
  },
});
