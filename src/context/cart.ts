import { createContext } from 'react';

import { CartItem } from '@/types';

type CartState = {
  addItem: (item: CartItem) => void;
  cartItems: CartItem[];
  formattedSubTotal: string;
  itemCount: number;
  removeItem: (id: string, variant: { size: string; price: number }) => void;
  incrementItemQuantity: (id: string, variant: { size: string; price: number }) => void;
  decrementItemQuantity: (id: string, variant: { size: string; price: number }) => void;
  resetCart: () => void;
  subTotal: number;
};

const CartInitValues = {
  itemCount: 0,
  subTotal: 0,
  formattedSubTotal: '',
  cartItems: [] as CartItem[]
};

const CartContext = createContext<CartState>({
  addItem: (item: CartItem) => {}, // eslint-disable-line
  cartItems: CartInitValues.cartItems,
  formattedSubTotal: CartInitValues.formattedSubTotal,
  itemCount: CartInitValues.itemCount,
  removeItem: (id: string, variant: { size: string; price: number }) => {}, // eslint-disable-line
  incrementItemQuantity: (id: string, variant: { size: string; price: number }) => {},
  decrementItemQuantity: (id: string, variant: { size: string; price: number }) => {},
  resetCart: () => {},
  subTotal: CartInitValues.subTotal
});

export { CartContext };
export type { CartState };
