import React from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

type ModalStatus = "success" | "error" | "warning";

type ModalComponentProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  animationType?: "none" | "slide" | "fade";
  transparent?: boolean;
  status?: ModalStatus;
  iconName?: string; // optional to override default icon
  title?: string;
  childrenStyle?: object; // New prop for custom children styling
};

const statusConfig: Record<ModalStatus, { icon: string; bgColor: string }> = {
  success: {
    icon: "checkmark",
    bgColor: "#4CAF50",
  },
  error: {
    icon: "close",
    bgColor: "#F44336",
  },
  warning: {
    icon: "warning",
    bgColor: "#FF9800",
  },
};

const ModalComponent: React.FC<ModalComponentProps> = ({
  visible,
  onClose,
  children,
  animationType = "fade",
  transparent = true,
  status,
  iconName,
  title,
  childrenStyle, // Receive the custom style for children
}) => {
  const iconConfig = status ? statusConfig[status] : null;

  return (
    <Modal
      visible={visible}
      animationType={animationType}
      transparent={transparent}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : undefined}
              style={styles.modalContainer}
            >
              {/* Icon Section */}
              {iconConfig && (
                <View
                  style={[styles.iconContainer, { backgroundColor: iconConfig.bgColor }]}
                >
                  <Icon
                    name={iconName || iconConfig.icon}
                    size={30}
                    color="#fff"
                  />
                </View>
              )}

              {title && <Text style={styles.title}>{title}</Text>}
              
              {/* Children Section with Custom Styling */}
              <View style={[styles.childrenContainer, childrenStyle]}>
                {children}
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 5,
    alignItems: "center",
  },
  iconContainer: {
    position: "absolute",
    top: -30,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    // zIndex: 10,
    elevation: 6,
    padding: 10,
  },
  childrenContainer: {
    marginTop: 10,
    width: "100%", // Ensures the children take up the full available space
  },
  title: {
    fontSize: 18,
    marginTop: 12,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
});

export default ModalComponent;
