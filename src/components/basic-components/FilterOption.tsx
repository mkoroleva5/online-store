import classNames from 'classnames';
import { useContext } from 'react';
import { useDebounce } from '../../hooks/use-debounce';
import { getSearchValue, updateSearchValue } from '../../utils/searchHelpers';
import { FilterState } from '../catalog/filterState';
import style from './FilterOption.module.css';

interface OptionProps {
  value: string;
  id: number;
  filterGroup: 'brand' | 'product';
  quantity: string;
}

const addSearchValueToArray = (searchString: string, toAdd: string) =>
  [...searchString.split('-and-'), toAdd].join('-and-');

const removeSearchValueFromArray = (searchString: string, toRemove: string) =>
  searchString
    .split('-and-')
    .filter((el) => el !== toRemove)
    .join('-and-');

export const FilterOption = ({ value, id, filterGroup, quantity }: OptionProps) => {
  const filterState = useContext(FilterState);
  const filterOptionState = filterState[filterGroup];
  const checked = filterOptionState ? filterOptionState.includes(value) : false;

  const handleCheckBoxChange = useDebounce(
    (
      currentGroup: string | null,
      filterGroupString: 'brand' | 'product',
      isChecked: boolean,
      searchValue: string,
    ) => {
      if (isChecked) {
        if (currentGroup) {
          updateSearchValue(filterGroupString, addSearchValueToArray(currentGroup, searchValue));
        } else {
          updateSearchValue(filterGroupString, searchValue);
        }
      } else if (!isChecked) {
        if (currentGroup) {
          updateSearchValue(
            filterGroupString,
            removeSearchValueFromArray(currentGroup, searchValue),
          );
        }
      }
    },
    200,
  );

  return (
    <div className={classNames(style.option, { [style.optionDisabled]: quantity[0] === '0' })}>
      <input
        className={style.optionInput}
        id={`${filterGroup}-${id}`}
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          const currentGroup = getSearchValue(filterGroup);
          const isChecked = e.target.checked;
          handleCheckBoxChange(currentGroup, filterGroup, isChecked, value);
        }}
      />
      <label className={style.label} htmlFor={`${filterGroup}-${id}`}>
        <div className={style.checkbox} />
        <div className={style.optionLabel}>
          {value} ({quantity})
        </div>
      </label>
    </div>
  );
};
