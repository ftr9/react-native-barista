import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { DeviceWidth } from '../constants/Screens';
import useDroppableArea from '../store/useDroppableArea.store';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const DropPlateArea = () => {
  const {
    updateDroppableZonePlateYPos,
    updateDroppableZoneYPos,
    isElementInDropArea,
  } = useDroppableArea();

  const plateScaleVal = useSharedValue(1);
  const iconScaleVal = useSharedValue(1);

  const plateScaleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: plateScaleVal.value }],
    };
  });

  const iconScaleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: iconScaleVal.value }],
    };
  });

  useEffect(() => {
    ////if element is in droppable area reduce scale value of pointer and plate
    if (isElementInDropArea) {
      iconScaleVal.value = withTiming(0, { duration: 200 });
      plateScaleVal.value = withTiming(0.8, { duration: 200 });
    } else {
      iconScaleVal.value = withTiming(1, { duration: 200 });
      plateScaleVal.value = withTiming(1, { duration: 200 });
    }
  }, [isElementInDropArea]);

  return (
    <View
      onLayout={e => {
        updateDroppableZoneYPos(e.nativeEvent.layout.y);
      }}
      style={styles.droppableZonecontainer}
    >
      {/**Text and icon */}
      <Animated.View
        style={[iconScaleAnimatedStyle, styles.droppableZoneTextAndIcon]}
      >
        <Text style={styles.droppableZoneText}>Drag your Cup</Text>
        <Ionicons name={'arrow-down'} size={34} color={'#C0C0C0'} />
      </Animated.View>

      {/**Plate image */}
      <Animated.Image
        onLayout={e => {
          updateDroppableZonePlateYPos(e.nativeEvent.layout.y);
        }}
        style={[
          plateScaleAnimatedStyle,
          {
            width: 280,
          },
        ]}
        source={require('../assets/images/barista/plate.png')}
        resizeMode="contain"
      />
    </View>
  );
};

export default DropPlateArea;

const styles = StyleSheet.create({
  droppableZonecontainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(0,0,0,0.15)',
    bottom: 15,
    zIndex: -1,
    elevation: -15,
    width: DeviceWidth,
  },
  droppableZoneTextAndIcon: {
    alignItems: 'center',
    marginTop: 20,
  },
  droppableZoneText: {
    fontWeight: '500',
    color: '#C0C0C0',
    fontSize: 16,
  },
});
