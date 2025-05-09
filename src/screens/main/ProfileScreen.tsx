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
        <View style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>John Doe</Text>
              <Text style={styles.email}>john.doe@example.com</Text>
              <Text style={styles.role}>Warehouse Manager</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {profileOptions.map((option, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <Ionicons name={option.icon} size={22} color="#1FA6DE" />
                <Text style={styles.menuItemText}>{option.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
          <Ionicons name="log-out-outline" size={22} color="#EF4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>

        {/* Tombol untuk membuka GlobalModal dengan posisi berbeda */}
        <View style={styles.modalButtons}>
          <TouchableOpacity
            // style={styles.modalButton}
            onPress={() => openGlobalModal("center")}
          >
            <Text>Buka Modal Tengah</Text>
          </TouchableOpacity>

          <TouchableOpacity
            // style={styles.modalButton}
            onPress={() => openGlobalModal("bottom")}
          >
            <Text>Buka Modal Bawah</Text>
          </TouchableOpacity>

          <TouchableOpacity
            // style={styles.modalButton}
            onPress={() => openGlobalModal("top")}
          >
            <Text>Buka Modal Atas</Text>
          </TouchableOpacity>
        </View>
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
  profileHeader: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#1FA6DE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 2,
  },
  email: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 2,
  },
  role: {
    fontSize: 14,
    color: "#1FA6DE",
    fontWeight: "500",
  },
  menuContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 16,
    color: "#1F2937",
    marginLeft: 12,
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
  versionContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  versionText: {
    fontSize: 14,
    color: "#9CA3AF",
  },
});

export default ProfileScreen;
