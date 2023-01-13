import { createContext } from 'react';
import { CartActionType } from '../store/CartStoreTypes';
import { getLS, localStorageCartStateName } from '../utils/localStorageHelpers';
import { CartState } from './cartStateTypes';

export interface PossiblePromosInt {
  string: number;
}

export const possiblePromos: Record<string, number> = {
  RS: 10,
  WINTER: 15,
};

export interface CartContext {
  cartState: CartState;
  dispatch: React.Dispatch<CartActionType>;
}

const savedCartState = getLS(localStorageCartStateName);

export const initialCartState: CartState = {
  products: savedCartState?.products ?? {},
  promos: savedCartState?.promos ?? {},
  isCheckout: savedCartState?.isCheckout ?? false,
};

export const CartStateContext = createContext<CartContext>({} as CartContext);
