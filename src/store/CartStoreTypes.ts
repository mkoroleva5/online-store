import { Product } from '../data/product';

export type CartActionType =
  | ProductAction
  | ProductAmountAction
  | CartAction
  | PromosAction
  | ModalAction;

interface ProductAction {
  type: 'ADD_PRODUCT' | 'REMOVE_PRODUCT';
  payload: Product;
}
interface ProductAmountAction {
  type: 'INCREASE_PRODUCT' | 'DECREASE_PRODUCT';
  payload: Product['id'];
}

interface CartAction {
  type: 'CLEAR_CART';
}

interface PromosAction {
  type: 'ADD_PROMO' | 'REMOVE_PROMO';
  payload: string;
}

interface ModalAction {
  type: 'SET_CHECKOUT';
  payload: boolean;
}
