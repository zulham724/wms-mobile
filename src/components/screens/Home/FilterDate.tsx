import React from "react";
import { View, StyleSheet } from "react-native";
import { CustomText, CustomCard, CustomDatePicker } from "@components/common";

const FilterDate = () => {
  return (
    <CustomCard style={styles.container}>
      <View className="w-[49%]">
        <View className="flex-row items-center gap-1">
          <CustomText className="text-sm">Start Date</CustomText>
          <CustomText className="text-red-500">*</CustomText>
        </View>
        <CustomDatePicker onDateSelected={() => {}} style={styles.dateItem} />
      </View>

      <View className="w-[49%]">
        <View className="flex-row items-center gap-1">
          <CustomText className="text-sm">End Date</CustomText>
          <CustomText className="text-red-500">*</CustomText>
        </View>
        <CustomDatePicker onDateSelected={() => {}} style={styles.dateItem} />
      </View>
    </CustomCard>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  dateItem: {
    marginTop: 4,
    width: "100%",
  },
});

export default FilterDate;
