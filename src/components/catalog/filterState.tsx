import { createContext } from 'react';
import { FilterStoreState } from '../../store/filterStore/FilterStoreTypes';

export const initialFilterState: FilterStoreState = {
  searchField: '',
  brand: [],
  product: [],
  minPrice: null,
  maxPrice: null,
  minStock: null,
  maxStock: null,
  sortBy: 'name',
  sortDirection: 'asc',
  display: 'table',
};

export const FilterState = createContext(initialFilterState);
