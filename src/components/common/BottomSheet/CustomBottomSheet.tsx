import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

type BottomSheetProps = {
  vision: boolean;
  children: React.ReactNode;
  onClose?: () => void;
  initialSnapIndex?: number;
};

const CustomBottomSheet: React.FC<BottomSheetProps> = ({
  vision,
  children,
  onClose,
  initialSnapIndex = 0,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [snapIndex, setSnapIndex] = useState<number>(-1);

  // Get safe area insets
  const insets = useSafeAreaInsets();

  // Get screen dimensions
  const { height: screenHeight } = Dimensions.get("window");

  // Calculate available height (excluding status bar and safe areas)
  const availableHeight = useMemo(() => {
    const statusBarHeight =
      Platform.OS === "android" ? StatusBar.currentHeight || 0 : insets.top;
    const totalSafeArea = statusBarHeight + insets.bottom;
    const usableHeight = screenHeight - totalSafeArea;

    return {
      small: Math.round(usableHeight * 0.5), // 50% dari tinggi yang tersedia
      medium: Math.round(usableHeight * 0.7), // 70% dari tinggi yang tersedia
      large: usableHeight, // 100% tinggi yang tersedia
    };
  }, [screenHeight, insets]);

  // Dynamic snap points berdasarkan tinggi yang tersedia
  const snapPoints = useMemo(
    () => [
      availableHeight.small,
      availableHeight.medium,
      availableHeight.large,
    ],
    [availableHeight]
  );

  const handleSheetChanges = useCallback(
    (index: number) => {
      console.log("Sheet position changed to", index);
      if (index === -1 && onClose) {
        onClose();
      }
    },
    [onClose]
  );

  const closeSheet = useCallback(() => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
      setTimeout(() => {
        setSnapIndex(-1);
        if (onClose) onClose();
      }, 100);
    }
  }, [onClose]);

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
      setSnapIndex(initialSnapIndex);
    } else {
      closeSheet();
    }
  }, [vision, initialSnapIndex, closeSheet]);

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={snapIndex}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        handleStyle={styles.handleStyle}
        containerStyle={[
          styles.bottomSheetContainer,
          {
            // Tambahkan margin top untuk menghindari status bar
            marginTop:
              Platform.OS === "android"
                ? StatusBar.currentHeight || 0
                : insets.top,
          },
        ]}
        enablePanDownToClose={true}
        // Tambahkan props untuk mengontrol area maksimal
        maxDynamicContentSize={availableHeight.large}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.content}>{children}</View>
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
  },
  bottomSheetContainer: {
    width: "100%",
    flex: 1,
    zIndex: 100,
  },
  handleStyle: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  contentContainer: {
    flex: 1,
    width: "100%",
  },
  content: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
});

export default CustomBottomSheet;
