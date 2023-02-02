import { useContext, useEffect, useState } from 'react';
import { useDebounce } from '../../../hooks/use-debounce';
import { updateSearchValue } from '../../../utils/searchHelpers';
import { FilterState } from '../filterState';
import style from './Search.module.css';

export const SearchField = () => {
  const filterState = useContext(FilterState);
  const [searchVal, setSearchVal] = useState(filterState.searchField ?? '');

  const updateFilterState = useDebounce((value: string) => {
    updateSearchValue('search', value.trim());
  }, 500);

  useEffect(() => {
    setSearchVal(filterState.searchField ?? '');
  }, [filterState.searchField]);

  return (
    <div className={style.searchWrapper}>
      <input
        type="search"
        className={style.searchInput}
        value={searchVal}
        onChange={(event) => {
          const value = event.target?.value;
          setSearchVal(value);
          updateFilterState(value.toLocaleLowerCase());
        }}
        required
      />
      <span className={style.searchTitle}>Поиск</span>
    </div>
  );
};
