import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { CustomButton } from "@components/common";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

export default function Banner() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const openFollowUpScreen = () => {
    navigation.navigate("FollowUp" as never);
  };
  return (
    <View className=" bg-[#08ABDE] rounded-xl w-full mt-4 h-[150px] relative overflow-hidden">
      <ImageBackground
        source={require("@assets/images/wave-banner.png")} // Adjust the path accordingly
        className="flex-1"
        resizeMode="cover"
      >
        <View className="p-5">
          <Text className="text-white font-poppins-semibold w-[70%]">
            {t("bannerMessage")}
          </Text>
          <View className="mt-10 flex-row gap-2 justify-end relative">
            <CustomButton
              title={t("btnStartScalling")}
              onPress={() => {}}
              backgroundColor="#08ABDE"
              borderRadius={5}
              size="small"
              textStyle={{ fontFamily: "Poppins-SemiBold" }}
            />
            <CustomButton
              title={t("btnFollowUp")}
              onPress={() => openFollowUpScreen()}
              backgroundColor="#08ABDE"
              borderRadius={5}
              size="small"
              textStyle={{ fontFamily: "Poppins-SemiBold" }}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
