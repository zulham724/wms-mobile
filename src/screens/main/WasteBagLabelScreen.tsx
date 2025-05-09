import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const WasteBagLabelScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"internet" | "bluetooth">(
    "internet"
  );
  const [weight, setWeight] = useState<string>("0.0");
  const [binNumber, setBinNumber] = useState<string>("");

  const wasteData = {
    "Waste Group Source": "Clinical Waste",
    "Waste Source": "Hospital Ward",
    "Waste Type": "Infectious Waste",
    "Waste Group": "Red Bag Waste",
    "Storage Rule": "Sealed Container Required",
    "Cold Storage Max Processing": "24 Hours",
    "Temporary Storage Min Processing": "12 Hours",
    "Temporary Storage Max Processing": "48 Hours",
  };

  const renderInfoItem = (label: string, value: string) => {
    return (
      <View className="flex-row py-4 border-b border-gray-200">
        <Text className="flex-1 text-gray-600 font-medium">{label}</Text>
        <Text className="flex-1 text-gray-800">{value}</Text>
      </View>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "internet":
        return (
          <View className="bg-white p-4 rounded-b-lg">
            {/* Weight Input Section - Dirapikan */}
            <View className="py-3 border-b border-gray-200">
              <View className="flex-row items-center justify-between">
                <TouchableOpacity
                  className="bg-[#2EA5CB] px-5 py-2 rounded-md"
                  onPress={() => console.log("Get weight from device")}
                >
                  <Text className="text-white font-medium">Get Weight</Text>
                </TouchableOpacity>

                <View className="flex-row items-center">
                  <Text className="text-gray-600 mr-2">Weight:</Text>
                  <TextInput
                    className="bg-gray-100 px-3 py-1 rounded border border-gray-300 w-24 text-center"
                    value={weight}
                    editable={false}
                    selectTextOnFocus={false}
                  />
                  <Text className="text-gray-600 ml-2">KG</Text>
                </View>
              </View>
            </View>

            <View className="mt-4">
              <Text className="font-semibold mb-2">Bin Number</Text>
              <TextInput
                className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 mb-4"
                placeholder="Input bin number"
                value={binNumber}
                onChangeText={setBinNumber}
                keyboardType="numeric"
              />

              <View className="flex-row justify-between mt-2">
                <TouchableOpacity
                  className="bg-gray-200 px-4 py-2 rounded-md"
                  onPress={() => console.log("Request Manual")}
                >
                  <Text className="font-medium text-gray-700">
                    Request Manual
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="bg-[#08ABDE] px-6 py-2 rounded-md"
                  onPress={() => console.log("Submit", binNumber)}
                >
                  <Text className="font-medium text-white">Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      case "bluetooth":
        return (
          <View className="bg-white p-4 rounded-b-lg">
            <View className="items-center py-2">
              <Ionicons name="bluetooth" size={32} color="#2EA5CB" />
              <Text className="text-base font-medium mt-2">
                Bluetooth Devices
              </Text>
              <Text className="text-gray-600 text-sm mt-1 text-center">
                Connect to nearby Bluetooth devices
              </Text>
            </View>

            {/* Sample Bluetooth Devices */}
            <View className="mt-4">
              {renderInfoItem("Bluetooth Status", "On")}
              {renderInfoItem("Scanner #1", "Connected")}
              {renderInfoItem("Label Printer", "Available")}
              {renderInfoItem("Waste Scale", "Not Connected")}
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-[#EFF1F4]">
      {/* Header */}
      <View className="pt-12 pb-4 px-4 flex-row items-center relative">
        <TouchableOpacity
          className="absolute left-4 top-12 z-10"
          onPress={() => console.log("Go back")}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View className="flex-1 items-center">
          <Text className="text-xl font-bold text-black">Waste Bag Label</Text>
        </View>
      </View>

      {/* Content in ScrollView */}
      <ScrollView className="flex-1 px-4 py-6">
        {/* Form Data */}
        <View className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          {Object.entries(wasteData).map(([key, value], index) => (
            <View key={index}>{renderInfoItem(key, value)}</View>
          ))}
        </View>

        {/* Tabs Section Below Form */}
        <View className="mb-4 pb-6">
          <View className="flex-row">
            <TouchableOpacity
              className={`flex-1 py-3 flex-row justify-center items-center ${
                activeTab === "internet"
                  ? "bg-white border-t border-l border-r border-gray-200 rounded-t-lg"
                  : "bg-gray-100 border-b border-gray-200"
              }`}
              onPress={() => setActiveTab("internet")}
            >
              <Ionicons
                name="wifi"
                size={18}
                color={activeTab === "internet" ? "#2EA5CB" : "#6B7280"}
              />
              <Text
                className={`ml-2 font-medium ${
                  activeTab === "internet" ? "text-[#2EA5CB]" : "text-gray-500"
                }`}
              >
                Internet
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 py-3 flex-row justify-center items-center ${
                activeTab === "bluetooth"
                  ? "bg-white border-t border-l border-r border-gray-200 rounded-t-lg"
                  : "bg-gray-100 border-b border-gray-200"
              }`}
              onPress={() => setActiveTab("bluetooth")}
            >
              <Ionicons
                name="bluetooth"
                size={18}
                color={activeTab === "bluetooth" ? "#2EA5CB" : "#6B7280"}
              />
              <Text
                className={`ml-2 font-medium ${
                  activeTab === "bluetooth" ? "text-[#2EA5CB]" : "text-gray-500"
                }`}
              >
                Bluetooth
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          {renderTabContent()}
        </View>
      </ScrollView>
    </View>
  );
};

export default WasteBagLabelScreen;
