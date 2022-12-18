import { useContext, useState } from 'react';
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
}

export const DualSlider = ({ min, max, sliderGroup }: RangesType) => {
  // const [minVal, setMinVal] = useState(min);
  // const [maxVal, setMaxVal] = useState(max);
  const filterState = useContext(FilterState);
  const minVal = filterState[`min${sliderGroup === 'price' ? 'Price' : 'Stock'}`];
  const maxVal = filterState[`max${sliderGroup === 'price' ? 'Price' : 'Stock'}`];

  return (
    <div className={style.sliderWrapper}>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal ?? min}
        onChange={(e) => {
          // const value = Math.min(+event.target.value, maxVal - 1);
          // setMinVal(value);
          updateSearchValue(`min${sliderGroup === 'price' ? 'Price' : 'Stock'}`, e.target.value);
        }}
        className={`${style.thumb} ${style.thumbZindex4} ${
          minVal > max - maxVal ? style.thumbZindex5 : ''
        }`}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal ?? max}
        onChange={(e) => {
          // const value = Math.max(+event.target.value, minVal + 1);
          // setMaxVal(value);
          updateSearchValue(`max${sliderGroup === 'price' ? 'Price' : 'Stock'}`, e.target.value);
        }}
        className={`${style.thumb} ${style.thumbZindex4} ${
          minVal < max - maxVal ? style.thumbZindex5 : ''
        }`}
      />
      <div className={style.slider}>
        <div className={style.sliderTrack} />
        <div className={style.sliderRange} />
        <div className={style.sliderLeftValue}>{minVal}</div>
        <div className={style.sliderRightValue}>{maxVal}</div>
      </div>
    </div>
  );
};
