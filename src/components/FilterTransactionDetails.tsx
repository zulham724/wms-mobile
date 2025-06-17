import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { CustomButton } from "@components/common";
import { Ionicons } from "@expo/vector-icons";

const FilterTransactionDetails = () => {
  const [classificationOpen, setClassificationOpen] = useState(false);
  const [selectedClassification, setSelectedClassification] = useState(null);

  const [actionOpen, setActionOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

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

  const handleReset = () => {
    setSelectedClassification(null);
    setSelectedAction(null);
  };

  const handleSubmit = () => {
    console.log("Submitted:", {
      classification: selectedClassification,
      action: selectedAction,
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.dropdownContainer,
          { zIndex: actionOpen ? 2000 : 3000 }, // Memberikan z-index lebih tinggi untuk dropdown pertama
        ]}
      >
        <Text style={styles.text}>Waste Type</Text>
        <DropDownPicker
          open={classificationOpen}
          value={selectedClassification}
          items={classificationItems}
          setOpen={setClassificationOpen}
          setValue={setSelectedClassification}
          setItems={setClassificationItems}
          placeholder="Select Type"
          style={styles.dropdown}
          dropDownContainerStyle={[styles.dropdownList]}
          textStyle={styles.dropdownText}
          ArrowUpIconComponent={({ style }) => (
            <Ionicons name="chevron-up" size={20} color="white" />
          )}
          ArrowDownIconComponent={({ style }) => (
            <Ionicons name="chevron-down" size={20} color="white" />
          )}
          listItemLabelStyle={styles.listItemLabel}
        />
      </View>

      <View
        style={[
          styles.dropdownContainer,
          { zIndex: classificationOpen ? 2000 : 3000 }, // Memberikan z-index lebih tinggi untuk dropdown pertama
        ]}
      >
        <Text style={styles.text}>Waste Action</Text>
        <DropDownPicker
          open={actionOpen}
          value={selectedAction}
          items={actionItems}
          setOpen={setActionOpen}
          setValue={setSelectedAction}
          setItems={setActionItems}
          placeholder="Select Action"
          style={styles.dropdown}
          dropDownContainerStyle={[styles.dropdownList]}
          textStyle={styles.dropdownText}
          ArrowUpIconComponent={({ style }) => (
            <Ionicons name="chevron-up" size={20} color="white" />
          )}
          ArrowDownIconComponent={({ style }) => (
            <Ionicons name="chevron-down" size={20} color="white" />
          )}
          listItemLabelStyle={styles.listItemLabel}
        />
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <CustomButton
            title="Reset"
            backgroundColor="#D0D0D0"
            onPress={handleReset}
            borderRadius={4}
            size="medium"
            textColor="#7D7D7D"
          />
        </View>
        <View style={styles.button}>
          <CustomButton
            title="Submit"
            onPress={handleSubmit}
            backgroundColor="#08ABDE"
            borderRadius={4}
            size="medium"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: "100%",
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  dropdownContainer: {
    marginBottom: 16,
    zIndex: 10, // Important for overlapping dropdowns
    // backgroundColor: '#fff',
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 8,
  },
  button: {
    flex: 1,
  },
  dropdownText: {
    color: "#fff", // Keep white for closed dropdown text
  },
  listItemLabel: {
    color: "#000", // Black text for dropdown list items
  },
});

export default FilterTransactionDetails;
