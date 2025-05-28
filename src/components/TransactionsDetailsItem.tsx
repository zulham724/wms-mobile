import React, { useCallback, useRef } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import { setIsTransactionVisible } from "@services/features/navigationSlice";
import { CustomText, CustomBadge, CustomCard } from "@components/common";

interface BadgeProps {
  status: "success" | "error" | "warning" | "info" | "default";
  label: string;
}

const SolidBadge: React.FC<BadgeProps> = ({ status, label }) => {
  return (
    <CustomBadge
      status={status}
      label={label}
      variant="solid"
      customContainerStyle={{
        padding: 10,
        width: "31%",
      }}
      size="medium"
      customTextStyle={{ textAlign: "center" }}
    />
  );
};

const OutlineBadge: React.FC<BadgeProps> = ({ status, label }) => {
  return (
    <CustomBadge
      status={status}
      label={label}
      variant="outline"
      size="medium"
      customContainerStyle={{
        padding: 10,
        width: "31%",
      }}
      customTextStyle={{
        textAlign: "center",
        fontFamily: "Poppins-SemiBold",
      }}
    />
  );
};

const TransactionsDetailsItem = () => {
  const dispatch = useDispatch();
  const onOpenTransactionDetails = () => {
    dispatch(setIsTransactionVisible(true));
  };

  return (
    <View style={styles.container}>
      {/* Adjusted Search and Filter Row */}

      <Pressable onPress={onOpenTransactionDetails}>
        <CustomCard style={styles.card}>
          <View style={styles.badgeContainer}>
            <View style={styles.wasteActionStart}>
              <CustomBadge
                status="default"
                label="No. 1973-19-12-2025"
                variant="solid"
                size="small"
                customTextStyle={{ fontFamily: "Poppins-SemiBold" }}
              />
              <CustomBadge
                status="secondary"
                label="11 May 2025"
                variant="solid"
                size="small"
              />
            </View>
            <SolidBadge status="success" label="Hazardous " />
            <SolidBadge status="success" label="Medical Waste" />
            <SolidBadge status="success" label="Unsegregated " />
            <OutlineBadge status="default" label="Cold Storage" />
            <OutlineBadge status="default" label="Stored" />
            <OutlineBadge status="default" label="258,259 kg" />
            <View style={styles.wasteActionEnd}>
              <CustomText
                className="text-black text-[10px]"
                fontFamily="Poppins-SemiBold"
              >
                Waste Action End:
              </CustomText>
              <CustomText
                className="text-red-500 text-[10px]"
                fontFamily="Poppins-SemiBold"
              >
                13 May 2025 12:00:00 PM
              </CustomText>
            </View>
          </View>
        </CustomCard>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
  container: {
    marginTop: 20,
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    width: "100%",
  },

  card: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  badgeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%",
    gap: 8,
  },
  badge: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 400,
  },
  wasteActionStart: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    gap: 5, // Add some space between the two text elements
  },
  wasteActionEnd: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    gap: 5, // Add some space between the two text elements
  },
  wasteActionTextBlack: {
    fontSize: 10,
    fontWeight: "600",
    color: "#000", // Black color for first text
  },
  wasteActionTextRed: {
    fontSize: 10,
    fontWeight: "600",
    color: "#FF0000", // Red color for second text
  },
});

export default TransactionsDetailsItem;
