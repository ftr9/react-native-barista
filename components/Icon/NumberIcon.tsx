import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface INumberIcon {
  children: React.ReactNode;
}

////Loop through each child element and check if there is icon element
const hasIconElement = (children: React.ReactNode) => {
  let hasIcon = false;
  React.Children.forEach(children, child => {
    const element = child as React.ReactElement;
    if (element.type === Ionicons) {
      hasIcon = true;
    }
  });
  return hasIcon;
};

const NumberIcon = ({ children }: INumberIcon) => {
  if (hasIconElement(children)) {
    return (
      <View
        style={{
          position: 'relative',
        }}
      >
        {children}
      </View>
    );
  }

  throw new Error('There is no Icon Element from @expo/vector-icons');
};

function NumberDisplay({ count }: { count: number }) {
  return (
    <View style={styles.numberDisplayContainer}>
      <Text style={styles.numberDiplayText}>{count}</Text>
    </View>
  );
}

NumberIcon.NumberDisplay = NumberDisplay;
export default NumberIcon;

const styles = StyleSheet.create({
  numberDisplayContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 15,
    width: 15,
    borderRadius: 10,
    backgroundColor: '#1f1000',
    position: 'absolute',
    right: -10,
    top: -8,
  },
  numberDiplayText: {
    fontSize: 10,
    color: 'white',
  },
});
