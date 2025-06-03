import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GlobalWrapper from "@components/ui/GlobalWrapper";
import {
  CustomButton,
  CustomText,
  CustomModalConfirmation,
} from "@components/common";

const WasteBagLabelScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "internet" | "bluetooth" | "manual"
  >("internet");
  const [weight, setWeight] = useState<string>("0.0");
  const [binNumber, setBinNumber] = useState<string>("");
  const [trolleyNumber, setTrolleyNumber] = useState<string>("");
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] =
    useState<boolean>(false);

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
        <CustomText className="flex-1 text-gray-600 text-sm">
          {label}
        </CustomText>
        <CustomText className="flex-1 text-gray-800 text-sm">
          {value}
        </CustomText>
      </View>
    );
  };

  return (
    <GlobalWrapper title="Waste Bag Label">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Form Data */}
        <View className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          {Object.entries(wasteData).map(([key, value], index) => (
            <View key={index}>{renderInfoItem(key, value)}</View>
          ))}
        </View>

        {/* Tabs Section Below Form */}
        <View className="mb-4">
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
              <CustomText
                className={`ml-2 font-medium ${
                  activeTab === "internet" ? "text-[#2EA5CB]" : "text-gray-500"
                }`}
              >
                Internet
              </CustomText>
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
              <CustomText
                className={`ml-2 font-medium ${
                  activeTab === "bluetooth" ? "text-[#2EA5CB]" : "text-gray-500"
                }`}
              >
                Bluetooth
              </CustomText>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 py-3 flex-row justify-center items-center ${
                activeTab === "manual"
                  ? "bg-white border-t border-l border-r border-gray-200 rounded-t-lg"
                  : "bg-gray-100 border-b border-gray-200"
              }`}
              onPress={() => setActiveTab("manual")}
            >
              {/* <Ionicons
                name="scale"
                size={18}
                color={activeTab === "manual" ? "#2EA5CB" : "#6B7280"}
              /> */}
              <CustomText
                className={`ml-2 font-medium ${
                  activeTab === "manual" ? "text-[#2EA5CB]" : "text-gray-500"
                }`}
              >
                Manual Scale
              </CustomText>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          <View className="bg-white p-4 rounded-b-lg">
            {/* Weight Input Section - Dirapikan */}
            <View className="py-3 border-b border-gray-200">
              <View className="flex-row items-center justify-between">
                <TouchableOpacity
                  className="border border-[#008DBA] bg-white px-8 py-1 rounded-md"
                  onPress={() => console.log("Get weight from device")}
                >
                  <CustomText
                    className="text-[#008DBA]"
                    fontFamily="Poppins-SemiBold"
                  >
                    Get
                  </CustomText>
                </TouchableOpacity>

                <View className="flex-row items-center">
                  <CustomText className="text-gray-600 mr-2">
                    Weight:
                  </CustomText>
                  <TextInput
                    className="bg-gray-100 px-3 py-1 rounded border border-gray-300 w-24 text-center"
                    value={weight}
                    editable={false}
                    selectTextOnFocus={false}
                  />
                  <CustomText
                    className="text-gray-600 ml-2"
                    fontFamily="Poppins-SemiBold"
                  >
                    KG
                  </CustomText>
                </View>
              </View>
            </View>

            <View className="mt-4">
              <CustomText className="mb-2" fontFamily="Poppins-SemiBold">
                Bin Number
              </CustomText>
              <TextInput
                className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 mb-4"
                placeholder="Input bin number"
                value={binNumber}
                onChangeText={setBinNumber}
                keyboardType="numeric"
              />

              <CustomText className="my-2" fontFamily="Poppins-SemiBold">
                Trolley Number
              </CustomText>
              <TextInput
                className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 mb-4"
                placeholder="Input bin trolley number"
                value={trolleyNumber}
                onChangeText={setTrolleyNumber}
                keyboardType="numeric"
              />

              <View className="flex-row justify-end mt-2">
                <TouchableOpacity
                  className="bg-[#08ABDE] px-6 items-center justify-center rounded-md py-2"
                  onPress={() => {
                    console.log("Submit", binNumber, trolleyNumber);
                    setIsOpenConfirmationModal(true);
                  }}
                >
                  <CustomText
                    className="font-medium text-white"
                    fontFamily="Poppins-SemiBold"
                  >
                    Submit
                  </CustomText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <CustomModalConfirmation
          visible={isOpenConfirmationModal}
          onClose={() => setIsOpenConfirmationModal(false)}
        >
          <CustomText className="mb-5 text-center">
            Update waste succesfully
          </CustomText>
          <View className="flex-row justify-between gap-4">
            <View className="w-[120px]">
              <CustomButton
                variant="solid"
                onPress={() => setIsOpenConfirmationModal(false)}
                backgroundColor="#27AE60"
                title="More Scans"
                size="small"
                borderRadius={15}
              />
            </View>

            <View className="w-[120px]">
              <CustomButton
                variant="solid"
                onPress={() => setIsOpenConfirmationModal(false)}
                backgroundColor="#2EA5CB"
                title="Done"
                size="small"
                borderRadius={15}
              />
            </View>
          </View>
        </CustomModalConfirmation>
      </ScrollView>
    </GlobalWrapper>
  );
};

export default WasteBagLabelScreen;
