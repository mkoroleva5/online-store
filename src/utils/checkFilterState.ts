import { FilterStoreState } from '../components/catalog/filterState';

export const checkFilterState = (state: FilterStoreState) => {
  if (
    state.brand ||
    state.maxPrice ||
    state.maxStock ||
    state.minPrice ||
    state.minStock ||
    state.product ||
    state.searchField
  )
    return true;
  return false;
};
