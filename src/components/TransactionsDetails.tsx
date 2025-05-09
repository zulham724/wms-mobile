import React, { useCallback, useRef } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import CardComponent from "./Card/CardComponent";
import BadgeComponent from "./Badge/BadgeComponent";
import BottomSheet from "./BottomSheet/BottomSheetComponent";
import TransactionDetailsSheet from "./TransactionDetailSheet";

interface BadgeProps {
  status: "success" | "error" | "warning" | "info" | "default";
  label: string;
}

const SolidBadge: React.FC<BadgeProps> = ({ status, label }) => {
  return (
    <BadgeComponent
      status={status}
      label={label}
      variant="solid"
      customContainerStyle={{
        padding: 10,
        width: "31%",
      }}
      customTextStyle={{ textAlign: "center", fontSize: 10, fontWeight: 400 }}
    />
  );
};

const OutlineBadge: React.FC<BadgeProps> = ({ status, label }) => {
  return (
    <BadgeComponent
      status={status}
      label={label}
      variant="outline"
      customContainerStyle={{
        padding: 10,
        width: "31%",
      }}
      customTextStyle={{ textAlign: "center", fontSize: 10, fontWeight: 400 }}
    />
  );
};

const TransactionsDetails = ({
  onOpenTransaction,
}: {
  onOpenTransaction: () => void;
}) => {
  const [isBottomSheetVisible, setBottomSheetVisible] = React.useState(false);

  //   const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  return (
    <View style={styles.container}>
      {/* Adjusted Search and Filter Row */}

      <Pressable onPress={() => {
        console.log("onOpenTransaction transactions");
        onOpenTransaction();
      }}>
        <CardComponent style={styles.card}>
          <View style={styles.badgeContainer}>
            <View style={styles.wasteActionStart}>
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
            <SolidBadge status="success" label="Hazardous " />
            <SolidBadge status="success" label="Medical Waste" />
            <SolidBadge status="success" label="Unsegregated " />
            <OutlineBadge status="default" label="Cold Storage" />
            <OutlineBadge status="default" label="Stored" />
            <OutlineBadge status="default" label="258,259 kg" />
            <View style={styles.wasteActionEnd}>
              <Text style={styles.wasteActionTextBlack}>Waste Action End:</Text>
              <Text style={styles.wasteActionTextRed}>
                13 May 2025 12:00:00 PM
              </Text>
            </View>
          </View>
        </CardComponent>
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

export default TransactionsDetails;
