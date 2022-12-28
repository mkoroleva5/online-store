import { CartStateProps } from '../components/cartState';
import { CartProduct } from '../data/product';
import { setLS } from '../utils/localStorageHelpers';
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
      const newState = {
        ...state,
        products: {
          ...state.products,
          [action.payload.id]: { ...action.payload, amount: 1 },
        },
      };
      setLS('healthy_food_cart_state', newState);
      return newState;
    }
    case 'REMOVE_PRODUCT': {
      const newState = { ...state };
      delete newState.products[action.payload.id];
      setLS('healthy_food_cart_state', newState);

      return newState;
    }
    case 'INCREASE_PRODUCT': {
      const amount = state.products[action.payload].amount + 1;
      if (amount > state.products[action.payload].stock) {
        return state;
      }
      const newState = {
        ...state,
        products: {
          ...state.products,
          [action.payload]: { ...state.products[action.payload], amount },
        },
      };
      setLS('healthy_food_cart_state', newState);
      return newState;
    }
    case 'DECREASE_PRODUCT': {
      const amount = state.products[action.payload]?.amount
        ? state.products[action.payload].amount - 1
        : 0;
      if (amount < 1) {
        const newState = { ...state };
        delete newState.products[action.payload];
        setLS('healthy_food_cart_state', newState);
        return newState;
      }
      const newState = {
        ...state,
        products: {
          ...state.products,
          [action.payload]: { ...state.products[action.payload], amount },
        },
      };
      setLS('healthy_food_cart_state', newState);
      return newState;
    }
    default:
      setLS('healthy_food_cart_state', state);
      return state;
  }
};
