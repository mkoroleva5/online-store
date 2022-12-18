import { createContext } from 'react';
import { initialFilterState } from '../../store/filterStore/FilterStore';
import { FilterActionType, FilterStoreState } from '../../store/filterStore/FilterStoreTypes';

export const FilterStateContext = createContext<FilterStoreState>(initialFilterState);
export const FilterDispatchContext = createContext<React.Dispatch<FilterActionType>>(() => {});
