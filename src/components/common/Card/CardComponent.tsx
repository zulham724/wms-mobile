import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

type CardComponentProps = {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[]; // Add this to accept custom style
};

const CardComponent: React.FC<CardComponentProps> = ({children, style}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    elevation: 2,
  },
});

export default CardComponent;
