import {
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
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
import { ScrollView, TextInput } from "react-native-gesture-handler";

export default function FollowUpScreen() {
  const [classificationOpen, setClassificationOpen] = useState(false);
  const [selectedClassification, setSelectedClassification] = useState(null);

  const [actionOpen, setActionOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

  const [methodOpen, setMethodOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);

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

  const [methodItems, setMethodItems] = useState([
    { label: "Per Bag", value: "bag" },
    { label: "Per Bin", value: "bin" },
    { label: "Per Trolley", value: "trolley" },
  ]);

  const labelInputByFollowUp = {
    bin: "Input Bin Number",
    trolley: "Input Trolley Number",
    bag: "Input Bag Number",
  };

  return (
    <GlobalWrapper title="Follow Up Transaction" showBackAction={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <CustomCard style={styles.cardContainer}>
          {/* Start Date */}
          <View className="flex-row justify-between">
            <View className="flex-col w-[49%]">
              <View className="flex-row items-center gap-1">
                <CustomText className="text-sm text-black">
                  Start Date
                </CustomText>
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

          {/* Waste Type */}
          <View className="mt-4">
            <View
              style={[
                styles.dropdownContainer,
                { zIndex: 3000 }, // Memberikan z-index lebih tinggi untuk dropdown pertama
              ]}
            >
              <CustomText className="text-sm" fontFamily="Poppins-SemiBold">
                Waste Characteristic
              </CustomText>
              <DropDownPicker
                open={classificationOpen}
                value={selectedClassification}
                items={classificationItems}
                setOpen={setClassificationOpen}
                setValue={setSelectedClassification}
                setItems={setClassificationItems}
                placeholder="Select Type"
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

            <View
              style={[
                styles.dropdownContainer,
                { zIndex: 1000 }, // Z-index lebih rendah untuk dropdown kedua
              ]}
            >
              <CustomText className="text-sm" fontFamily="Poppins-SemiBold">
                Follow up Method
              </CustomText>
              <DropDownPicker
                open={methodOpen}
                value={selectedMethod}
                items={methodItems}
                setOpen={setMethodOpen}
                setValue={setSelectedMethod}
                setItems={setMethodItems}
                placeholder="Select Method"
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

          {selectedMethod && (
            <View>
              <CustomText className="text-sm" fontFamily="Poppins-SemiBold">
                {labelInputByFollowUp[selectedMethod]}
              </CustomText>
              <TextInput
                className=" rounded-lg px-3 py-4 bg-[#EFF1F4] text-black mt-1 w-full text-xs font-poppins-regular"
                keyboardType="number-pad"
              />
            </View>
          )}

          <View className="flex-row justify-end w-full mt-4">
            <CustomButton
              title="Apply"
              backgroundColor="#08ABDE"
              size="medium"
              variant="outline"
              onPress={() => goToWasteDataScreen()}
            />
          </View>
        </CustomCard>
      </KeyboardAvoidingView>
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
