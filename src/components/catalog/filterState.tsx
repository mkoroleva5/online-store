import { createContext } from 'react';
import { FilterStoreState } from '../../store/filterStore/FilterStoreTypes';

export const initialFilterState: FilterStoreState = {
  searchField: '',
  brand: [],
  product: [],
  minPrice: 0,
  maxPrice: 10,
  minStock: 0,
  maxStock: 10,
  sortBy: 'name',
  sortDirection: 'asc',
  display: 'table',
};

export const FilterState = createContext(initialFilterState);
