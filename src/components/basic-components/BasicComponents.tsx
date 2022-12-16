import { useRef, useState } from 'react';
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

interface OptionType {
  value: string;
  id: number;
}

export const BrandOption = ({ value, id }: OptionType) => {
  return (
    <div className={style.option}>
      <input className={style.optionInput} id={`brand-${id}`} type="checkbox" />
      <label className={style.optionLabel} htmlFor={`brand-${id}`}>
        {value}
      </label>
    </div>
  );
};

export const ProductOption = ({ value, id }: OptionType) => {
  return (
    <div className={style.option}>
      <input className={style.optionInput} id={`product-${id}`} type="checkbox" />
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

  const minValRef = useRef(null);
  const maxValRef = useRef(null);

  return (
    <div className={style.sliderWrapper}>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        onChange={(event) => {
          const value = Math.min(+event.target.value, maxVal - 1);
          setMinVal(value);
          event.target.value = value.toString();
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
        ref={maxValRef}
        onChange={(event) => {
          const value = Math.max(+event.target.value, minVal + 1);
          setMaxVal(value);
          event.target.value = value.toString();
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
