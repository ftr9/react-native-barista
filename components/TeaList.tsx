import React from 'react';
import TeaCard from './TeaCard';
import { DeviceWidth } from '../constants/Screens';
import { FlatList } from 'react-native-gesture-handler';
import useDroppableArea from '../store/useDroppableArea.store';

import { ITeas } from '../types';

const Teas: ITeas[] = [
  {
    name: 'Cappuccino',
    price: 150,
    image: require('../assets/images/barista/cappuccino.png'),
  },
  {
    name: 'Americano',
    price: 200,
    image: require('../assets/images/barista/americano.png'),
  },
  {
    name: 'Cold Brew',
    price: 350,
    image: require('../assets/images/barista/cold-brew.png'),
  },
  {
    name: 'Cortado',
    price: 150,
    image: require('../assets/images/barista/cortado.png'),
  },
  {
    name: 'Frappe',
    price: 200,
    image: require('../assets/images/barista/frappe.png'),
  },
  {
    name: 'Macchiato',
    price: 300,
    image: require('../assets/images/barista/macchiato.png'),
  },
  {
    name: 'Latte',
    price: 100,
    image: require('../assets/images/barista/latte.png'),
  },
];

const TeaList = () => {
  const { isElementInDropArea } = useDroppableArea();

  return (
    <FlatList
      //if cup is in the plate do not allow user to scroll horizontally
      scrollEnabled={isElementInDropArea ? false : true}
      snapToInterval={DeviceWidth}
      decelerationRate={'fast'}
      snapToAlignment={'center'}
      horizontal
      style={{
        flex: 1,
        zIndex: 100,
      }}
      data={Teas}
      keyExtractor={(_, index) => `${index}`}
      renderItem={({ item }) => <TeaCard {...item} />}
    />
  );
};

export default TeaList;
