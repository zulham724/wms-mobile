import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import BottomSheet from "./BottomSheet/BottomSheetComponent";
import BadgeComponent from "./Badge/BadgeComponent";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheetComponent from "./BottomSheet/BottomSheetComponent";
// import BoxIcon from "../../assets/icons/box.svg";
// import FireIcon from "../../assets/icons/fire.svg";
// import FireAltIcon from "../../assets/icons/fire-alt.svg";

const DataItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <View style={styles.dataItemContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value ?? "-"}
        editable={false}
        style={styles.readOnlyInput}
        placeholder="value"
      />
    </View>
  );
};

const TransactionDetailsSheet = () => {
  const dataItems = [
    { label: "Waste Transaction Group", value: "-" },
    { label: "Waste Type", value: "Hazardous" },
    { label: "Waste Group", value: "Medical Waste" },
    { label: "Waste Characteristic", value: "Hemodialisa room" },
    { label: "Waste Source", value: "Hemodialisa 1" },
    { label: "Weight", value: "258.259 kg" },
    { label: "Scale Method", value: "Bluetooth" },
    { label: "Waste Action", value: "Pyrolysis" },
    { label: "Waste Status", value: "Process" },
    { label: "Waste Action End", value: "13 May 2025 12:00:00 PM" },
  ];

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.badgeContainer}>
        <BadgeComponent
          status="default"
          label="No. 1973-19-12-2025"
          variant="solid"
          size="small"
        />
        <BadgeComponent
          status="secondary"
          label="11 May 2025"
          variant="solid"
          size="small"
        />
      </View>
      <Text style={styles.title}>Detail Data</Text>
      {dataItems.map((item, index) => (
        <DataItem key={index} label={item.label} value={item.value} />
      ))}
      <Text style={styles.title}>Waste Monitoring</Text>
      <View style={styles.monitoringWrapper}>
        {/* Icon Row */}
        <View style={styles.iconRow}>
          <View style={styles.iconContainer}>
            {/* <BoxIcon width={30} height={30} /> */}
          </View>
          <View style={styles.iconContainer}>
            {/* <FireIcon width={30} height={30} /> */}
          </View>
          <View style={styles.iconContainer}>
            {/* <FireAltIcon width={30} height={30} /> */}
          </View>
        </View>

        {/* Timeline Row */}
        <View style={styles.timelineRow}>
          <View style={styles.timelineItem}>
            <View style={styles.circle} />
          </View>
          <View style={styles.line} />
          <View style={styles.timelineItem}>
            <View style={styles.circle} />
          </View>
          <View style={styles.line} />
          <View style={styles.timelineItem}>
            <View style={styles.circle} />
          </View>
        </View>
      </View>

      {/* Vertical timeline items */}
      <View style={styles.monitoringDetailWrapper}>
        <View style={styles.verticalTimelineContainer}>
          <View style={styles.verticalCircle} />
          <View style={styles.verticalLine} />
        </View>
        <View style={styles.monitoringDetail}>
          <Text style={styles.monitoringName}>Temporary Storage</Text>
          <Text style={styles.monitoringDate}>
            Tuesday, 13 May 2025 02:05:44 PM
          </Text>
        </View>
      </View>

      <View style={styles.monitoringDetailWrapper}>
        <View style={styles.verticalTimelineContainer}>
          <View style={styles.verticalCircle} />
          <View style={styles.verticalLine} />
        </View>
        <View style={styles.monitoringDetail}>
          <Text style={styles.monitoringName}>Pyrolysis</Text>
          <Text style={styles.monitoringDate}>
            Tuesday, 14 May 2025 08:00:32 AM
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    width: "100%",
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 12,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  fieldContainer: {
    width: "100%",
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dataItemContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontWeight: 400,
    fontSize: 12,
    width: "50%",
  },
  readOnlyInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#f2f2f2",
    color: "#000",
    marginTop: 4,
    width: "50%",
    fontSize: 12,
  },
  monitoringWrapper: {
    marginTop: 16,
    marginBottom: 24,
    alignItems: "center",
    paddingHorizontal: 28,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 12,
  },
  iconContainer: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  timelineRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  timelineItem: {
    width: 30, // Same width as iconContainer
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#49A3C6", // blue
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: "#49A3C6",
  },
  monitoringDetailWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  verticalTimelineContainer: {
    width: 30,
    alignItems: "center",
    marginRight: 12,
  },
  verticalCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#49A3C6",
  },
  verticalLine: {
    width: 2,
    height: 40,
    backgroundColor: "#49A3C6",
    marginTop: 2,
  },
  monitoringDetail: {
    flex: 1,
    backgroundColor: "#EFF1F4",
    padding: 8,
    borderRadius: 6,
    minHeight: 40, // Ensure minimum height for visual balance
    justifyContent: "center",
  },
  monitoringName: {
    fontSize: 10,
    fontWeight: "700",
  },
  monitoringDate: {
    fontSize: 10,
    fontWeight: "400",
  },
});

export default TransactionDetailsSheet;
