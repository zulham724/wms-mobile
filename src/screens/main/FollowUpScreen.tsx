import { View, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import GlobalWrapper from "@components/ui/GlobalWrapper";
import {
  CustomText,
  CustomButton,
  CustomCard,
  CustomDatePicker,
} from "@components/common";

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

  const handleGoBack = () => {
    navigation.goBack();
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
    <GlobalWrapper title="Follow Up Transaction" showBackAction={true}>
      <CustomCard style={styles.cardContainer}>
        {/* Start Date */}
        <View className="flex-row justify-between">
          <View className="flex-col w-[49%]">
            <View className="flex-row items-center gap-1">
              <CustomText className="text-sm text-black">Start Date</CustomText>
              <CustomText className="text-sm text-red-500">*</CustomText>
            </View>
            <CustomDatePicker
              onDateSelected={() => {}}
              style={styles.datePicker}
            />
          </View>

          {/* End Date */}
          <View className="flex-col w-[49%]">
            <View className="flex-row items-center gap-1">
              <CustomText className="text-sm text-black">End Date</CustomText>
              <CustomText className="text-sm text-red-500">*</CustomText>
            </View>
            <CustomDatePicker
              onDateSelected={() => {}}
              style={styles.datePicker}
            />
          </View>
        </View>

        <View className="mt-4">
          <View
            style={[
              styles.dropdownContainer,
              { zIndex: 3000 }, // Memberikan z-index lebih tinggi untuk dropdown pertama
            ]}
          >
            <CustomText className="text-sm" fontFamily="Poppins-SemiBold">
              Waste Classification
            </CustomText>
            <DropDownPicker
              open={classificationOpen}
              value={selectedClassification}
              items={classificationItems}
              setOpen={setClassificationOpen}
              setValue={setSelectedClassification}
              setItems={setClassificationItems}
              placeholder="Select Classification"
              style={styles.dropdown}
              dropDownContainerStyle={[
                styles.dropdownList,
                { zIndex: 3000 }, // Memastikan list dropdown memiliki z-index tinggi
              ]}
              textStyle={styles.dropdownText}
              listItemLabelStyle={styles.listItemLabel}
              onOpen={onClassificationOpen}
              maxHeight={150}
              ArrowUpIconComponent={({ style }) => (
                <Ionicons name="chevron-up" size={20} color="white" />
              )}
              ArrowDownIconComponent={({ style }) => (
                <Ionicons name="chevron-down" size={20} color="white" />
              )}
            />
          </View>

          <View
            style={[
              styles.dropdownContainer,
              { zIndex: 2000 }, // Z-index lebih rendah untuk dropdown kedua
            ]}
          >
            <CustomText className="text-sm" fontFamily="Poppins-SemiBold">
              Waste Action Status
            </CustomText>
            <DropDownPicker
              open={actionOpen}
              value={selectedAction}
              items={actionItems}
              setOpen={setActionOpen}
              setValue={setSelectedAction}
              setItems={setActionItems}
              placeholder="Select Action"
              style={styles.dropdown}
              dropDownContainerStyle={[
                styles.dropdownList,
                { zIndex: 2000 }, // Z-index untuk list dropdown kedua
              ]}
              textStyle={styles.dropdownText}
              listItemLabelStyle={styles.listItemLabel}
              onOpen={onActionOpen}
              maxHeight={150}
              ArrowUpIconComponent={({ style }) => (
                <Ionicons name="chevron-up" size={20} color="white" />
              )}
              ArrowDownIconComponent={({ style }) => (
                <Ionicons name="chevron-down" size={20} color="white" />
              )}
            />
          </View>
        </View>
        <View className="flex-row justify-end w-full">
          <CustomButton
            title="Apply"
            backgroundColor="#08ABDE"
            size="medium"
            variant="outline"
            onPress={() => goToWasteDataScreen()}
          />
        </View>
      </CustomCard>
    </GlobalWrapper>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    padding: 16,
    gap: 8,
    justifyContent: "space-between",
  },
  datePicker: {},
  dropdownContainer: {
    marginBottom: 15,
    // z-index ditambahkan inline untuk setiap container
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
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
