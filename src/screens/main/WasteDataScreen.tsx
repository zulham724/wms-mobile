import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import HeaderComponent from "@components/Header";
import { Ionicons } from "@expo/vector-icons";
import CardComponent from "@components/Card/CardComponent";
import BadgeComponent from "@components/Badge/BadgeComponent";
import { useNavigation } from "@react-navigation/native";
import CheckBox from '@react-native-community/checkbox'; // Import the checkbox component

export default function WasteDataScreen() {
  const navigation = useNavigation();

  // Menyimpan status terpilih untuk masing-masing item
  const [selectedItems, setSelectedItems] = useState<boolean[]>(Array(5).fill(false));

  // Handle ketika user memilih atau membatalkan pilihan untuk satu card
  const handleSelectItem = (index: number) => {
    const updatedSelection = [...selectedItems];
    updatedSelection[index] = !updatedSelection[index]; // Toggle nilai terpilih
    setSelectedItems(updatedSelection);
  };

  // Handle untuk memilih semua item
  const handleSelectAll = () => {
    const allSelected = selectedItems.every((item) => item === true);
    const updatedSelection = Array(5).fill(!allSelected); // Jika sudah semua terpilih, batal pilih semua, sebaliknya pilih semua
    setSelectedItems(updatedSelection);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View className="flex-1 bg-[#EFF1F4]">
      <HeaderComponent />
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} className="flex-1">
        <View className="pt-4 pb-4 px-4 flex-row items-center relative">
          <TouchableOpacity
            className="absolute left-4 top-4 z-10"
            onPress={handleGoBack}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <View className="flex-1 items-center">
            <Text className="text-xl font-bold text-black">Select Waste Data</Text>
          </View>
        </View>
        <View className="mx-4">
          <View className="mt-2 flex-row justify-between">
            <View className="flex-row">
              <Text className="text-lg  text-black mb-4">Total Waste :</Text>
              <Text className="text-lg font-semibold text-black mb-4">500 kg</Text>
            </View>
            <View>
              <TouchableOpacity onPress={handleSelectAll}>
                <Text className="text-lg font-semibold text-black">
                  {selectedItems.every((item) => item) ? "Deselect All" : "Select All"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {Array.from({ length: 5 }).map((_, index) => (
            <View className="mb-4" key={index}>
              <CardComponent style={styles.cardContainer}>
                <View className="flex-row justify-between w-full gap-5">
                  <BadgeComponent
                    status="success"
                    label="Hazardous"
                    customContainerStyle={styles.badgeContainerStyle}
                  />
                  <BadgeComponent
                    status="success"
                    label="Medical Waste"
                    customContainerStyle={styles.badgeContainerStyle}
                  />
                  <BadgeComponent
                    status="success"
                    label="Unsegregated"
                    customContainerStyle={styles.badgeContainerStyle}
                  />
                </View>
                <View className="flex-row justify-end w-full gap-5">
                  <BadgeComponent
                    status="info"
                    label="Temporary Storage"
                    customContainerStyle={styles.badgeContainerStyle}
                  />
                  <BadgeComponent
                    status="default"
                    variant="outline"
                    label="258,259 kg"
                    customContainerStyle={styles.badgeContainerStyle}
                  />
                </View>

                {/* Checkbox untuk memilih card */}
                {/* <TouchableOpacity onPress={() => handleSelectItem(index)} style={styles.checkboxContainer}>
                  <CheckBox
                    value={selectedItems[index]}
                    onValueChange={() => handleSelectItem(index)}
                    tintColors={{ true: '#08ABDE', false: '#ccc' }}
                  />
                  <Text style={styles.checkboxText}>
                    {selectedItems[index] ? "Selected" : "Select"}
                  </Text>
                </TouchableOpacity> */}
              </CardComponent>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  badgeContainerStyle: {
    minWidth: "29%",
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkboxText: {
    color: "black",
    marginLeft: 8,
    fontWeight: "bold",
  },
});
