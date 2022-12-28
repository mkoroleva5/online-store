import { createContext } from 'react';
import { CartProduct } from '../data/product';
import { CartActionType } from '../store/CartStoreTypes';

export interface CartStateProps {
  products: Record<number, CartProduct>;
  promos: string[];
}

export interface CartContext {
  cartState: CartStateProps;
  dispatch: React.Dispatch<CartActionType>;
}

export const initialCartState: CartStateProps = {
  products: [],
  promos: [],
};

export const CartState = createContext<CartContext>({} as CartContext);
