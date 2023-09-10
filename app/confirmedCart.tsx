import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import useCart from '../store/useCart.store';
import { useRouter } from 'expo-router';
import ConfirmedCard from '../components/ConfirmedCard';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

const confirmedCart = () => {
  const { confirmedCart, resetConfirmedCart } = useCart();
  const router = useRouter();

  const getTotalAmount = () => {
    return confirmedCart.reduce((prev, newVal) => prev + newVal.price, 0);
  };

  const placeCoffeeHandle = () => {
    ToastAndroid.show(
      'Your Coffee will be in a minute !!!',
      ToastAndroid.CENTER
    );
    resetConfirmedCart();
    router.back();
  };

  if (confirmedCart.length === 0) {
    return (
      <View style={styles.cartNotFoundContainer}>
        <Text style={styles.cartNotFoundText}>Please Add some Item ...</Text>
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            }
          }}
        >
          <Ionicons name="arrow-back" size={32} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Animated.View
      entering={FadeInDown}
      style={{
        flex: 1,
      }}
    >
      <FlatList
        style={{
          flex: 1,
        }}
        data={confirmedCart}
        renderItem={({ item: { name, image, price, qty } }) => {
          return (
            <ConfirmedCard name={name} image={image} price={price} qty={qty} />
          );
        }}
        ListFooterComponent={() => {
          return (
            <Text style={styles.listFooterText}>
              Total: Rs. {getTotalAmount()}
            </Text>
          );
        }}
      />
      <TouchableOpacity style={styles.placeBtn} onPress={placeCoffeeHandle}>
        <Text style={styles.placeBtnText}>Place Coffee</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default confirmedCart;

const styles = StyleSheet.create({
  cartNotFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartNotFoundText: {
    fontSize: 16,
    marginBottom: 10,
  },
  listFooterText: {
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'right',
    paddingVertical: 10,
    paddingRight: 15,
  },
  placeBtn: {
    padding: 15,
    backgroundColor: '#1f1000',
    margin: 5,
    borderRadius: 5,
  },
  placeBtnText: {
    color: 'white',
    textAlign: 'center',
  },
});
