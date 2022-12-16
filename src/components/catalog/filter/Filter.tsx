import { useState } from 'react';
import { Switch } from '../../basic-components/BasicComponents';
import style from './Filter.module.css';

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
