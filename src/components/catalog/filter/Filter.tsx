import { useState } from 'react';
import classNames from 'classnames';
import style from './Filter.module.css';
import products from '../../../data/products.json';
import resetIcon from '../../../assets/icons/refresh.svg';
import { SearchField } from '../search/Search';
import { deleteSearchValue } from '../../../utils/searchHelpers';
import { Product } from '../../../data/product';
import { CopyButton } from '../../basic-components/CopyButton';
import { DualSlider } from '../../basic-components/DualSlider';
import { FilterOption } from '../../basic-components/FilterOption';
import arrow from '../../../assets/icons/arrow.svg';

const brands = new Set(products.map((item): string => item.brand).sort());
const productTypes = new Set(products.map((item): string => item.type).sort());
const prices = products
  .map((item): number => parseInt(item.price.toString(), 10))
  .sort((a, b) => a - b);
const stock = products.map((item): number => item.stock).sort((a, b) => a - b);

interface FilteredProducts {
  filteredProducts: Product[];
}

export const Filter = ({ filteredProducts }: FilteredProducts) => {
  const [isOpen, setIsOpen] = useState(false);

  const filteredPrices = filteredProducts
    .map((item): number => parseInt(item.price.toString(), 10))
    .sort((a, b) => a - b);
  const filteredStock = filteredProducts.map((item): number => item.stock).sort((a, b) => a - b);

  const resetFilters = () => {
    deleteSearchValue('search');
    deleteSearchValue('brand');
    deleteSearchValue('product');
    deleteSearchValue('minPrice');
    deleteSearchValue('maxPrice');
    deleteSearchValue('minStock');
    deleteSearchValue('maxStock');
  };

  return (
    <div className={style.filterWrapper}>
      <div className={style.titleBlock}>
        <button
          type="button"
          className={style.titleWrapper}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <span className={style.title}>Фильтры</span>
          <img
            className={classNames(style.arrowImg, { [style.rotate]: isOpen })}
            src={arrow}
            alt="Open/close filters"
          />
        </button>
        <div className={classNames(style.buttonsWrapper, { [style.visible]: isOpen })}>
          <CopyButton />
          <button
            type="button"
            className={style.reset}
            title="Очистить фильтры"
            onClick={resetFilters}
          >
            <img className={style.resetIcon} src={resetIcon} alt="Reset button" />
          </button>
        </div>
      </div>
      <div className={classNames(style.field, { [style.open]: isOpen })}>
        <div className={classNames(style.block, style.searchBlock)}>
          <SearchField />
        </div>
        <div className={style.block}>
          <div className={style.blockTitle}>Цена</div>
          <DualSlider
            min={prices[0]}
            max={prices[prices.length - 1]}
            filteredMin={filteredPrices[0]}
            filteredMax={filteredPrices[filteredPrices.length - 1]}
            sliderGroup="price"
          />
        </div>
        <div className={style.block}>
          <div className={style.blockTitle}>Количество на складе</div>
          <DualSlider
            min={stock[0]}
            max={stock[stock.length - 1]}
            filteredMin={filteredStock[0]}
            filteredMax={filteredStock[filteredStock.length - 1]}
            sliderGroup="stock"
          />
        </div>
        <div className={style.block}>
          <div className={style.blockTitle}>Бренд</div>
          <div className={style.optionsWrapper}>
            {[...brands].map((brand, index) => {
              return (
                <FilterOption
                  key={brand}
                  value={brand}
                  id={index}
                  filterGroup="brand"
                  quantity={`${filteredProducts.filter((el) => el.brand === brand).length}/${
                    products.filter((el) => el.brand === brand).length
                  }`}
                />
              );
            })}
          </div>
        </div>
        <div className={style.block}>
          <div className={style.blockTitle}>Тип продукта</div>
          <div className={style.optionsWrapper}>
            {[...productTypes].map((productType, index) => {
              const filteredInStock = filteredProducts.filter(
                ({ type }) => type === productType,
              ).length;
              const maxStock = products.filter(({ type }) => type === productType).length;
              return (
                <FilterOption
                  key={productType}
                  value={productType}
                  id={index}
                  filterGroup="product"
                  quantity={`${filteredInStock}/${maxStock}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
