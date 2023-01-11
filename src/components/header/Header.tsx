import { useContext } from 'react';
import style from './Header.module.css';
import logoSource from '../../assets/images/healthy-logo.png';
import cartIcon from '../../assets/icons/cart.svg';
import { history } from '../../store/History';
import { CartStateContext } from '../cartState';
import { countTotalCost, countTotalCostDiscount, countTotalItems } from '../../store/CartStore';

export const Header = () => {
  const { cartState } = useContext(CartStateContext);
  const totalCost = countTotalCost(cartState.products);
  const totalItems = countTotalItems(cartState.products);
  const totalCostDiscounted = countTotalCostDiscount(
    +totalCost,
    Object.values(cartState.promos).reduce((acc, it) => acc + it, 0),
  );

  return (
    <header className={style.headerWrapper}>
      <div className={style.header}>
        <a
          href="/"
          className={style.logoWrapper}
          onClick={(e) => {
            e.preventDefault();
            history.push('/');
          }}
        >
          <img className={style.logo} src={logoSource} alt="Logo" />
          <div className={style.title} />
        </a>
        <div className={style.cartWrapper}>
          <div className={style.total}>
            <div>
              {Number(totalCost) > 0 ? `Итого: ${totalCostDiscounted} BYN` : 'Корзина пуста'}
            </div>
          </div>
          <a
            href="/cart"
            className={style.cart}
            onClick={(e) => {
              e.preventDefault();
              history.push('/cart');
            }}
          >
            <img className={style.cartImage} src={cartIcon} alt="Cart" />
            <div className={style.counter}>{totalItems}</div>
          </a>
        </div>
      </div>
    </header>
  );
};
