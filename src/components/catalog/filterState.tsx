import { createContext } from 'react';
import { FilterStoreState } from '../../store/filterStore/FilterStoreTypes';

export const initialFilterState: FilterStoreState = {
  searchField: null,
  brand: null,
  product: null,
  minPrice: null,
  maxPrice: null,
  minStock: null,
  maxStock: null,
  sortBy: 'name',
  sortDirection: 'asc',
  display: 'table',
};

export const FilterState = createContext(initialFilterState);
