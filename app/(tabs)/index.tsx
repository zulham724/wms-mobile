// src/screens/HomeScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import ButtonComponent from "../../components/Button/ButtonComponent";
import { useTranslation } from "react-i18next";
import WasteRecap from "../../components/WasteRecap";
import TransactionsDetails from "../../components/TransactionsDetails";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import LanguageDropdown from "../../components/LanguageDropdown";
import FilterDate from "../../components/FilterDate";
import BottomSheetComponent from "../../components/BottomSheet/BottomSheetComponent";
import FilterTransactionDetails from "../../components/FilterTransactionDetails";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Link } from "expo-router";
import HeaderComponent from "@/components/Header";
import "../../global.css";
import TransactionDetailsSheet from "@/components/TransactionDetailSheet";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const { t } = useTranslation();
  const [isBottomSheetVisible, setBottomSheetVisible] = React.useState(false);
  const [isTransactionVisible, setIsTransactionVisible] = React.useState(false);

  const openBottomSheet = () => {
    setBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          style={{ flex: 1 }}
        >
          <HeaderComponent />
          <View style={styles.container}>
            <View style={styles.wrapContainer}>
              <Text style={styles.greeting}>{t("greeting")}, Andy</Text>
              <LanguageDropdown />
            </View>
            <View style={styles.banner}>
              <ImageBackground
                source={require("../../assets/images/vector-banner.png")} // Adjust the path accordingly
                style={styles.bannerImage}
                resizeMode="cover"
              />
              <Text style={styles.bannerText}>{t("bannerMessage")}</Text>
              <View style={styles.bannerAction}>
                <ButtonComponent
                  title={t("btnStartScalling")}
                  onPress={() => {}}
                  backgroundColor="#08ABDE"
                  borderRadius={5}
                  size="small"
                />
                <ButtonComponent
                  title={t("btnFollowUp")}
                  onPress={() => {}}
                  backgroundColor="#08ABDE"
                  borderRadius={5}
                  size="small"
                />
              </View>
            </View>
            <Link href="/detailWasteLabel">detail waste</Link>
            <Link href="/login">Login</Link>
            <FilterDate />
            <WasteRecap />
            <Text style={styles.transactionsDetailsTitle}>
              {t("transactionDetailsTitle")}
            </Text>
            <View style={styles.searchFilterContainer}>
              <View style={styles.searchContainer}>
                <MaterialIcons
                  name="search"
                  size={18}
                  color="#333"
                  style={styles.searchIcon}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search transactions..."
                  placeholderTextColor="#777"
                />
              </View>
              <TouchableOpacity
                style={styles.filterButton}
                onPress={openBottomSheet}
              >
                <MaterialIcons name="filter-list-alt" size={20} color="#333" />
              </TouchableOpacity>
              {/* <FilterIconTransaction /> */}
            </View>
            <View style={{ flex: 1 }}>
              <TransactionsDetails
                onOpenTransaction={() => {
                  console.log("open transaction");
                  setIsTransactionVisible(true)
                }}
              />
              <TransactionsDetails
                onOpenTransaction={() => setIsTransactionVisible(true)}
              />
            </View>
          </View>
        </ScrollView>
        {/* ✨ BottomSheet usage */}
      </View>
      <BottomSheetComponent
        vision={isBottomSheetVisible}
        onClose={closeBottomSheet}
      >
        <Text style={styles.filterTransactionTitle}>Filter</Text>
        <FilterTransactionDetails />
      </BottomSheetComponent>

      <BottomSheetComponent
        vision={isTransactionVisible}
        onClose={() => setIsTransactionVisible(false)}
      >
        <TransactionDetailsSheet />
      </BottomSheetComponent>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    // flex: 1,
    flexGrow: 1, // Allows the content to grow but also scroll
  },
  container: {
    // flex: 1, // Removed to avoid scroll issues
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EFF1F4",
    padding: 15,
    width: "100%",
  },
  greeting: {
    fontSize: 16,
    fontWeight: 700,
    fontFamily: "Poppins-Regular",
  },

  text: {
    fontSize: 20,
    fontWeight: "bold",
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

  banner: {
    padding: 20,
    backgroundColor: "#08ABDE",
    borderRadius: 12,
    width: "100%",
    marginTop: 15,
    height: 150,
    // Remove color here, it doesn't work on View
  },

  bannerText: {
    color: "#FFFFFF", // Apply color to Text component
    fontWeight: 700,
    fontSize: 16,
    width: "65%",
    fontFamily: "Poppins-Regular",
  },
  bannerAction: {
    display: "flex",
    marginTop: 40,
    flexDirection: "row",
    gap: 8,
    justifyContent: "flex-end",

    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: 150,
    // height: 200, // Adjust the height as per your requirement
    borderRadius: 12,
    position: "absolute", // Ensure it's positioned properly
    bottom: 0,
    // left: 0,
    right: 0,
    // zIndex: -1,
  },
  transactionsDetailsTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 20,
    textAlign: "left",
    width: "100%",
  },
  searchFilterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 10,
    flex: 1,
    marginRight: 10,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    padding: 0,
    fontSize: 12,
    color: "#000",
  },
  filterButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    padding: 10,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
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
