import {
  CameraView,
  CameraType,
  useCameraPermissions,
  FlashMode,
} from "expo-camera";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Platform,
  Button,
  Alert,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  setIsScannerVisible,
  setIsTabBarVisible,
  setIsModalScannerVisible,
} from "@services/features/uiVisibilitySlice";

// Get the device dimensions - menggunakan Dimensions.get("screen") untuk ukuran layar sebenarnya
const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

export default function ScannerBarcode() {
  const [flashMode, setFlashMode] = useState<FlashMode>("off");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onClose = () => {
    console.log("onClose");
    dispatch(setIsTabBarVisible(true));
    dispatch(setIsModalScannerVisible(false));
    dispatch(setIsScannerVisible(false));
  };

  const showAlert = () => {
    Alert.alert(
      "Title", // Judul alert
      "Bar code has been scanned!", // Pesan alert
      [
        {
          text: "OK", // Tombol OK
          onPress: () => {
            dispatch(setIsTabBarVisible(true));
            dispatch(setIsScannerVisible(false));
            navigation.navigate("WasteBag" as never); 
          },
        },
      ]
    );
  };
  // Function to handle barcode scanning
  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    showAlert();
    // You can navigate or handle the scanned data as needed
  };

  // Toggle flash mode
  const toggleFlash = () => {
    setFlashMode((current: FlashMode) => {
      console.log(current, "current");
      switch (current) {
        case "off":
          return "on";
        case "on":
          return "auto";
        case "auto":
          return "torch";
        default:
          return "off";
      }
    });
  };

  // Get the flash icon based on current mode
  const getFlashIcon = () => {
    switch (flashMode) {
      case "on":
        return "flash-on";
      case "off":
        return "flash-off";
      case "auto":
        return "flash-auto";
      default:
        return "flash-off";
    }
  };

  // Close camera and go back
  const handleClose = () => {
    onClose();
  };

  // Show permission screen if not granted
  if (!permission) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>
            We need your permission to use the camera
          </Text>
          <Button title="Grant Permission" onPress={requestPermission} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.absoluteContainer}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000000"
        translucent
      />

      <CameraView
        style={styles.camera}
        flash={flashMode}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "code128", "code39", "ean13", "ean8", "upc_e"],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        {/* Scan Frame Overlay */}
        <View style={styles.scanOverlay}>
          <View style={styles.scanFrame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
        </View>

        {/* Bottom Controls */}
        <SafeAreaView style={styles.bottomControls}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Scan A Waste QR Code</Text>
          </View>

          <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
            <MaterialIcons name={getFlashIcon()} size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>
        </SafeAreaView>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  absoluteContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999, // Memastikan scanner tampil di atas komponen lain
    backgroundColor: "#000",
    width: screenWidth,
    height: screenHeight,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  permissionText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  camera: {
    flex: 1,
    height: screenHeight,
    width: screenWidth,
  },
  closeButton: {
    padding: 8,
    paddingTop: 80,
  },
  title: {
    alignItems: "center",
  },
  titleText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  flashButton: {
    paddingTop: 16,
  },
  scanOverlay: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 120,
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 0,
    borderRadius: 12,
    position: "relative",
  },
  corner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: "#fff",
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 12,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 12,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 12,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 12,
  },
  bottomControls: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    width: "100%",
    paddingBottom: Platform.OS === "ios" ? 30 : 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    height: 300,
    paddingVertical: 24,
  },
});
