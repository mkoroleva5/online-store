import classNames from 'classnames';
import { FilterOption, DualSlider } from '../../basic-components/BasicComponents';
import style from './Filter.module.css';
import products from '../../../data/products.json';
import { SearchField } from '../search/Search';
import { deleteSearchValue } from '../../../utils/searchHelpers';
import { Product } from '../../../data/product';

const brands = new Set(products.map((item): string => item.brand).sort());
const productTypes = new Set(products.map((item): string => item.type).sort());
const prices = products.map((item): number => item.price).sort((a, b) => a - b);
const stock = products.map((item): number => item.stock).sort((a, b) => a - b);

interface FilteredProducts {
  filteredProducts: Product[];
}

export const Filter = ({ filteredProducts }: FilteredProducts) => {
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
        <span className={style.title}>Фильтры</span>{' '}
        <button type="button" className={style.reset} onClick={resetFilters}>
          Сбросить
        </button>
      </div>
      <div className={style.field}>
        <div className={classNames(style.block, style.searchBlock)}>
          <SearchField />
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
            {[...productTypes].map((product, index) => {
              return (
                <FilterOption
                  key={product}
                  value={product}
                  id={index}
                  filterGroup="product"
                  quantity={`${filteredProducts.filter((el) => el.type === product).length}/${
                    products.filter((el) => el.type === product).length
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
