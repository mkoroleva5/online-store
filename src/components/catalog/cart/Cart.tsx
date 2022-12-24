import { history } from '../../../store/filterStore/History';
import { countItems } from '../../../utils/countItems';
import { initialCartState } from '../../cartState';
import style from './Cart.module.css';
import { CartProductCard } from './CartProduct';

export const Cart = () => {
  return (
    <section className={style.cartWrapper}>
      {!initialCartState.totalItems ? (
        <div className={style.empty}>
          <div>Ваша корзина пуста</div>
          <div>
            Исправить это недоразумение очень просто: выберите в каталоге интересующий товар и
            нажмите кнопку «В корзину».
          </div>
          <button
            type="button"
            className={style.catalogButton}
            onClick={() => {
              history.push('/');
            }}
          >
            Перейти в каталог
          </button>
        </div>
      ) : (
        <div className={style.fullCartWrapper}>
          <div className={style.itemsWrapper}>
            <div className={style.itemsTitle}>
              В корзине{' '}
              <span className={style.boldText}>
                {initialCartState.totalItems} {countItems(initialCartState.totalItems)}
              </span>{' '}
              на сумму <span className={style.boldText}>{initialCartState.totalCost} BYN</span>:
            </div>
            <div className={style.items}>
              {initialCartState.products.map((item) => {
                return <CartProductCard item={item} />;
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
            <div className={style.total}>Итого: {initialCartState.totalCost} BYN</div>
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
