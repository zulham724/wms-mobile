import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CardComponent from "@components/common/Card/CardComponent";
import { Ionicons } from "@expo/vector-icons";

export default function WasteGroupTitle() {
  return (
    <CardComponent style={styles.cardContainer}>
      <View className="flex-row justify-between items-center bg-[#08ABDE] px-3 py-2 rounded-md w-full">
        <Text className="text-white text-lg font-semibold">Waste Group Action</Text>
        <Ionicons name="chevron-forward" size={20} color="white" />
      </View>
    </CardComponent>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // Spread the cards nicely
    width: "100%",
    marginTop: 15,
  },
});
