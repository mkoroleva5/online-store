import { useContext, useState } from 'react';
import { history } from '../../store/filterStore/History';
import { getSearchValue, updateSearchValue } from '../../utils/searchHelpers';
import { FilterDispatchContext, FilterStateContext } from '../catalog/filterState';
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
}

export const BrandOption = ({ value, id }: OptionProps) => {
  const filterState = useContext(FilterStateContext);
  const filterDispatch = useContext(FilterDispatchContext);
  return (
    <div className={style.option}>
      <input
        className={style.optionInput}
        id={`brand-${id}`}
        type="checkbox"
        checked={filterState.brand.includes(value)}
        onChange={(e) => {
          const currentBrands = getSearchValue('brand');
          if (e.target.checked) {
            if (currentBrands) {
              updateSearchValue('brand', [...currentBrands.split('-or-'), value].join('-or-'));
            } else {
              updateSearchValue('brand', value);
            }
          } else if (!e.target.checked) {
            if (currentBrands) {
              updateSearchValue(
                'brand',
                currentBrands
                  .split('-or-')
                  .filter((el) => el !== value)
                  .join('-or-'),
              );
            }
          }
        }}
      />
      <label className={style.optionLabel} htmlFor={`brand-${id}`}>
        {value}
      </label>
    </div>
  );
};

export const ProductOption = ({ value, id }: OptionProps) => {
  const filterState = useContext(FilterStateContext);
  const filterDispatch = useContext(FilterDispatchContext);
  return (
    <div className={style.option}>
      <input
        className={style.optionInput}
        id={`product-${id}`}
        type="checkbox"
        checked={filterState.prodType.includes(value)}
        onChange={(e) => {
          if (e.target.checked) {
            filterDispatch({
              type: 'ADD_PRODTYPE',
              payload: value,
            });
          } else {
            filterDispatch({
              type: 'REMOVE_PRODTYPE',
              payload: value,
            });
          }
        }}
      />
      <label className={style.optionLabel} htmlFor={`product-${id}`}>
        {value}
      </label>
    </div>
  );
};

interface RangesType {
  min: number;
  max: number;
  onChange: boolean;
}

export const DualSlider = ({ min, max, onChange }: RangesType) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  return (
    <div className={style.sliderWrapper}>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(+event.target.value, maxVal - 1);
          setMinVal(value);
        }}
        className={`${style.thumb} ${style.thumbZindex4} ${
          minVal > max - maxVal ? style.thumbZindex5 : ''
        }`}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(+event.target.value, minVal + 1);
          setMaxVal(value);
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
