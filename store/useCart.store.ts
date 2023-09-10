import { create } from 'zustand';

import { ICartInProduct, ITeas } from '../types';
interface Iusecart {
  selectedProduct: null | ITeas;
  setActiveSelectedProduct: (product: ITeas) => void;
  removeActiveSelectedProduct: () => void;
  confirmedCart: ICartInProduct[];
  addToConfirmedCart: (product: ICartInProduct) => void;
  removeFromConfirmedCart: (productName: string) => void;
  resetConfirmedCart: () => void;
}

const useCart = create<Iusecart>(set => {
  return {
    selectedProduct: null,
    confirmedCart: [],
    addToConfirmedCart: product => {
      set(state => {
        const newState = { ...state };
        newState.confirmedCart.push(product);
        return newState;
      });
    },

    removeFromConfirmedCart: productName => {
      set(state => {
        const newState = { ...state };
        newState.confirmedCart = newState.confirmedCart.filter(
          product => product.name !== productName
        );
        return newState;
      });
    },

    resetConfirmedCart: () => {
      set(state => {
        const newState = { ...state };
        newState.confirmedCart = [];
        return newState;
      });
    },

    setActiveSelectedProduct: product => {
      set(state => {
        const newState = { ...state };
        newState.selectedProduct = product;
        return newState;
      });
    },
    removeActiveSelectedProduct: () => {
      set(state => {
        const newState = { ...state };
        newState.selectedProduct = null;
        return newState;
      });
    },
  };
});

export default useCart;
