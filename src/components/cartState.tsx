import { createContext } from 'react';
import { CartProduct } from '../data/product';

export interface CartStateProps {
  totalItems: number;
  totalCost: number;
  products: CartProduct[];
}

export interface CartContext {
  cartState: CartStateProps;
  dispatch: React.Dispatch<any>;
}

export const initialCartState: CartStateProps = {
  totalItems: 0,
  totalCost: 0,
  products: [],
};

export const CartState = createContext<CartContext>({} as CartContext);
