import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import HeaderComponent from "@components/Header";
import FilterDate from "@components/screens/Home/FilterDate";
import CardComponent from "@components/Card/CardComponent";
import DatePicker from "@components/DatePicker/DatePickerComponent";
import DropDownPicker from "react-native-dropdown-picker";
import ButtonComponent from "@components/Button/ButtonComponent";
import { useNavigation } from "@react-navigation/native";

export default function FollowUpScreen() {
  const [classificationOpen, setClassificationOpen] = useState(false);
  const [selectedClassification, setSelectedClassification] = useState(null);

  const [actionOpen, setActionOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

  const navigation = useNavigation();

  // Mengatasi masalah z-index untuk dropdown yang bertumpuk
  const onClassificationOpen = () => {
    setActionOpen(false);
  };

  const onActionOpen = () => {
    setClassificationOpen(false);
  };

  const goToWasteDataScreen = () => {
    navigation.navigate("WasteData" as never);
  };

  const [classificationItems, setClassificationItems] = useState([
    { label: "Plastic", value: "plastic" },
    { label: "Paper", value: "paper" },
    { label: "Metal", value: "metal" },
  ]);

  const [actionItems, setActionItems] = useState([
    { label: "Recycle", value: "recycle" },
    { label: "Dispose", value: "dispose" },
    { label: "Reuse", value: "reuse" },
  ]);
  return (
    <View className="flex-1 bg-[#EFF1F4]">
      <HeaderComponent />
      <View className="pt-4 pb-4 px-4 flex-row items-center relative">
        <TouchableOpacity
          className="absolute left-4 top-4 z-10"
          onPress={() => console.log("Go back")}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View className="flex-1 items-center">
          <Text className="text-xl font-bold text-black">
            Follow Up Transaction
          </Text>
        </View>
      </View>
      <View className="px-4">
        <CardComponent style={styles.cardContainer}>
          {/* Start Date */}
          <View className="flex-row justify-between">
            <View className="flex-col w-[49%]">
              <View className="flex-row items-center gap-1">
                <Text className="text-sm text-black">Start Date</Text>
                <Text className="text-sm text-red-500">*</Text>
              </View>
              <DatePicker onDateSelected={() => {}} style={styles.datePicker} />
            </View>

            {/* End Date */}
            <View className="flex-col w-[49%]">
              <View className="flex-row items-center gap-1">
                <Text className="text-sm text-black">End Date</Text>
                <Text className="text-sm text-red-500">*</Text>
              </View>
              <DatePicker onDateSelected={() => {}} style={styles.datePicker} />
            </View>
          </View>

          <View className="mt-4">
            <View style={styles.dropdownContainer}>
              <Text style={styles.text}>Waste Classification</Text>
              <DropDownPicker
                open={classificationOpen}
                value={selectedClassification}
                items={classificationItems}
                setOpen={setClassificationOpen}
                setValue={setSelectedClassification}
                setItems={setClassificationItems}
                placeholder="Select Classification"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownList}
                textStyle={styles.dropdownText}
                listItemLabelStyle={styles.listItemLabel}
                // arrowColor="#fff"
                onOpen={onClassificationOpen}
                maxHeight={150}
                // dropdownPosition="top"
                zIndex={3000}
                zIndexInverse={1000}
              />
            </View>

            <View style={styles.dropdownContainer}>
              <Text style={styles.text}>Waste Action Status</Text>
              <DropDownPicker
                open={actionOpen}
                value={selectedAction}
                items={actionItems}
                setOpen={setActionOpen}
                setValue={setSelectedAction}
                setItems={setActionItems}
                placeholder="Select Action"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownList}
                textStyle={styles.dropdownText}
                listItemLabelStyle={styles.listItemLabel}
                // arrowColor="#fff"
                onOpen={onActionOpen}
                maxHeight={150}
                // dropdownPosition="top"
                zIndex={2000}
                zIndexInverse={2000}
              />
            </View>
          </View>
          <View className="flex-row justify-end w-full">
            <ButtonComponent
              title="Apply"
              backgroundColor="#08ABDE"
              size="medium"
              variant="outline"
              onPress={() => goToWasteDataScreen()}
            />
          </View>
        </CardComponent>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    padding: 16,
    marginTop: 8,
    gap: 8,
    justifyContent: "space-between",
  },
  datePicker: {},
  dropdownContainer: {
    marginBottom: 15,
    zIndex: 10, // Important for overlapping dropdowns
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    zIndex: -1,
  },
  dropdown: {
    borderColor: "#ccc",
    backgroundColor: "#08ABDE",
  },
  dropdownList: {
    borderColor: "#ccc",
    backgroundColor: "#fff",
    elevation: 5, // Add shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  dropdownText: {
    color: "#fff", // Keep white for closed dropdown text
  },
  listItemLabel: {
    color: "#000", // Black text for dropdown list items
  },
});
