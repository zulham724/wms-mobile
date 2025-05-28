import { View, StyleSheet, Modal } from "react-native";
import React from "react";
import { CustomButton } from "@components/common";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsModalScannerVisible,
  setIsTabBarVisible,
  setIsScannerVisible,
  NavigationStateInterface,
} from "@services/features/navigationSlice";

export default function ModalStartScanner() {
  const dispatch = useDispatch();
  const navigationState: NavigationStateInterface = useSelector(
    (state: any) => state.navigation
  );
  const { isModalScannerVisible } = navigationState;

  const handleOpenScanner = () => {
    dispatch(setIsModalScannerVisible(false));
    dispatch(setIsTabBarVisible(false));
    dispatch(setIsScannerVisible(true));
  };

  return (
    <Modal
      transparent={true}
      visible={isModalScannerVisible}
      animationType="fade"
      onRequestClose={() => dispatch(setIsModalScannerVisible(false))}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <CustomButton
            title="Scan QR Code"
            onPress={handleOpenScanner}
            backgroundColor="transparent"
            textStyle={styles.text}
            buttonStyle={{
              borderWidth: 2,
              borderColor: "#A558E1",
              paddingHorizontal: 50,
            }}
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
