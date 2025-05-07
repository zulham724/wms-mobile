import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type ButtonSize = 'small' | 'medium' | 'large';

type ButtonComponentProps = {
  title: string;
  onPress: () => void;
  size?: ButtonSize;
  backgroundColor?: string;
  borderRadius?: number;
  textStyle?: StyleProp<TextStyle>;
  iconName?: string;
  iconColor?: string;
  buttonStyle?: StyleProp<ViewStyle>;
};

const sizeStyles = {
  small: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 12,
    iconSize: 14,
  },
  medium: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    fontSize: 16,
    iconSize: 18,
  },
  large: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    fontSize: 20,
    iconSize: 22,
  },
};

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  title,
  onPress,
  size = 'medium',
  backgroundColor = '#4CAF50',
  borderRadius = 10,
  textStyle,
  iconName,
  iconColor = '#fff',
  buttonStyle,
}) => {
  const currentSize = sizeStyles[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor,
          borderRadius,
          paddingVertical: currentSize.paddingVertical,
          paddingHorizontal: currentSize.paddingHorizontal,
        },
        buttonStyle,
      ]}
      activeOpacity={0.8}>
      <View style={styles.content}>
        {iconName && (
          <Icon
            name={iconName}
            size={currentSize.iconSize}
            color={iconColor}
            style={styles.icon}
          />
        )}
        <Text
          style={[styles.text, {fontSize: currentSize.fontSize}, textStyle]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Roboto-Regular',
  },
});

export default ButtonComponent;
