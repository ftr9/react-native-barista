import { Image, StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import TeaList from '../components/TeaList';
import DropPlateArea from '../components/DropPlateArea';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AddToCart from '../components/AddToCart';

const MainPage = () => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <DropPlateArea />
      <TeaList />
      <AddToCart />
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({});
