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
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 16,
            marginBottom: 10,
          }}
        >
          Please Add some Item ...
        </Text>
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
            <Text
              style={{
                fontWeight: '400',
                fontSize: 14,
                textAlign: 'right',
                paddingVertical: 10,
                paddingRight: 15,
              }}
            >
              Total: Rs. {getTotalAmount()}
            </Text>
          );
        }}
      />
      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: '#1f1000',
          margin: 5,
          borderRadius: 5,
        }}
        onPress={placeCoffeeHandle}
      >
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
          }}
        >
          Place Coffee
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default confirmedCart;

const styles = StyleSheet.create({});
