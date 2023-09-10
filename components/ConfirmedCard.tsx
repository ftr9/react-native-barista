import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import useCart from '../store/useCart.store';
import { ICartInProduct } from '../types';

const ConfirmedCard = ({ name, price, image, qty }: ICartInProduct) => {
  const { removeFromConfirmedCart } = useCart();

  const removeItemClickHandle = () => {
    removeFromConfirmedCart(name);
  };

  return (
    <Animated.View style={styles.confirmedCardContainer}>
      <Image
        style={styles.confirmedCardImg}
        resizeMode="cover"
        source={image}
      />
      <View>
        <Text style={styles.confirmedCardText}>
          {name} ({qty})
        </Text>
        <Text>Rs. {price}</Text>
      </View>
      <TouchableOpacity
        style={{
          marginLeft: 'auto',
        }}
        onPress={removeItemClickHandle}
      >
        <Ionicons name="trash" size={18} color="black" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ConfirmedCard;

const styles = StyleSheet.create({
  confirmedCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    paddingRight: 15,
    paddingBottom: 10,
  },
  confirmedCardImg: {
    height: 100,
    width: 100,
  },
  confirmedCardText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
});
