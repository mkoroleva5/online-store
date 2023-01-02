import { Product } from '../data/product';

export type CartActionType = ProductAction | ProductAmountAction | PromosAction;

interface ProductAction {
  type: 'ADD_PRODUCT' | 'REMOVE_PRODUCT';
  payload: Product;
}
interface ProductAmountAction {
  type: 'INCREASE_PRODUCT' | 'DECREASE_PRODUCT';
  payload: Product['id'];
}

interface PromosAction {
  type: 'ADD_PROMO' | 'REMOVE_PROMO';
  payload: string;
}
