import { createContext } from 'react';
import { CartProduct } from '../data/product';

export interface CartStateProps {
  totalItems: number;
  totalCost: number;
  products: CartProduct[];
}

export const initialCartState: CartStateProps = {
  totalItems: 0,
  totalCost: 0,
  products: [],
};

export const CartState = createContext(null);
