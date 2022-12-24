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
import { parsePathname } from '../../utils/pathnameHelpers';
import { CategoriesMenu } from './categoriesMenu/CategoriesMenu';
import { ProductPage } from './productPage/ProductPage';
import { Cart } from './cart/Cart';

export const Catalog = () => {
  const [filterState, setFilterState] = useState(initialFilterState);
  const [categoryPath, setCategoryPath] = useState('/');
  const [isProductPageView, setIsProductPageView] = useState(false);

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
    const pathChunksInitial = parsePathname(history.location.pathname);

    setCategoryPath(pathChunksInitial[0]);
    if (pathChunksInitial.length < 2) {
      setIsProductPageView(false);
    } else if (pathChunksInitial.length === 2) {
      setIsProductPageView(true);
    }
    updateFilterState();

    const unlisten = history.listen(({ location }) => {
      const pathChunks = parsePathname(location.pathname);
      setCategoryPath(pathChunks[0]);

      if (pathChunks.length < 2) {
        setIsProductPageView(false);
      } else if (pathChunks.length === 2) {
        setIsProductPageView(true);
      }

      updateFilterState();
    });

    return () => {
      unlisten();
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((el) => {
      return (
        (categoryPath ? el.catPath === categoryPath : el) &&
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
  }, [filterState, categoryPath]);

  const product = products.find((el) => el.id === +parsePathname(history.location.pathname)[1]);

  // const { cartState, setCartState } = useContext(CartState);

  const isCartOpen = categoryPath === 'cart';

  return (
    <FilterState.Provider value={filterState}>
      <main className={style.main}>
        <div className={style.mainWrapper}>
          {isCartOpen && <Cart />}
          {!isCartOpen && isProductPageView && product && <ProductPage product={product} />}
          {!isCartOpen && !isProductPageView && (
            <>
              <Filter filteredProducts={filteredProducts} />
              <section className={style.catalogWrapper}>
                <CategoriesMenu products={products} activeCategory={categoryPath} />
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
                        path={`/${item.catPath}/${item.id}`}
                      />
                    );
                  })}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </FilterState.Provider>
  );
};
