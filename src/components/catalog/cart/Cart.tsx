import { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { countTotalCost, countTotalCostDiscount, countTotalItems } from '../../../store/CartStore';
import { countItems } from '../../../utils/countItems';
import { CartStateContext } from '../../cartState';
import style from './Cart.module.css';
import { CartProductCard } from './CartProductCard';
import { CheckoutPage } from './CheckoutPage';
import { EmptyCart } from './EmptyCart';
import arrowLeft from '../../../assets/icons/chevron-left.svg';
import arrowRight from '../../../assets/icons/chevron-right.svg';
import { history } from '../../../store/History';
import { getSearchValue, updateSearchValue } from '../../../utils/searchHelpers';
import { PromoCodes } from '../../basic-components/PromoCodes';
import { BackToTop } from '../../basic-components/BackToTop';

export const Cart = () => {
  const { cartState, dispatch } = useContext(CartStateContext);

  const checkSearch = useCallback((val: 'page' | 'limit'): string => {
    const defaultValues = {
      page: '1',
      limit: '3',
    };
    const result = getSearchValue(val);
    if (result && +result > 0 && !Number.isNaN(parseInt(result, 10))) return result;
    return defaultValues[val];
  }, []);

  const totalCost = countTotalCost(cartState.products);
  const totalItems = countTotalItems(cartState.products);
  const totalCostDiscounted = countTotalCostDiscount(
    +totalCost,
    Object.values(cartState.promos).reduce((acc, it) => acc + it, 0),
  );

  const [currentPage, setCurrentPage] = useState(() => checkSearch('page'));
  const [cardsPerPage, setCardsPerPage] = useState(() => checkSearch('limit'));
  const [lastPage, setLastPage] = useState(
    Math.ceil(Object.values(cartState.products).length / +cardsPerPage),
  );

  const handleCardsPerPageInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    if (target && +target.value > 0) {
      updateSearchValue('limit', target.value);
    }
  };

  const totalCartProducts = Object.values(cartState.products);

  const pages = [...new Array(Math.ceil(totalCartProducts.length / +cardsPerPage))].map(
    (_, index) => index + 1,
  );

  const allCards = totalCartProducts.map((item, index) => {
    return <CartProductCard key={item.id} item={item} index={index + 1} />;
  });

  useEffect(() => {
    const pageQ = getSearchValue('page');
    const limitQ = getSearchValue('limit');
    if (pageQ) setCurrentPage(checkSearch('page'));
    if (limitQ) setCardsPerPage(checkSearch('limit'));

    const unlisten = history.listen(() => {
      const page = getSearchValue('page');
      const limit = getSearchValue('limit');
      if (page) setCurrentPage(checkSearch('page'));
      if (limit) setCardsPerPage(checkSearch('limit'));
    });
    return unlisten;
  }, [checkSearch]);

  useEffect(() => {
    setLastPage(pages.length);
  }, [pages.length]);

  useEffect(() => {
    if (lastPage < +currentPage) {
      updateSearchValue('page', `${+currentPage - 1}`);
    }
  }, [lastPage, currentPage]);

  return (
    <>
      {cartState.isCheckout && <CheckoutPage />}
      <section className={style.cartWrapper}>
        {!Object.keys(cartState.products).length ? (
          <EmptyCart />
        ) : (
          <div className={style.fullCartWrapper}>
            <div className={style.itemsWrapper}>
              <div>
                В корзине{' '}
                <span className={style.boldText}>
                  {totalItems} {countItems(totalItems)}
                </span>{' '}
                на сумму <span className={style.boldText}>{totalCostDiscounted} BYN</span>:
              </div>
              <div className={style.items}>
                {allCards.slice(
                  +cardsPerPage * +currentPage - +cardsPerPage,
                  +cardsPerPage * +currentPage,
                )}
              </div>
              <BackToTop />
              <div className={style.paginationWrapper}>
                <label className={style.cardsPerPageLabel} htmlFor="cardsPerPage">
                  Отображать на странице:
                  <input
                    className={style.cardsPerPageInput}
                    id="cardsPerPage"
                    type="number"
                    min="1"
                    value={cardsPerPage}
                    onChange={(e) => {
                      handleCardsPerPageInput(e);
                    }}
                  />
                </label>
                <div className={style.pagesWrapper}>
                  <button
                    className={style.switchPageButton}
                    type="button"
                    onClick={() => {
                      if (+currentPage > 1) {
                        const page = getSearchValue('page') ?? currentPage;
                        if (page) {
                          updateSearchValue('page', `${+page - 1}`);
                        } else {
                          updateSearchValue('page', '1');
                        }
                      }
                    }}
                  >
                    <img className={style.arrowImage} src={arrowLeft} alt="Previous page" />
                  </button>
                  <div className={style.pages}>
                    {pages.map((item) => (
                      <button
                        className={classNames(style.pageButton, {
                          [style.activePage]: item === +currentPage,
                        })}
                        key={item}
                        type="button"
                        onClick={() => {
                          updateSearchValue('page', `${item}`);
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <button
                    className={style.switchPageButton}
                    type="button"
                    onClick={() => {
                      if (+currentPage < pages.length) {
                        const page = getSearchValue('page') ?? currentPage;
                        if (page) {
                          updateSearchValue('page', `${+page + 1}`);
                        } else {
                          updateSearchValue('page', '1');
                        }
                      }
                    }}
                  >
                    <img className={style.arrowImage} src={arrowRight} alt="Next page" />
                  </button>
                </div>
              </div>
            </div>
            <div className={style.totalWrapper}>
              <PromoCodes />
              <div className={style.totalCostWrapper}>
                <div>Итого: </div>
                <div className={style.total}>
                  <p
                    className={classNames({
                      [style.crossed]: Object.keys(cartState.promos).length > 0,
                    })}
                  >
                    {totalCost} BYN
                  </p>
                  {Object.keys(cartState.promos).length > 0 && <p>{totalCostDiscounted} BYN</p>}
                </div>
              </div>
            </div>
            <div className={style.orderWrapper}>
              <button
                type="button"
                className={style.orderButton}
                onClick={() => {
                  dispatch({ type: 'SET_CHECKOUT', payload: true });
                }}
              >
                Оформить заказ
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};
