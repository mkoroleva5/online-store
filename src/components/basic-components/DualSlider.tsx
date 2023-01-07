import classNames from 'classnames';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/use-debounce';
import { updateSearchValue } from '../../utils/searchHelpers';
import { FilterState } from '../catalog/filterState';
import style from './DualSlider.module.css';

interface RangesType {
  min: number;
  max: number;
  filteredMin: number;
  filteredMax: number;
  sliderGroup: 'price' | 'stock';
}

export const DualSlider = ({ min, max, filteredMin, filteredMax, sliderGroup }: RangesType) => {
  const sliderName = sliderGroup[0].toUpperCase() + sliderGroup.slice(1);
  const filterState = useContext(FilterState);

  let filterMin = sliderGroup === 'price' ? filterState.minPrice : filterState.minStock;
  let filterMax = sliderGroup === 'price' ? filterState.maxPrice : filterState.maxStock;
  if (filterMin && filterMax) {
    if (filterMin > max && filterMax < min) {
      filterMin = (filteredMax ?? filterMax ?? max) - 1;
      filterMax = (filteredMin ?? filterMin ?? min) + 1;
    }
  }
  if (filterMin) {
    if (filterMin < min) filterMin = min;
    else if (filterMin > max) filterMin = (filteredMax ?? filterMax ?? max) - 1;
  }
  if (filterMax) {
    if (filterMax > max) filterMax = max;
    else if (filterMax < min) filterMax = (filteredMin ?? filterMin ?? min) + 1;
  }
  const [minVal, setMinVal] = useState(filteredMin ?? filterMin ?? min);
  const [maxVal, setMaxVal] = useState(filteredMax ?? filterMax ?? max);

  const updateFilterState = useDebounce((value: number, minmax: string) => {
    updateSearchValue(`${minmax}${sliderName}`, value.toFixed(0));
  }, 300);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

  const minPercent = getPercent(minVal);
  const maxPercent = getPercent(maxVal);

  useEffect(() => {
    setMinVal(filterMin ?? filteredMin ?? min);
  }, [filteredMin, filterMin, min]);

  useEffect(() => {
    setMaxVal(filterMax ?? filteredMax ?? max);
  }, [filteredMax, filterMax, max]);

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
