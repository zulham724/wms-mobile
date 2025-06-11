import { View, TextInput, StyleSheet } from "react-native";
import React from "react";
import GlobalWrapper from "@components/ui/GlobalWrapper";
import {
  CustomButton,
  CustomCard,
  CustomDatePicker,
  CustomText,
} from "@components/common";

const ItemFieldReadOnly = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <View className="mb-2">
      <CustomText fontFamily="Poppins-SemiBold">{label}</CustomText>
      <TextInput
        className=" rounded-lg px-3 py-4 bg-[#7A8387]  mt-1 w-full text-xs font-poppins-regular text-white"
        keyboardType="number-pad"
        value={value}
      />
    </View>
  );
};

export default function WasteFollowUpActionScreen() {
  return (
    <GlobalWrapper title="Waste Follow Up Action" showBackAction={true}>
      <CustomCard>
        {/* <CustomText fontFamily="Poppins-SemiBold">Follow Up Action</CustomText>
        <TextInput
          className=" rounded-lg px-3 py-4 bg-[#7A8387]  mt-1 w-full text-xs font-poppins-regular text-white"
          keyboardType="number-pad"
          value="Temporary Storage"
        /> */}
        <ItemFieldReadOnly label="Follow Up Action" value="Temporary Storage" />
        <ItemFieldReadOnly label="Storage Rule" value="2 Days" />
        <ItemFieldReadOnly label="Temporary Min Processing" value="48 Hours" />
        <ItemFieldReadOnly label="Temporary Max Processing" value="48 Hours" />
        <View className="mt-2">
          <CustomText fontFamily="Poppins-SemiBold">
            Date of Follow Up Action
          </CustomText>

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
                // style={styles.datePicker}
              />
            </View>

            {/* End Date */}
            <View className="flex-col w-[49%]">
              <View className="flex-row items-center gap-1">
                <CustomText className="text-sm text-black">Time</CustomText>
                <CustomText className="text-sm text-red-500">*</CustomText>
              </View>
              <CustomDatePicker
                onDateSelected={() => {}}
                // style={styles.datePicker}
              />
            </View>
          </View>

          <View className="flex-row justify-between mt-2">
            <View className="flex-col w-[49%]">
              <View className="flex-row items-center gap-1">
                <CustomText className="text-sm text-black">End Date</CustomText>
                <CustomText className="text-sm text-red-500">*</CustomText>
              </View>
              <CustomDatePicker
                onDateSelected={() => {}}
                // style={styles.datePicker}
              />
            </View>

            {/* End Date */}
            <View className="flex-col w-[49%]">
              <View className="flex-row items-center gap-1">
                <CustomText className="text-sm text-black">Time</CustomText>
                <CustomText className="text-sm text-red-500">*</CustomText>
              </View>
              <CustomDatePicker
                onDateSelected={() => {}}
                // style={styles.datePicker}
              />
            </View>
          </View>
        </View>

        <View className="flex-row justify-end w-full mt-4">
          <CustomButton
            title="Apply"
            backgroundColor="#08ABDE"
            size="medium"
            variant="outline"
            onPress={() => console.log("Apply")}
          />
        </View>
      </CustomCard>
    </GlobalWrapper>
  );
}

const styles = StyleSheet.create({});
