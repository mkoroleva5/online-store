import { createContext } from 'react';
import { CartProduct } from '../data/product';

export interface CartStateProps {
  products: Record<number, CartProduct>;
  promos: string[];
}

export interface CartContext {
  cartState: CartStateProps;
  dispatch: React.Dispatch<unknown>;
}

export const initialCartState: CartStateProps = {
  products: [],
  promos: [],
};

export const CartState = createContext<CartContext>({} as CartContext);
