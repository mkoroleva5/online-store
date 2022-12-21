import classNames from 'classnames';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useDebounce } from '../../utils/debounce';
import { getSearchValue, updateSearchValue } from '../../utils/searchHelpers';
import { FilterState } from '../catalog/filterState';
import style from './BasicComponents.module.css';

interface OptionProps {
  value: string;
  id: number;
  filterGroup: 'brand' | 'product';
  quantity: string;
}

export const FilterOption = ({ value, id, filterGroup, quantity }: OptionProps) => {
  const filterState = useContext(FilterState);
  const filterOptionState = filterState[filterGroup];
  const checked = filterOptionState ? filterOptionState.includes(value) : false;
  return (
    <div className={style.option}>
      <input
        className={style.optionInput}
        id={`${filterGroup}-${id}`}
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          const currentGroup = getSearchValue(filterGroup);
          if (e.target.checked) {
            if (currentGroup) {
              updateSearchValue(filterGroup, [...currentGroup.split('-and-'), value].join('-and-'));
            } else {
              updateSearchValue(filterGroup, value);
            }
          } else if (!e.target.checked) {
            if (currentGroup) {
              updateSearchValue(
                filterGroup,
                currentGroup
                  .split('-and-')
                  .filter((el) => el !== value)
                  .join('-and-'),
              );
            }
          }
        }}
      />
      <label className={style.optionLabel} htmlFor={`${filterGroup}-${id}`}>
        {value} ({quantity})
      </label>
    </div>
  );
};

interface RangesType {
  min: number;
  max: number;
  sliderGroup: 'price' | 'stock';
}

export const DualSlider = ({ min, max, sliderGroup }: RangesType) => {
  const filterState = useContext(FilterState);
  const filterMin = sliderGroup === 'price' ? filterState.minPrice : filterState.minStock;
  const filterMax = sliderGroup === 'price' ? filterState.maxPrice : filterState.maxStock;
  const [minVal, setMinVal] = useState(filterMin ?? min);
  const [maxVal, setMaxVal] = useState(filterMax ?? max);

  const updateFilterState = useDebounce((value: number, minmax: string) => {
    updateSearchValue(
      `${minmax}${sliderGroup === 'price' ? 'Price' : 'Stock'}`,
      value.toFixed(2).toString(),
    );
  }, 300);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

  const minPercent = getPercent(minVal);
  const maxPercent = getPercent(maxVal);

  useEffect(() => {
    setMinVal(filterMin ?? min);
  }, [filterMin, min]);

  useEffect(() => {
    setMaxVal(filterMax ?? max);
  }, [filterMax, max]);

  return (
    <div className={style.container}>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target?.value), filterMax ?? maxVal - 1);
          setMinVal(value);
          updateFilterState(value, 'min');
        }}
        className={classNames(style.thumb, style.thumbLeft, {
          [style.thumbTop]: minVal > max - maxVal,
        })}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), filterMin ?? minVal + 1);
          setMaxVal(value);
          updateFilterState(value, 'max');
        }}
        className={classNames(style.thumb, style.thumbRight, {
          [style.thumbTop]: minVal < max - maxVal,
        })}
      />

      <div className={style.slider}>
        <div className={style.sliderTrack} />
        <div
          className={style.sliderRange}
          style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
        />
        <div className={style.sliderLeftValue}>{filterMin || minVal}</div>
        <div className={style.sliderRightValue}>{filterMax || maxVal}</div>
      </div>
    </div>
  );
};
