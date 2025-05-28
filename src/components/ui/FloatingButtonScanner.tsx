import { View, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { setIsModalScannerVisible } from "@services/features/navigationSlice";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
export default function FloatingButtonScanner() {
  const dispatch = useDispatch();
  const navigationState = useSelector((state: any) => state.navigation);

  console.log({ navigationState });

  return (
    <View
      style={styles.floatingButtonContainer}
      className={`${navigationState.isScannerVisible ? "-z-10" : "z-10"}`}
    >
      <TouchableOpacity
        onPress={() => dispatch(setIsModalScannerVisible(true))} // Open Scanner on button click
        style={styles.floatingButton}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingButtonContainer: {
    position: "absolute",
    left: width / 2 - 30,
    bottom: 32, // Adjust this as needed
    // zIndex: 1,
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});
