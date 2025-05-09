import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CardComponent from "@components/Card/CardComponent";
import DatePicker from "@components/DatePicker/DatePickerComponent";

const FilterDate = () => {
  return (
    <CardComponent style={styles.container}>
      <View style={styles.dateWrap}>
        <View style={styles.labelWrap}>
          <Text style={styles.labelText}>Start Date</Text>
          <Text style={styles.required}>*</Text>
        </View>
        <DatePicker onDateSelected={() => {}} style={styles.dateItem} />
      </View>

      <View style={styles.dateWrap}>
        <View style={styles.labelWrap}>
          <Text style={styles.labelText}>End Date</Text>
          <Text style={styles.required}>*</Text>
        </View>
        <DatePicker onDateSelected={() => {}} style={styles.dateItem} />
      </View>
    </CardComponent>
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
  dateWrap: {
    flexDirection: "column",
    width: "49%",
  },
  labelWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2, // small gap between label and star
  },
  labelText: {
    fontSize: 12,
    color: "#000",
  },
  required: {
    fontSize: 14,
    color: "red",
  },
  dateItem: {
    marginTop: 4,
    width: "100%",
  },
});

export default FilterDate;
