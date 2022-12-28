import { createContext } from 'react';
import { CartProduct } from '../data/product';
import { getLS, localStorageCartStateName } from '../utils/localStorageHelpers';

export interface CartStateProps {
  products: Record<number, CartProduct>;
  promos: string[];
}

export interface CartContext {
  cartState: CartStateProps;
  dispatch: React.Dispatch<unknown>;
}

const savedCartState = getLS(localStorageCartStateName) as CartStateProps;

export const initialCartState: CartStateProps = {
  products: savedCartState?.products ?? [],
  promos: savedCartState?.promos ?? [],
};

export const CartState = createContext<CartContext>({} as CartContext);
