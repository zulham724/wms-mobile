// src/components/DatePicker.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ViewStyle,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";

type CustomDatePickerProps = {
  onDateSelected: (date: string) => void;
  style?: ViewStyle; // ✅ ADD THIS
  mode?: "date" | "time";
};

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  onDateSelected,
  style,
  mode = "date",
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event: any, date?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }
    if (date) {
      setSelectedDate(date);
      onDateSelected(date.toISOString().split("T")[0]); // Format to yyyy-mm-dd
    }
  };
  const formattedDate = format(selectedDate || new Date(), "dd-MM-yyyy");

  console.log(selectedDate, "selectedDate");
  console.log(formattedDate, "formattedDate");

  return (
    <View style={[styles.wrapper, style]}>
      {/* ✅ APPLY PARENT STYLE HERE */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowPicker(true)}
      >
        <Text style={styles.inputText}>{formattedDate}</Text>
        {/* <Icon name="calendar" size={16} color="#fff" /> */}
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode={mode}
          display={Platform.OS === "ios" ? "spinner" : "calendar"}
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#08ABDE",
  },
  inputText: {
    fontSize: 14,
    color: "#fff",
  },
});

export default CustomDatePicker;
