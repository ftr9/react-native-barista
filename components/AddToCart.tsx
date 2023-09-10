import { StyleSheet, View, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import useDroppableArea from '../store/useDroppableArea.store';
import Animated, {
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import useCart from '../store/useCart.store';

const AddToCart = () => {
  const [quantity, setQuantity] = useState(0);
  const { isElementInDropArea } = useDroppableArea();
  const opacitySharedValue = useSharedValue(1);
  const { addToConfirmedCart, selectedProduct } = useCart();

  const translateYSharedValue = useSharedValue(0);

  const translateYAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateYSharedValue.value }],
    };
  });

  const opacityAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacitySharedValue.value,
    };
  });

  useEffect(() => {
    if (isElementInDropArea) {
      setQuantity(1);
    } else {
      setQuantity(0);
    }
  }, [isElementInDropArea]);

  const incrementClickHandle = async () => {
    translateYSharedValue.value = withTiming(-4, { duration: 100 });
    opacitySharedValue.value = withTiming(0, { duration: 100 });
    await new Promise(resolve =>
      setTimeout(() => {
        resolve('wait for 200 ms');
      }, 200)
    );

    setQuantity(counter => counter + 1);

    translateYSharedValue.value = withTiming(0, { duration: 100 });
    opacitySharedValue.value = withSequence(withTiming(1, { duration: 100 }));
  };

  const decrementClickHandle = async () => {
    ////1) animate quickly
    translateYSharedValue.value = withTiming(4, { duration: 100 });
    opacitySharedValue.value = withTiming(0, { duration: 100 });

    ////2) wait till the animation completes
    await new Promise(resolve =>
      setTimeout(() => {
        resolve('wait for 200 ms');
      }, 200)
    );

    ////3) update the quanity
    setQuantity(counter => (counter <= 0 ? 0 : counter - 1));

    ////4) animate quantity change
    translateYSharedValue.value = withTiming(0, { duration: 100 });
    opacitySharedValue.value = withSequence(withTiming(1, { duration: 100 }));
  };

  const addToCardClickHandle = () => {
    if (selectedProduct) {
      addToConfirmedCart({
        name: selectedProduct.name,
        price: selectedProduct.price,
        image: selectedProduct.image,
        qty: quantity,
      });
      ToastAndroid.show(`Added ${selectedProduct.name}`, ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.addToCartContainer}>
      <View style={styles.addToCardButtons}>
        <TouchableOpacity onPress={decrementClickHandle}>
          <Ionicons name="remove" size={25} color={'#C0C0C0'} />
        </TouchableOpacity>

        <Animated.Text
          style={[
            opacityAnimatedStyle,
            translateYAnimatedStyle,
            {
              fontSize: 35,
              marginHorizontal: 20,
            },
          ]}
        >
          {quantity}
        </Animated.Text>
        <TouchableOpacity onPress={incrementClickHandle}>
          <Ionicons name="add" size={25} color={'#C0C0C0'} />
        </TouchableOpacity>
      </View>
      {isElementInDropArea && (
        <Animated.View
          onTouchStart={addToCardClickHandle}
          entering={FadeInRight}
          style={styles.addToCartCta}
        >
          <Ionicons name="arrow-forward-outline" size={25} color={'white'} />
        </Animated.View>
      )}
    </View>
  );
};

export default AddToCart;

const styles = StyleSheet.create({
  addToCartContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopColor: 'rgba(0,0,0,0.1)',
    borderTopWidth: 0.5,
  },
  addToCardButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartCta: {
    backgroundColor: '#1f1000',
    paddingHorizontal: 15,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
