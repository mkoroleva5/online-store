import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import style from './Catalog.module.css';
import { ProductCard } from './productCard/ProductCard';
import products from '../../data/products.json';
import { CatalogMenu } from './sortMenu/CatalogMenu';
import { Filter } from './filter/Filter';
import { history } from '../../store/filterStore/History';
import { getArraySearchValue, getSearchValue } from '../../utils/searchHelpers';
import { FilterState, initialFilterState } from './filterState';
import { Matches } from './matches/Matches';
import { checkFilterState } from '../../utils/checkFilterState';

export const Catalog = () => {
  const [filterState, setFilterState] = useState(initialFilterState);
  const updateFilterState = () => {
    setFilterState((prevState) => {
      const searchFieldState = getSearchValue('search');
      const brandState = getArraySearchValue('brand');
      const productState = getArraySearchValue('product');
      const minPrice = getSearchValue('minPrice');
      const maxPrice = getSearchValue('maxPrice');
      const minStock = getSearchValue('minStock');
      const maxStock = getSearchValue('maxStock');
      const displayState = getSearchValue('display');
      return {
        ...prevState,
        searchField: searchFieldState ?? null,
        brand: brandState,
        product: productState,
        minPrice: minPrice ? +minPrice : null,
        maxPrice: maxPrice ? +maxPrice : null,
        minStock: minStock ? +minStock : null,
        maxStock: maxStock ? +maxStock : null,
        display: displayState === 'list' ? 'list' : 'table',
      };
    });
  };

  useEffect(() => {
    updateFilterState();
  }, []);

  useEffect(() => {
    const unlisten = history.listen(() => {
      updateFilterState();
    });

    return () => {
      unlisten();
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((el) => {
      return (
        (filterState.brand ? filterState.brand.includes(el.brand) : el) &&
        (filterState.product ? filterState.product.includes(el.type) : el) &&
        (filterState.searchField
          ? el.brand.toLowerCase().includes(filterState.searchField) ||
            el.category.toLowerCase().includes(filterState.searchField) ||
            el.description.toLowerCase().includes(filterState.searchField) ||
            el.title.toLowerCase().includes(filterState.searchField) ||
            el.type.toLowerCase().includes(filterState.searchField) ||
            el.price.toString().includes(filterState.searchField)
          : el) &&
        (filterState.minPrice ? el.price > filterState.minPrice : el) &&
        (filterState.maxPrice ? el.price < filterState.maxPrice : el) &&
        (filterState.minStock ? el.stock > filterState.minStock : el) &&
        (filterState.maxStock ? el.stock < filterState.maxStock : el)
      );
    });
  }, [filterState]);

  return (
    <FilterState.Provider value={filterState}>
      <main className={style.main}>
        <div className={style.mainWrapper}>
          <Filter />
          <div className={style.catalogWrapper}>
            <CatalogMenu />
            {checkFilterState(filterState) && <Matches length={filteredProducts.length} />}
            <div
              className={classNames(style.productsWrapper, {
                [style.list]: filterState.display === 'list',
              })}
            >
              {filteredProducts.map((item) => {
                return (
                  <ProductCard
                    key={item.id}
                    title={item.title}
                    price={item.price}
                    preview={item.preview}
                    stock={item.stock}
                    images={item.images}
                    layout={filterState.display}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </FilterState.Provider>
  );
};
