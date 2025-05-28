import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { CustomCard } from "@components/common";
import { Ionicons } from "@expo/vector-icons";

export default function WasteGroupTitle() {
  return (
    <CustomCard style={styles.cardContainer}>
      <View className="flex-row justify-between items-center bg-[#08ABDE] px-3 py-2 rounded-md w-full">
        <Text className="text-white  font-poppins-semibold">
          Waste Group Action
        </Text>
        <Ionicons name="chevron-forward" size={20} color="white" />
      </View>
    </CustomCard>
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
