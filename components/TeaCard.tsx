import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { DeviceWidth } from '../constants/Screens';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  withTiming,
} from 'react-native-reanimated';
import useDroppableArea from '../store/useDroppableArea.store';
import useCart from '../store/useCart.store';

interface ITeaCard {
  name: string;
  image: any;
  price: number;
}

const TeaCard = ({ name, image, price }: ITeaCard) => {
  const imageYPos = useSharedValue(0);
  const [EndPosition, setEndPosition] = useState(0);
  const [isCupInDroppableArea, setCupInDroppableArea] = useState(false);

  const {
    droppableZonePlateYPos,
    droppableZoneYPos,
    setElementInDropAreaStatus,
  } = useDroppableArea();

  const { setActiveSelectedProduct, removeActiveSelectedProduct } = useCart();

  const imageYPosStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: imageYPos.value }],
    };
  });

  ////1.3) - when local state is updated then update global update
  useEffect(() => {
    if (isCupInDroppableArea) {
      //add to cart
      setActiveSelectedProduct({ name, image, price });
    } else {
      //remove from cart
      removeActiveSelectedProduct();
    }
    setElementInDropAreaStatus(isCupInDroppableArea);
  }, [isCupInDroppableArea]);

  const pan = Gesture.Pan()

    .onChange(e => {
      imageYPos.value = e.translationY + EndPosition;

      /*
      //1) - this global store update code makes animation weired ❌❌❌
      if (e.absoluteY > droppableZoneYPos) {
        runOnJS(setElementInDropAreaStatus)(true);
      } else {
        runOnJS(setElementInDropAreaStatus)(false);
      }*/

      //1.1) - to solve above problem - update local state and only update global update function using useEffect

      if (e.absoluteY > droppableZoneYPos) {
        runOnJS(setCupInDroppableArea)(true);
      } else {
        runOnJS(setCupInDroppableArea)(false);
      }
    })
    .onFinalize(e => {
      if (e.absoluteY > droppableZoneYPos) {
        const finalPosition = droppableZonePlateYPos + droppableZoneYPos - 50;
        imageYPos.value = withTiming(finalPosition, { duration: 200 });
        runOnJS(setEndPosition)(finalPosition);
      } else {
        imageYPos.value = withTiming(0, { duration: 200 });
        runOnJS(setEndPosition)(0);
      }
    });

  return (
    <View style={styles.teaCardContainer}>
      <GestureDetector gesture={pan}>
        <Animated.Image
          style={[imageYPosStyle, styles.teaImage]}
          source={image}
          resizeMode="cover"
        />
      </GestureDetector>

      <Text style={styles.teaName}>{name}</Text>
      <Text style={styles.teaPrice}>{price} Rs</Text>
    </View>
  );
};

export default TeaCard;

const styles = StyleSheet.create({
  teaCardContainer: {
    width: DeviceWidth,
    padding: 5,
    display: 'flex',
    alignItems: 'center',
  },
  teaImage: {
    position: 'relative',
    height: 150,
    width: 150,
    zIndex: 1000,
  },
  teaName: {
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 15,
    marginBottom: 10,
    color: '#1f1000',
    zIndex: 1,
  },
  teaPrice: {
    fontWeight: '400',
    fontSize: 18,
    zIndex: 1,
  },
});
