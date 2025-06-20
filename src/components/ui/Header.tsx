import React from "react";
import { View, Text } from "react-native";

const HeaderComponent: React.FC = () => {
  return (
    <View className="w-full bg-white py-4 px-4">
      <View className="items-center justify-center py-4 bg-[#7DBAE740] rounded-lg">
        <Text className="font-roboto-bold text-base color-[#2EA5CB] ">
          RSUP Fatmawati
        </Text>
      </View>
    </View>
  );
};

export default HeaderComponent;
