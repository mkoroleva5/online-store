import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { getSearchValue, updateSearchValue } from '../../utils/searchHelpers';
import { FilterState } from '../catalog/filterState';
import style from './BasicComponents.module.css';

type SwitchProps = {
  isOn: boolean;
  handleToggle: () => void;
};

export const Switch = ({ isOn, handleToggle }: SwitchProps) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className={style.switchCheckbox}
        id="switchNew"
        type="checkbox"
      />
      <label className={`${style.switchLabel} ${isOn ? style.active : ''}`} htmlFor="switchNew">
        <span className={style.switchButton} />
      </label>
    </>
  );
};

interface OptionProps {
  value: string;
  id: number;
  filterGroup: 'brand' | 'product';
}

export const FilterOption = ({ value, id, filterGroup }: OptionProps) => {
  const filterState = useContext(FilterState);
  return (
    <div className={style.option}>
      <input
        className={style.optionInput}
        id={`${filterGroup}-${id}`}
        type="checkbox"
        checked={filterState[filterGroup]?.includes(value)}
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
        {value}
      </label>
    </div>
  );
};

interface RangesType {
  min: number;
  max: number;
  sliderGroup: 'price' | 'stock';
  onChange: ({ min, max }: { min: number; max: number }) => void;
}

export const DualSlider = ({ min, max, sliderGroup, onChange }: RangesType) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className={style.container}>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
          updateSearchValue(
            `min${sliderGroup === 'price' ? 'Price' : 'Stock'}`,
            value.toFixed(2).toString(),
          );
        }}
        className={`${style.thumb} ${style.thumbLeft} ${
          minVal > max - maxVal ? style.thumbTop : ''
        }`}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
          updateSearchValue(
            `max${sliderGroup === 'price' ? 'Price' : 'Stock'}`,
            value.toFixed(2).toString(),
          );
        }}
        className={`${style.thumb} ${style.thumbRight} ${
          minVal < max - maxVal ? style.thumbTop : ''
        }`}
      />

      <div className={style.slider}>
        <div className={style.sliderTrack} />
        <div ref={range} className={style.sliderRange} />
        <div className={style.sliderLeftValue}>{minVal}</div>
        <div className={style.sliderRightValue}>{maxVal}</div>
      </div>
    </div>
  );
};
