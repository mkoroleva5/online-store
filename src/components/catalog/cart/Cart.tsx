import { ChangeEvent, useContext, useState } from 'react';
import classNames from 'classnames';
import { countTotalCost, countTotalItems } from '../../../store/CartStore';
import { countItems } from '../../../utils/countItems';
import { CartState } from '../../cartState';
import style from './Cart.module.css';
import { CartProductCard } from './CartProductCard';
import { EmptyCart } from './EmptyCart';
import arrowLeft from '../../../assets/icons/chevron-left.svg';
import arrowRight from '../../../assets/icons/chevron-right.svg';

export const Cart = () => {
  const { cartState } = useContext(CartState);
  const totalCost = countTotalCost(cartState.products);
  const totalItems = countTotalItems(cartState.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(3);

  const handleCardsPerPageInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    if (target) {
      setCardsPerPage(+target.value);
      setCurrentPage(1);
    }
  };

  const totalCartProducts = Object.values(cartState.products);

  const pages = [...new Array(Math.ceil(totalCartProducts.length / cardsPerPage))].map(
    (_, index) => index + 1,
  );

  const allCards = totalCartProducts.map((item, index) => {
    return <CartProductCard key={item.id} item={item} index={index + 1} />;
  });

  return (
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
              на сумму <span className={style.boldText}>{totalCost} BYN</span>:
            </div>
            <div className={style.items}>
              {allCards.slice(
                cardsPerPage * currentPage - cardsPerPage,
                cardsPerPage * currentPage,
              )}
            </div>
          </div>
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
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
              >
                <img className={style.arrowImage} src={arrowLeft} alt="Previous page" />
              </button>
              <div className={style.pages}>
                {pages.map((item) => (
                  <button
                    className={classNames(style.pageButton, {
                      [style.activePage]: item === currentPage,
                    })}
                    key={item}
                    type="button"
                    onClick={() => {
                      setCurrentPage(item);
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
                  if (currentPage < pages.length) setCurrentPage(currentPage + 1);
                }}
              >
                <img className={style.arrowImage} src={arrowRight} alt="Next page" />
              </button>
            </div>
          </div>
          <div className={style.totalWrapper}>
            <form className={style.promo}>
              <label htmlFor="promo">Промокод:</label>
              <input className={style.promoInput} type="text" id="promo" />
              <button className={style.submitButton} type="submit">
                Применить
              </button>
            </form>
            <div className={style.total}>Итого: {totalCost} BYN</div>
          </div>
          <div className={style.orderWrapper}>
            <button type="button" className={style.orderButton} onClick={() => {}}>
              Оформить заказ
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
