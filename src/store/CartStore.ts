import { CartStateProps } from '../components/cartState';
import { CartProduct } from '../data/product';
import { CartActionType } from './CartStoreTypes';

export const countTotalItems = (productsObj: Record<number, CartProduct>) => {
  return Object.values(productsObj).reduce((acc, item) => acc + item.amount, 0);
};
export const countTotalCost = (productsObj: Record<number, CartProduct>) => {
  return Object.values(productsObj)
    .reduce((acc, item) => acc + item.amount * item.price, 0)
    .toFixed(2);
};

export const cartReducer = (state: CartStateProps, action: CartActionType) => {
  switch (action.type) {
    case 'ADD_PRODUCT': {
      return {
        ...state,
        products: {
          ...state.products,
          [action.payload.id]: { ...action.payload, amount: 1 },
        },
      };
    }
    case 'REMOVE_PRODUCT': {
      const newState = { ...state };
      delete newState.products[action.payload.id];
      return newState;
    }
    case 'INCREASE_PRODUCT': {
      const amount = state.products[action.payload].amount + 1;
      if (amount > state.products[action.payload].stock) {
        return state;
      }
      return {
        ...state,
        products: {
          ...state.products,
          [action.payload]: { ...state.products[action.payload], amount },
        },
      };
    }
    case 'DECREASE_PRODUCT': {
      const amount = state.products[action.payload]?.amount
        ? state.products[action.payload].amount - 1
        : 0;
      if (amount < 1) {
        const newState = { ...state };
        delete newState.products[action.payload];
        return newState;
      }
      return {
        ...state,
        products: {
          ...state.products,
          [action.payload]: { ...state.products[action.payload], amount },
        },
      };
    }
    default:
      return state;
  }
};