import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

const HeaderComponent: React.FC = () => {
  return (
    <View className="w-full bg-white py-4 px-4">
      <View
        className="items-center justify-center py-4 "
        style={styles.headerContent}
      >
        <Text className="font-bold text-base color-[#2EA5CB]" style={styles.headerText}>RSUP Fatmawati</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContent: {
    backgroundColor: "#7DBAE740",
  },
  headerText: {
    // fontWeight: "bold",
    // color: "#2EA5CB",
    // fontSize: 16,
  },
});

export default HeaderComponent;
