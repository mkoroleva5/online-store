import { useState } from 'react';
import { FilterOption, DualSlider, Switch } from '../../basic-components/BasicComponents';
import style from './Filter.module.css';
import products from '../../../data/products.json';

const brands = new Set(products.map((item): string => item.brand).sort());
const productTypes = new Set(products.map((item): string => item.type).sort());
const prices = products.map((item): number => item.price).sort((a, b) => a - b);
const stock = products.map((item): number => item.stock).sort((a, b) => a - b);

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
          <DualSlider min={prices[0]} max={prices[prices.length - 1]} sliderGroup="price" />
        </div>
        <div className={style.block}>
          <div className={style.blockTitle}>Количество на складе</div>
          <DualSlider min={stock[0]} max={stock[stock.length - 1]} sliderGroup="stock" />
        </div>
        <div className={style.block}>
          <div className={style.blockTitle}>Бренд</div>
          <div className={style.optionsWrapper}>
            {[...brands].map((brand, index) => {
              return <FilterOption key={brand} value={brand} id={index} filterGroup="brand" />;
            })}
          </div>
        </div>
        <div className={style.block}>
          <div className={style.blockTitle}>Тип продукта</div>
          <div className={style.optionsWrapper}>
            {[...productTypes].map((product, index) => {
              return (
                <FilterOption key={product} value={product} id={index} filterGroup="product" />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
