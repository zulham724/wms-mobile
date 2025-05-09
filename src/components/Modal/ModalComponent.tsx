import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  View, 
  StyleSheet, 
  TouchableWithoutFeedback, 
  Animated,
  Dimensions,
  Platform,
  KeyboardAvoidingView
} from 'react-native';

const { height } = Dimensions.get('window');

/**
 * GlobalModal - A reusable modal component that can be used across the application
 * 
 * @param {Object} props
 * @param {boolean} props.visible - Controls modal visibility
 * @param {function} props.onClose - Function to call when modal should close
 * @param {React.ReactNode} props.children - Content to render inside the modal
 * @param {string} props.position - Position of modal ('center', 'bottom', 'top')
 * @param {boolean} props.closeOnOverlayPress - Whether clicking overlay closes modal
 * @param {Object} props.containerStyle - Additional styles for the container
 * @param {Object} props.modalStyle - Additional styles for the modal
 * @param {number} props.animationDuration - Duration of animations in ms
 * @param {boolean} props.avoidKeyboard - Whether to avoid keyboard
 * @returns {React.ReactNode}
 */
const GlobalModal = ({
  visible = false,
  onClose = () => {},
  children = null,
  position = 'center',
  closeOnOverlayPress = true,
  containerStyle = {},
  modalStyle = {},
  animationDuration = 300,
  avoidKeyboard = true,
}) => {
  const [modalVisible, setModalVisible] = useState(visible);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(position === 'bottom' ? height : position === 'top' ? -height : 0)).current;
  
  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: animationDuration,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: position === 'bottom' ? height : position === 'top' ? -height : 0,
          duration: animationDuration,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setModalVisible(false);
      });
    }
  }, [visible, fadeAnim, slideAnim, position, animationDuration]);

  const handleOverlayPress = () => {
    if (closeOnOverlayPress && onClose) {
      onClose();
    }
  };

  // Determine position styling
  const getPositionStyle = () => {
    switch (position) {
      case 'top':
        return styles.topModal;
      case 'bottom':
        return styles.bottomModal;
      case 'center':
      default:
        return styles.centerModal;
    }
  };

  // Handle transform for different positions
  const getTransformStyle = () => {
    if (position === 'center') {
      return { opacity: fadeAnim };
    }
    return {
      opacity: fadeAnim,
      transform: [{ translateY: slideAnim }],
    };
  };

  return (
    <Modal
      transparent
      visible={modalVisible}
      onRequestClose={onClose}
      animationType="none"
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
        enabled={avoidKeyboard}
      >
        <TouchableWithoutFeedback onPress={handleOverlayPress}>
          <Animated.View style={[styles.overlay, { opacity: fadeAnim }]} />
        </TouchableWithoutFeedback>
        
        <Animated.View
          style={[
            styles.modalContainer,
            getPositionStyle(),
            getTransformStyle(),
            containerStyle,
          ]}
        >
          <View style={[styles.modalContent, modalStyle]}>
            {children}
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  centerModal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomModal: {
    position: 'absolute',
    bottom: 20,
    width: '90%',
  },
  topModal: {
    position: 'absolute',
    top: 80,
    width: '90%',
  },
});

export default GlobalModal;