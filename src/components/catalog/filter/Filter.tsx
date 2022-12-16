import { useState } from 'react';
import { BrandOption, ProductOption, Switch } from '../../basic-components/BasicComponents';
import style from './Filter.module.css';
import products from '../../../data/products.json';

const brands = new Set(products.map((item): string => item.brand).sort());
const productTypes = new Set(products.map((item): string => item.type).sort());

export const Filter = () => {
  const [checked, setChecked] = useState(true);
  return (
    <div className={style.filterWrapper}>
      <div className={style.title}>Фильтры</div>
      <div className={style.field}>
        <div className={`${style.block} ${style.inStock}`}>
          <div className={style.blockTitle}>В наличии</div>
          <Switch isOn={checked} handleToggle={() => setChecked(!checked)} />
        </div>
        <div className={style.block}>
          <div className={style.blockTitle}>Цена</div>
        </div>
        <div className={style.block}>
          <div className={style.blockTitle}>Количество на складе</div>
        </div>
        <div className={style.block}>
          <div className={style.blockTitle}>Бренд</div>
          <div className={style.optionsWrapper}>
            {[...brands].map((item, index) => {
              return <BrandOption key={item} value={item} id={index} />;
            })}
          </div>
        </div>
        <div className={style.block}>
          <div className={style.blockTitle}>Тип продукта</div>
          <div className={style.optionsWrapper}>
            {[...productTypes].map((item, index) => {
              return <ProductOption key={item} value={item} id={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
