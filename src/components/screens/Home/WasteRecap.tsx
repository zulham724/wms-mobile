import React from "react";
import { View, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { CustomText, CustomCard } from "@components/common";

type CardItemProps = {
  title: string;
  weight: string;
  transaction: string;
};

const CardItem: React.FC<CardItemProps> = ({
  title,
  weight,
  transaction,
}: CardItemProps) => {
  return (
    <CustomCard style={styles.card}>
      <CustomText>{title}</CustomText>
      <CustomText className="mt-2 text-sm" fontFamily="Poppins-Bold">
        {weight}
      </CustomText>
      <CustomText className="text-sm" fontFamily="Poppins-Italic">
        ({transaction})
      </CustomText>
    </CustomCard>
  );
};

const WasteRecap: React.FC = () => {
  const { t } = useTranslation();
  const cardItems: CardItemProps[] = [
    {
      title: "Plastic Waste",
      weight: "2.5 kg",
      transaction: "Transaction #00123",
    },
    {
      title: "Organic Waste",
      weight: "5.2 kg",
      transaction: "Transaction #00124",
    },
    {
      title: "Metal Waste",
      weight: "1.1 kg",
      transaction: "Transaction #00125",
    },
  ];

  return (
    <View style={styles.container}>
      <CustomText fontFamily="Poppins-SemiBold">
        {t("wasteRecapTitle")}
      </CustomText>
      <View style={styles.cardContainer}>
        {cardItems.map((item, index) => (
          <CardItem
            key={index}
            title={item.title}
            weight={item.weight}
            transaction={item.transaction}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    width: "100%",
  },
  title: {
    fontSize: 14,
    fontWeight: 600,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // Spread the cards nicely
    width: "100%",
    marginTop: 10,
  },

  card: {
    width: "49%", // Use 48% instead of 50% to leave some spacing
    marginBottom: 8, // Add vertical spacing between rows
  },
  weight: {
    fontWeight: "bold",
    marginTop: 6,
  },
  transaction: {
    fontStyle: "italic",
  },
});

export default WasteRecap;
