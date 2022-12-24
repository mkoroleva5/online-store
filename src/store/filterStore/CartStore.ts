import { CartStateProps } from '../../components/cartState';
import { CartProduct } from '../../data/product';
import { CartActionType } from './CartStoreTypes';

const countTotalItems = (products: CartProduct[]) => {
  return products.length;
};

const countTotalCost = (products: CartProduct[]) => {
  return products.reduce((prev, cur) => prev + cur.price, 0);
};

export const cartReducer = (state: CartStateProps, action: CartActionType) => {
  switch (action.type) {
    case 'ADD_PRODUCT': {
      const products = [...state.products, { ...action.payload, amount: 1 }];
      return {
        ...state,
        totalItems: countTotalItems(products),
        totalCost: countTotalCost(products),
        products,
      };
    }
    default:
      return state;
  }
};

/* case 'SEARCH':
      return {
        ...state,
        searchField: action.payload,
      };
    case 'ADD_BRAND':
      return {
        ...state,
        brand: [...state.brand, action.payload],
      };
    case 'REMOVE_BRAND':
      return {
        ...state,
        brand: state.brand.filter((el) => el !== action.payload),
      };
    case 'ADD_PRODTYPE':
      return {
        ...state,
        prodType: [...state.prodType, action.payload],
      };
    case 'REMOVE_PRODTYPE':
      return {
        ...state,
        prodType: state.prodType.filter((el) => el !== action.payload),
      };
    case 'MIN_PRICE':
      return {
        ...state,
        minPrice: action.payload,
      };
    case 'MAX_PRICE':
      return {
        ...state,
        maxPrice: action.payload,
      };
    case 'MIN_STOCK':
      return {
        ...state,
        minStock: action.payload,
      };
    case 'MAX_STOCK':
      return {
        ...state,
        maxStock: action.payload,
      };
    case 'SORT_BY':
      return {
        ...state,
        sortBy: action.payload,
      };
    case 'SORT_DIRECTION':
      return {
        ...state,
        sortDirection: action.payload,
      };
    case 'DISPLAY':
      return {
        ...state,
        display: action.payload,
      }; */
