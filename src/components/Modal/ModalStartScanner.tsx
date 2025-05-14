import { View, Text, StyleSheet, Modal } from "react-native";
import React, { useState } from "react";
import ModalComponent from "./ModalComponent";
import ButtonComponent from "@components/Button/ButtonComponent";
import { useDispatch } from "react-redux";
import { setVisionBar } from "@services/features/navigationSlice";

export default function ModalStartScanner({
  isModalVisible,
  setIsScannerVisible,
  setIsModalVisible,
}: Readonly<{
  isModalVisible: boolean;
  setIsScannerVisible: (visible: boolean) => void;
  setIsModalVisible: (visible: boolean) => void;
}>) {
  const dispatch = useDispatch();
  const handleOpenScanner = () => {
    setIsModalVisible(false);
    dispatch(setVisionBar({ hideBar: true }));
    setIsScannerVisible(true);
  };

  return (
    <Modal
      transparent={true}
      visible={isModalVisible}
      animationType="fade"
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ButtonComponent
            title="Scan QR Code"
            onPress={handleOpenScanner}
            backgroundColor="transparent"
            textStyle={styles.text}
            buttonStyle={{ borderWidth: 2, borderColor: "#A558E1", paddingHorizontal: 50 }}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
  text: {
    color: "#A558E1",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 14,
  },
});
