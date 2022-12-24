import { Layout, SortBy, SortDirection } from '../../components/catalog/types';

export type CartActionType =
  | ProductAction
  | CategoryAction
  | MinPriceAction
  | MaxPriceAction
  | MinStockAction
  | MaxStockAction
  | SortByAction
  | SortDirectionAction
  | DisplayAction
  | SearchFieldAction;

interface PayloadNum {
  payload: number;
}

interface ProductAction {
  type: 'ADD_PROCUCT' | 'REMOVE_PRODUCT';
  payload: string;
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
