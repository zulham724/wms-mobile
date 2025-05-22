import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState, useCallback } from "react";
import CardComponent from "@components/common/Card/CardComponent";
import BadgeComponent from "@components/common/Badge/BadgeComponent";
import { Ionicons } from "@expo/vector-icons";
import GlobalWrapper from "@components/ui/GlobalWrapper";
import DropDownPicker from "react-native-dropdown-picker";
import ButtonComponent from "@components/common/Button/ButtonComponent";

// Custom checkbox component
const CustomCheckbox = ({
  value,
  onValueChange,
}: {
  value: boolean;
  onValueChange: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onValueChange}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      className="pl-2"
    >
      {value ? (
        <Ionicons name="checkbox" size={24} color="#08ABDE" />
      ) : (
        <Ionicons name="square-outline" size={24} color="#ccc" />
      )}
    </TouchableOpacity>
  );
};

export default function WasteDataScreen() {
  // Total waste data items
  const totalItems = 5;

  // Store selected status for each item
  const [selectedItems, setSelectedItems] = useState<boolean[]>(
    Array(totalItems).fill(false)
  );

  // Follow Up dropdown state
  const [followUpOpen, setFollowUpOpen] = useState(false);
  const [selectedFollowUp, setSelectedFollowUp] = useState(null);
  const [followUpItems, setFollowUpItems] = useState([
    { label: "Autoclave", value: "autoclave" },
    { label: "Transporter Requested", value: "transporter" },
  ]);

  // Handle dropdown open
  const onFollowUpOpen = useCallback(() => {
    // Close other dropdowns if needed in the future
  }, []);

  // Handle when user selects or deselects one card
  const handleSelectItem = useCallback((index: number) => {
    setSelectedItems((prevState) => {
      const updatedSelection = [...prevState];
      updatedSelection[index] = !updatedSelection[index]; // Toggle selected value
      return updatedSelection;
    });
  }, []);

  // Handle select all items
  const handleSelectAll = useCallback(() => {
    const allSelected = selectedItems.every((item) => item === true);
    setSelectedItems(Array(totalItems).fill(!allSelected));
  }, [selectedItems]);

  // Count selected items
  const selectedCount = selectedItems.filter(Boolean).length;

  // Select All status
  const allSelected = selectedItems.every((item) => item === true);

  return (
    <GlobalWrapper title="Select Waste Data" showBackAction={true}>
      <View className="mt-2 flex-row justify-between items-center mb-4">
        <View className="flex-row gap-1">
          <Text className="text-lg text-black">Total Waste :</Text>
          <Text className="text-lg font-semibold text-black">500 kg</Text>
        </View>
        <View className="flex-row items-center">
          <TouchableOpacity onPress={handleSelectAll}>
            <Text className="text-base font-semibold text-black ml-1">
              {allSelected ? "Deselect All" : "Select All"}
            </Text>
          </TouchableOpacity>
          <CustomCheckbox value={allSelected} onValueChange={handleSelectAll} />
        </View>
      </View>

      {selectedCount > 0 && (
        <View className="mb-2 flex-row">
          <Text className="text-base text-blue-500 font-semibold">
            {selectedCount} item{selectedCount > 1 ? "s" : ""} selected
          </Text>
        </View>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        className="flex-1"
      >
        <View className="mb-14">
          {Array.from({ length: totalItems }).map((_, index) => (
            <View className="mb-4 flex-row items-center" key={index}>
              {/* Card component takes remaining space */}
              <View className="flex-1">
                <CardComponent style={styles.cardContainer}>
                  <View className="flex-row justify-between items-center w-full">
                    <View className="flex-1">
                      <View className="flex-row flex-wrap gap-2 mb-2">
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
                      <View className="flex-row flex-wrap gap-2">
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
                    </View>
                  </View>
                </CardComponent>
              </View>

              {/* Checkbox positioned first in the row */}
              <CustomCheckbox
                value={selectedItems[index]}
                onValueChange={() => handleSelectItem(index)}
              />
            </View>
          ))}
          {selectedCount > 0 && (
            <View>
              <Text className="text-lg font-semibold mb-2">Selected Data</Text>
              <View className="flex-row gap-8 items-end">
                {/* card 1 */}
                <CardComponent
                  style={[styles.cardContainer, styles.selectedCardContainer]}
                >
                  <View className="flex-row justify-between items-center w-full">
                    <Text>Infectious</Text>
                    <Text>3</Text>
                  </View>
                  {/* Divider between views */}
                  <View className="border-t border-gray-200 w-full my-2" />
                  <View className="flex-row justify-between items-center w-full">
                    <Text>Sharp</Text>
                    <Text>2</Text>
                  </View>
                </CardComponent>
                {/* card 2 - adjusted to fit content */}
                <CardComponent
                  style={[styles.cardContainer, styles.selectedCardContainer]}
                >
                  <View className="flex-row justify-between items-center">
                    <Text>Total Weight</Text>
                    <Text className="ml-4">5</Text>
                  </View>
                </CardComponent>
              </View>

              <View className="flex-row gap-1 mt-4 mb-2">
                <Text className="text-lg font-semibold">Follow Up Action</Text>
                <Text className="text-sm text-red-500">*</Text>
              </View>

              {/* <Text className="text-lg font-semibold mt-4">
                Follow Up Action
              </Text> */}
              <DropDownPicker
                open={followUpOpen}
                value={selectedFollowUp}
                items={followUpItems}
                setOpen={setFollowUpOpen}
                setValue={setSelectedFollowUp}
                setItems={setFollowUpItems}
                placeholder="Select Follow Up Action"
                style={styles.dropdown}
                dropDownContainerStyle={[styles.dropdownList]}
                textStyle={styles.dropdownText}
                listItemLabelStyle={styles.listItemLabel}
                onOpen={onFollowUpOpen}
                maxHeight={150}
                ArrowUpIconComponent={({ style }) => (
                  <Ionicons name="chevron-up" size={20} color="white" />
                )}
                ArrowDownIconComponent={({ style }) => (
                  <Ionicons name="chevron-down" size={20} color="white" />
                )}
              />

              <View className="mt-6 items-end">
                <ButtonComponent
                  variant="outline"
                  borderColor="#08ABDE"
                  textColor="#08ABDE"
                  size="medium"
                  title="Next"
                  onPress={() => console.log("Submit button clicked")}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Floating button for further actions if items are selected */}
      {/* {selectedCount > 0 && (
        <View className="absolute bottom-4 left-0 right-0 flex items-center">
          <TouchableOpacity
            className="bg-blue-500 py-3 px-8 rounded-full shadow-md"
            onPress={() =>
              console.log("Process selected items:", selectedItems)
            }
          >
            <Text className="text-white font-bold text-base">
              Process {selectedCount} Item{selectedCount > 1 ? "s" : ""}
            </Text>
          </TouchableOpacity>
        </View>
      )} */}
    </GlobalWrapper>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 12,
  },
  badgeContainerStyle: {
    minWidth: "30%",
    alignItems: "center",
  },
  selectedCardContainer: {
    // borderColor: "blue",
    // borderWidth: 2,
    // maxWidth: "40%",
    flex: 1,
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
