import { View, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import TransactionsDetailsItem from "@components/TransactionsDetailsItem";
import { useDispatch } from "react-redux";
import { setIsBottomSheetVisible } from "@services/features/uiVisibilitySlice";
import {CustomText} from "@components/common";

export default function TransactionDetails() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const openBottomSheet = () => {
    dispatch(setIsBottomSheetVisible(true));
  };

  return (
    <View className="flex-1 mt-4 mb-14">
      <CustomText className="text-start" fontFamily="Poppins-SemiBold">
        {t("transactionDetailsTitle")}
      </CustomText>
      <View className="flex-row justify-between items-center mt-4">
        <View style={styles.searchContainer}>
          <MaterialIcons
            name="search"
            size={18}
            color="#333"
            className="mr-2"
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search transactions..."
            placeholderTextColor="#777"
          />
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={openBottomSheet}>
          <MaterialIcons name="filter-list-alt" size={20} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <TransactionsDetailsItem />
        <TransactionsDetailsItem />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
