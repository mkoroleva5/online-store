import { useContext, useState } from 'react';
import { countTotalCost, countTotalItems } from '../../../store/CartStore';
import { countItems } from '../../../utils/countItems';
import { CartState } from '../../cartState';
import style from './Cart.module.css';
import { CartProductCard } from './CartProductCard';
import { CheckoutPage } from './CheckoutPage';
import { EmptyCart } from './EmptyCart';

export const Cart = () => {
  const { cartState } = useContext(CartState);
  const totalCost = countTotalCost(cartState.products);
  const totalItems = countTotalItems(cartState.products);
  const [isCheckout, setIsCheckout] = useState(false);

  return (
    <>
      {isCheckout && <CheckoutPage />}
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
                {Object.values(cartState.products).map((item, index) => {
                  return <CartProductCard key={item.id} item={item} index={index + 1} />;
                })}
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
              <button
                type="button"
                className={style.orderButton}
                onClick={() => {
                  setIsCheckout(true);
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
