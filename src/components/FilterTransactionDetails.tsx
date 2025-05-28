import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { CustomButton } from "@components/common";

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
        />
      </View>

      <View style={styles.dropdownContainer}>
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
          dropDownContainerStyle={styles.dropdownList}
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
    zIndex: -1,
  },
  dropdownContainer: {
    marginBottom: 16,
    zIndex: 10, // Important for overlapping dropdowns
    // backgroundColor: '#fff',
  },
  dropdown: {
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
  },
  dropdownList: {
    borderColor: "#ccc",
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
});

export default FilterTransactionDetails;
