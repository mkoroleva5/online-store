import { createContext } from 'react';
import { CartProduct } from '../data/product';
import { CartActionType } from '../store/CartStoreTypes';
import { getLS, localStorageCartStateName } from '../utils/localStorageHelpers';

export interface PossiblePromosInt {
  string: number;
}

export const possiblePromos: Record<string, number> = {
  RS: 10,
  WINTER: 15,
};

export interface CartStateProps {
  products: Record<number, CartProduct>;
  promos: Record<string, number>;
}

export interface CartContext {
  cartState: CartStateProps;
  dispatch: React.Dispatch<CartActionType>;
}

const savedCartState = getLS(localStorageCartStateName) as CartStateProps;

export const initialCartState: CartStateProps = {
  products: savedCartState?.products ?? [],
  promos: savedCartState?.promos ?? [],
};

export const CartState = createContext<CartContext>({} as CartContext);
