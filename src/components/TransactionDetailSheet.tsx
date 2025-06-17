import React from "react";
import { View, Text, StyleSheet, TextInput, Dimensions } from "react-native";
import { CustomBadge, CustomText } from "@components/common";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

const { height: screenHeight } = Dimensions.get("window");

const DataItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <View className="w-full flex-row justify-between items-center mb-2">
      <CustomText className="text-xs w-1/2">{label}</CustomText>
      <TextInput
        value={value ?? "-"}
        editable={false}
        className="border border-gray-300 rounded-lg px-3 py-2 bg-[#EFF1F4] text-black mt-1 w-1/2 text-xs font-poppins-regular"
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
    <View style={styles.container}>
      {/* ScrollView untuk konten yang dapat di-scroll */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
        nestedScrollEnabled={true} // Penting untuk nested scrolling dalam BottomSheet
      >
        {/* Header outside ScrollView untuk tetap terlihat */}
        <View>
          <View className="w-full py-2.5 flex flex-row justify-between items-center">
            <CustomBadge
              status="default"
              label="No. 1973-19-12-2025"
              variant="solid"
              size="small"
            />
            <CustomBadge
              status="secondary"
              label="11 May 2025"
              variant="solid"
              size="small"
            />
          </View>
          <CustomText fontFamily="Poppins-SemiBold" className="my-3 text-base">
            Detail Data
          </CustomText>
        </View>

        <View>
          {dataItems.map((item, index) => (
            <DataItem key={index} label={item.label} value={item.value} />
          ))}

          <CustomText fontFamily="Poppins-SemiBold" className="text-base mt-5">
            Waste Monitoring
          </CustomText>
          <View className="mb-6 items-center px-20 mt-2">
            {/* Icon Row */}
            <View className="flex-row justify-between w-full mb-3">
              <View style={styles.iconContainer}>
                <Icon name="cube" size={22} color="#2EA5CB" />
              </View>
              <View style={styles.iconContainer}>
                <Icon name="cog" size={22} color="#2EA5CB" />
              </View>
              <View style={styles.iconContainer}>
                <Icon name="fire" size={22} color="#2EA5CB" />
              </View>
            </View>

            {/* Timeline Row */}
            <View className="flex-row items-center justify-between w-full">
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

          {/* Tambahkan item contoh untuk menguji scrolling */}
          <View style={styles.monitoringDetailWrapper}>
            <View style={styles.verticalTimelineContainer}>
              <View style={styles.verticalCircle} />
              <View style={styles.verticalLine} />
            </View>
            <View style={styles.monitoringDetail}>
              <Text style={styles.monitoringName}>Final Disposal</Text>
              <Text style={styles.monitoringDate}>
                Tuesday, 15 May 2025 10:30:15 AM
              </Text>
            </View>
          </View>

          {/* Extra space at bottom for better scrolling UX */}
          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    // maxHeight: screenHeight * 0.7, // membatasi tinggi maksimum
  },
  scrollContent: {
    paddingBottom: 20,
  },
  iconContainer: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
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
  bottomSpacing: {
    height: 20,
  },
});

export default TransactionDetailsSheet;
