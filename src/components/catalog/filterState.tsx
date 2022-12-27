import { createContext } from 'react';
import { Layout, SortBy } from './types';

export interface FilterStoreState {
  searchField: string | null;
  brand: string[] | null;
  product: string[] | null;
  minPrice: number | null;
  maxPrice: number | null;
  minStock: number | null;
  maxStock: number | null;
  sort: SortBy;
  display: Layout;
}

export const initialFilterState: FilterStoreState = {
  searchField: null,
  brand: null,
  product: null,
  minPrice: null,
  maxPrice: null,
  minStock: null,
  maxStock: null,
  sort: 'nameup',
  display: 'table',
};

export const FilterState = createContext(initialFilterState);
