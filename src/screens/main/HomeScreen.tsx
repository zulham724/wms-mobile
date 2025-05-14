// src/screens/HomeScreen.tsx
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HeaderComponent from "@components/Header";
import Banner from "@components/screens/Home/Banner";
import WasteRecap from "@components/screens/Home/WasteRecap";
import FilterDate from "@components/screens/Home/FilterDate";
import LanguageDropdown from "../../components/ui/LanguageDropdown";
import SimpleBottomSheet from "@components/BottomSheet/BottomSheetComponent";
import FilterTransactionDetails from "../../components/FilterTransactionDetails";
import TransactionDetailsSheet from "@components/TransactionDetailSheet";
import TransactionDetails from "@components/screens/Home/TransactionDetails";
import FloatingButtonScanner from "@components/Button/FloatingButtonScanner";
import ModalStartScanner from "@components/Modal/ModalStartScanner";
import ScannerBarcode from "@components/ScannerBarcode";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const [isBottomSheetVisible, setBottomSheetVisible] = React.useState(false);
  const [isTransactionVisible, setIsTransactionVisible] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isScannerVisible, setIsScannerVisible] = React.useState(false);

  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  // Fungsi untuk menangani klik tombol scanner
  const handleScannerButtonClick = () => {
    // Pastikan semua bottomsheet tertutup
    setBottomSheetVisible(false);
    setIsTransactionVisible(false);

    setIsModalVisible(true);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <HeaderComponent />
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            style={{ flex: 1 }}
          >
            <View style={styles.container}>
              <View style={styles.wrapContainer}>
                <Text style={styles.greeting}>{t("greeting")}, Andy</Text>
                <LanguageDropdown />
              </View>
              <Banner />
              <FilterDate />
              <WasteRecap />
              <TransactionDetails
                setIsBottomSheetVisible={setBottomSheetVisible}
                setIsTransactionVisible={setIsTransactionVisible}
              />
            </View>
          </ScrollView>
        </View>

        {!isModalVisible && (
          <>
            {/* BottomSheet untuk filter */}
            <SimpleBottomSheet
              vision={isBottomSheetVisible}
              onClose={closeBottomSheet}
            >
              <Text style={styles.filterTransactionTitle}>Filter</Text>
              <FilterTransactionDetails />
            </SimpleBottomSheet>

            {/* BottomSheet untuk detail transaksi */}
            <SimpleBottomSheet
              vision={isTransactionVisible}
              onClose={() => setIsTransactionVisible(false)}
            >
              <TransactionDetailsSheet />
            </SimpleBottomSheet>
          </>
        )}

        {/* Modal untuk scanner */}
        <ModalStartScanner
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          setIsScannerVisible={setIsScannerVisible}
        />

        {/* Floating button untuk scanner */}
        <FloatingButtonScanner setIsModalVisible={handleScannerButtonClick} />

        {/* Scanner overlay */}
        {isScannerVisible && (
          <View style={styles.scannerOverlay}>
            <ScannerBarcode onClose={() => setIsScannerVisible(false)} />
          </View>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EFF1F4",
    padding: 15,
    width: "100%",
  },
  greeting: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Poppins-Regular",
  },
  wrapContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
  },
  filterTransactionTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 20,
    width: "100%",
    textAlign: "center",
  },
  scannerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2000,
    backgroundColor: "#FFF",
  },
});

export default HomeScreen;
