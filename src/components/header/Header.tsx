import { useContext } from 'react';
import style from './Header.module.css';
import logoSource from '../../assets/images/healthy-logo.png';
import cartIcon from '../../assets/icons/cart.svg';
import { CartStateContext } from '../cartState';
import { countTotalCost, countTotalCostDiscount, countTotalItems } from '../../store/CartStore';
import { formatPrice } from '../../utils/formatPrice';
import { Link } from '../basic-components/Link';

export const Header = () => {
  const { cartState } = useContext(CartStateContext);
  const totalCost = countTotalCost(cartState.products);
  const totalItems = countTotalItems(cartState.products);
  const totalCostDiscounted = formatPrice(
    countTotalCostDiscount(
      +totalCost,
      Object.values(cartState.promos).reduce((acc, it) => acc + it, 0),
    ),
  );

  return (
    <header className={style.headerWrapper}>
      <div className={style.header}>
        <Link className={style.logoWrapper} href="/">
          <img className={style.logo} src={logoSource} alt="Logo" />
        </Link>
        <div className={style.cartWrapper}>
          <div className={style.total}>
            <div>
              {Number(totalCost) > 0 ? `Итого: ${totalCostDiscounted} BYN` : 'Корзина пуста'}
            </div>
          </div>
          <Link className={style.cart} href="/cart">
            <img className={style.cartImage} src={cartIcon} alt="Cart" />
            <div className={style.counter}>{totalItems}</div>
          </Link>
        </div>
      </div>
    </header>
  );
};
