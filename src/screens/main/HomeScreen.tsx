import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Banner from "@components/screens/Home/Banner";
import WasteRecap from "@components/screens/Home/WasteRecap";
import FilterDate from "@components/screens/Home/FilterDate";
import LanguageDropdown from "../../components/ui/LanguageDropdown";
import TransactionDetails from "@components/screens/Home/TransactionDetails";
import WasteGroupTitle from "@components/screens/Home/WasteGroupTitle";
import { useSelector } from "react-redux";
import GlobalWrapper from "@components/ui/GlobalWrapper";

const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigationState = useSelector((state: any) => state.navigation);

  return (
    <GestureHandlerRootView className="flex-1">
      <GlobalWrapper showBackAction={false}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          className="mb-4"
        >
          <View style={styles.container}>
            <View style={styles.wrapContainer}>
              <Text style={styles.greeting}>{t("greeting")}, Andy</Text>
              <LanguageDropdown />
            </View>
            <Banner />
            <WasteGroupTitle />
            <FilterDate />
            <WasteRecap />
            <TransactionDetails />
          </View>
        </ScrollView>
      </GlobalWrapper>
      {!navigationState.isModalScannerVisible && (
        <>
          {/* BottomSheet untuk filter */}
          {/* <BottomSheetComponent
            vision={navigationState.isBottomSheetVisible}
            onClose={closeBottomSheet}
          >
            <Text style={styles.filterTransactionTitle}>Filter</Text>
            <FilterTransactionDetails />
          </BottomSheetComponent> */}

          {/* BottomSheet untuk detail transaksi */}
          {/* <BottomSheetComponent
            vision={navigationState.isTransactionVisible}
            onClose={closeTransactionSheet}
          >
            <TransactionDetailsSheet />
          </BottomSheetComponent> */}
        </>
      )}
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
    marginTop: 16,
    marginBottom: 4,
    width: "100%",
  },
  filterTransactionTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 20,
    width: "100%",
    textAlign: "center",
  },
});

export default HomeScreen;
