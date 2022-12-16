import { useState } from 'react';
import style from './Filter.module.css';

type Props = {
  isOn: boolean;
  handleToggle: () => void;
};

const Switch = ({ isOn, handleToggle }: Props) => {
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

export const Filter = () => {
  const [checked, setChecked] = useState(true);
  return (
    <div className={style.filterWrapper}>
      <div className={style.title}>Фильтры</div>
      <div className={style.field}>
        <div className={`${style.option} ${style.inStock}`}>
          <div className={style.optionTitle}>В наличии</div>
          <Switch isOn={checked} handleToggle={() => setChecked(!checked)} />
        </div>
        <div className={style.option}>
          <div className={style.optionTitle}>Цена</div>
        </div>
        <div className={style.option}>
          <div className={style.optionTitle}>Количество на складе</div>
        </div>
        <div className={style.option}>
          <div className={style.optionTitle}>Бренд</div>
        </div>
        <div className={style.option}>
          <div className={style.optionTitle}>Тип продукта</div>
        </div>
      </div>
    </div>
  );
};
