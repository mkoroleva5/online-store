import { Layout, SortBy, SortDirection } from '../../components/catalog/types';

export type FilterActionType =
  | BrandAction
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

interface SearchFieldAction {
  type: 'SEARCH';
  payload: string;
}

interface BrandAction {
  type: 'ADD_BRAND' | 'REMOVE_BRAND';
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

export interface FilterStoreState {
  searchField: string;
  brand: string[] | null;
  product: string[] | null;
  minPrice: number;
  maxPrice: number;
  minStock: number;
  maxStock: number;
  sortBy: SortBy;
  sortDirection: SortDirection;
  display: Layout;
}
