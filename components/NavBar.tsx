import { StyleSheet, Image, View } from 'react-native';
import React from 'react';
import NumberIcon from './Icon/NumberIcon';
import { Ionicons } from '@expo/vector-icons';
import useCart from '../store/useCart.store';
import { router } from 'expo-router';

const NavBar = () => {
  const { confirmedCart } = useCart();
  return (
    <View style={styles.navBarContainer}>
      <Image
        resizeMode={'cover'}
        style={{
          height: 80,
          width: 80,
        }}
        source={require('../assets/images/icon.png')}
      />
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <NumberIcon>
          <Ionicons
            onPress={e => {
              router.push('/confirmedCart');
            }}
            name="cube-outline"
            size={24}
          />
          <NumberIcon.NumberDisplay count={confirmedCart.length} />
        </NumberIcon>
      </View>
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  navBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 15,
  },
});
