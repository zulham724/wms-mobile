import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import { useTranslation } from "react-i18next";
import CountryFlag from "react-native-country-flag";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Localization from "expo-localization";

type LanguageOption = {
  code: "en" | "id";
  countryCode: string;
};

const languages: LanguageOption[] = [
  { code: "en", countryCode: "US" },
  { code: "id", countryCode: "ID" },
];

const LanguageDropdown: React.FC = () => {
  const localeLanguage = Localization.getLocales().slice(0, 2);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(
    languages.find((lang) => lang.code === localeLanguage[0].languageTag) || languages[0]
  );
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { i18n } = useTranslation();

  const handleSelectLanguage = (language: LanguageOption) => {
    i18n.changeLanguage(language.code);
    setSelectedLanguage(language);
    setDropdownVisible(false);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.selectedContainer}
        onPress={() => setDropdownVisible(!dropdownVisible)}
      >
        <View style={styles.flagWrapper}>
          <CountryFlag isoCode={selectedLanguage.countryCode} size={20} />
        </View>
        <Text style={styles.codeText}>
          {selectedLanguage.code.toUpperCase()}
        </Text>
        <MaterialIcons
          name={dropdownVisible ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={18}
          color="#333"
          style={styles.icon}
        />
      </TouchableOpacity>

      {dropdownVisible && (
        <FlatList
          data={languages}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleSelectLanguage(item)}
            >
              <View style={styles.flagWrapper}>
                <CountryFlag isoCode={item.countryCode} size={20} />
              </View>
              <Text style={styles.optionText}>{item.code.toUpperCase()}</Text>
            </TouchableOpacity>
          )}
          style={styles.dropdown}
          scrollEnabled={false} // This prevents scrolling within the dropdown itself
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 90,
    zIndex: 10,
    position: "relative",
  },
  selectedContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flagWrapper: {
    width: 20,
    height: 20,
    borderRadius: 10, // half of width/height to make it fully circular
    overflow: "hidden",
  },
  codeText: {
    fontSize: 12,
    marginLeft: 6,
    color: "#333",
    fontWeight: "500",
  },
  icon: {
    marginLeft: 4,
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    marginTop: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // for Android shadow
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  optionText: {
    fontSize: 12,
    marginLeft: 6,
    color: "#333",
  },
});

export default LanguageDropdown;
