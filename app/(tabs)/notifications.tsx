import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import LoginScreen from "@/components/ui/LoginScreen";
// import {RootStackParamList} from '../types/navigation';

// type NotificationsScreenProps = NativeStackScreenProps<
//   RootStackParamList,
//   'Notifications'
// >;

const NotificationsScreen: React.FC = () => {
  return <LoginScreen />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default NotificationsScreen;
