import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import ModalComponent from "./ModalComponent";
import ButtonComponent from "@components/Button/ButtonComponent";

export default function ModalStartScanner({
  isModalVisible,
  setIsScannerVisible,
  setIsModalVisible,
}: Readonly<{
  isModalVisible: boolean;
  setIsScannerVisible: (visible: boolean) => void;
  setIsModalVisible: (visible: boolean) => void;
}>) {
  console.log(isModalVisible, "isModalVisible");
  //   const [isScannerVisible, setIsScannerVisible] = useState(false);

  const handleOpenScanner = () => {
    setIsModalVisible(false);
    setIsScannerVisible(true);
  };

  return (
    <View
    >
      <ButtonComponent
        title="Scan QR Code"
        onPress={handleOpenScanner}
        backgroundColor="transparent"
        textStyle={styles.text}
        buttonStyle={{ borderWidth: 2, borderColor: "#A558E1" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#A558E1",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 14,
  },
});
