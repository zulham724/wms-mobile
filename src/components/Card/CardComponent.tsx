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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default CardComponent;
