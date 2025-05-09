import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");
export default function FloatingButtonScanner({
  setIsModalVisible,
}: {
  setIsModalVisible: (visible: boolean) => void;
}) {
  // const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.floatingButtonContainer}>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)} // Open Scanner on button click
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
    bottom: 5, // Adjust this as needed
    zIndex: 10,
    // display: "none"
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
});
