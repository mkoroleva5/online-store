import { Product } from '../data/product';

export type CartActionType = ProductAction | ProductAmountAction;

interface ProductAction {
  type: 'ADD_PRODUCT' | 'REMOVE_PRODUCT';
  payload: Product;
}
interface ProductAmountAction {
  type: 'INCREASE_PRODUCT' | 'DECREASE_PRODUCT';
  payload: Product['id'];
}
