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

/*

interface SearchFieldAction {
  type: 'SEARCH';
  payload: string;
}

interface CategoryAction {
  type: 'ADD_PRODTYPE' | 'REMOVE_PRODTYPE';
  payload: string;
}

interface MinPriceAction extends PayloadNum {
  type: 'MIN_PRICE';
}

interface MaxPriceAction extends PayloadNum {
  type: 'MAX_PRICE';
}

interface MinStockAction extends PayloadNum {
  type: 'MIN_STOCK';
}

interface MaxStockAction extends PayloadNum {
  type: 'MAX_STOCK';
}

interface SortByAction {
  type: 'SORT_BY';
  payload: SortBy;
}

interface SortDirectionAction {
  type: 'SORT_DIRECTION';
  payload: SortDirection;
}

interface DisplayAction {
  type: 'DISPLAY';
  payload: Layout;
}
*/
