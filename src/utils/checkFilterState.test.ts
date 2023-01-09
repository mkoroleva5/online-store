import { FilterStoreState } from '../components/catalog/filterState';
import { checkFilterState } from './checkFilterState';

const state: FilterStoreState = {
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

describe('checkFilterState', () => {
  it('Returns false when state is empty', () => {
    expect(checkFilterState({ ...state })).toBe(false);
  });
  it('Returns true when state includes brand', () => {
    expect(checkFilterState({ ...state, brand: [] })).toBe(true);
  });
  it('Returns true when state includes minPrice', () => {
    expect(checkFilterState({ ...state, minPrice: 1 })).toBe(true);
  });
});
