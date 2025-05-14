import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import GlobalModal from "@components/Modal/ModalComponent"; // Import GlobalModal

const ProfileScreen = () => {
  const { signOut } = useAuth();

  // State untuk Global Modal
  const [globalModalVisible, setGlobalModalVisible] = React.useState(false);
  const [modalPosition, setModalPosition] = React.useState<
    "center" | "bottom" | "top"
  >("center");

  const profileOptions = [
    { title: "Account Settings", icon: "settings-outline" },
    { title: "Notifications", icon: "notifications-outline" },
    { title: "Help Center", icon: "help-circle-outline" },
    { title: "About App", icon: "information-circle-outline" },
  ];

  // Fungsi untuk membuka modal dengan posisi tertentu
  const openGlobalModal = (position: "center" | "bottom" | "top") => {
    setModalPosition(position);
    setGlobalModalVisible(true);
  };

  // Fungsi untuk memulai scanner dari modal
  const startScanner = () => {
    setGlobalModalVisible(false);
    // setIsScannerVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
          <Ionicons name="log-out-outline" size={22} color="#EF4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      {/* GlobalModal Component */}
      <GlobalModal
        visible={globalModalVisible}
        onClose={() => setGlobalModalVisible(false)}
        position={modalPosition}
        closeOnOverlayPress={true}
        animationDuration={300}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Global Modal</Text>
          <Text style={styles.modalDescription}>
            Ini adalah contoh penggunaan GlobalModal yang dapat menerima
            children. Modal ini dapat digunakan di mana saja dalam aplikasi.
          </Text>

          {modalPosition === "center" && (
            <TouchableOpacity
              style={[styles.modalActionButton, styles.scanButton]}
              onPress={startScanner}
            >
              <Text style={styles.buttonText}>Mulai Scanner</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.modalActionButton, styles.closeButton]}
            onPress={() => setGlobalModalVisible(false)}
          >
            <Text style={styles.buttonText}>Tutup</Text>
          </TouchableOpacity>
        </View>
      </GlobalModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    color: "#EF4444",
    marginLeft: 12,
    fontWeight: "500",
  },
});

export default ProfileScreen;
