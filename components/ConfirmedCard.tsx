import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import useCart from '../store/useCart.store';

const ConfirmedCard = ({
  name,
  price,
  image,
  qty,
}: {
  name: string;
  price: number;
  image: any;
  qty: number;
}) => {
  const { removeFromConfirmedCart } = useCart();

  const removeItemClickHandle = () => {
    removeFromConfirmedCart(name);
  };

  return (
    <Animated.View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.3)',
        paddingRight: 15,
        paddingBottom: 10,
      }}
    >
      <Image
        style={{
          height: 100,
          width: 100,
        }}
        resizeMode="cover"
        source={image}
      />
      <View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            marginBottom: 5,
          }}
        >
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

const styles = StyleSheet.create({});
