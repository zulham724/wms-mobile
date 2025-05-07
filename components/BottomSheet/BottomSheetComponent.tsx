import React, { useRef, useState, useCallback, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const SimpleBottomSheet = ({
  vision,
  children,
  onClose,
}: {
  vision: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}) => {
  // ref untuk BottomSheet
  const bottomSheetRef = useRef<BottomSheet>(null);

  // State untuk kontrol tinggi BottomSheet
  const [snapIndex, setSnapIndex] = useState(-1); // 0, 1, 2 untuk snap points yang berbeda

  // snap points
  const snapPoints = ["25%", "50%", "100%"];

  console.log("vision", vision);

  // callback untuk menangani perubahan
  const handleSheetChanges = useCallback(
    (index: number) => {
      console.log("Sheet position changed to", index);
      // Jika index berubah ke -1 (tertutup), panggil onClose callback
      if (index === -1 && onClose) {
        onClose();
      }
    },
    [onClose]
  );

  // Fungsi untuk menutup bottom sheet
  const closeSheet = useCallback(() => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
      // Tambahkan delay sebelum mengubah state snapIndex
      setTimeout(() => {
        setSnapIndex(-1);
        if (onClose) onClose();
      }, 100);
    }
  }, [onClose]);

  // Memperluas atau mengubah posisi sheet berdasarkan snapIndex
  useEffect(() => {
    if (bottomSheetRef.current) {
      if (snapIndex >= 0) {
        bottomSheetRef.current.snapToIndex(snapIndex);
      } else {
        bottomSheetRef.current.close();
      }
    }
  }, [snapIndex]);

  useEffect(() => {
    if (vision) {
      setSnapIndex(0); // expand when vision is true
    } else {
      closeSheet(); // close sheet when vision is false
    }
  }, [vision, closeSheet]);

  return (
    <View
      style={styles.container}
      // className={`${vision ? "absolute visible top-0 left-0 right-0 bottom-0" : "relative hidden"}`}
    >
      <BottomSheet
        ref={bottomSheetRef}
        index={snapIndex}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        handleStyle={styles.handleStyle}
        containerStyle={styles.bottomSheetContainer}
        enablePanDownToClose={true}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View>{children}</View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    // borderTopStartRadius: 30,
  },
  bottomSheetContainer: {
    width: "100%",
    flex: 1,
  },
  handleStyle: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%", // Pastikan konten full width
    padding: 20,
  },
  closeButtonContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 10,
  },
});

export default SimpleBottomSheet;
