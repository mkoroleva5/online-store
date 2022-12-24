import style from './Header.module.css';
import logoSource from '../../assets/images/healthy-logo.png';
import cartIcon from '../../assets/icons/cart.svg';
import { history } from '../../store/filterStore/History';

export const Header = () => {
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
            <div>Корзина пуста</div>
          </div>
          <div
            className={style.cart}
            onClick={() => {
              history.push('/cart');
            }}
            onKeyDown={() => {}}
            role="button"
            tabIndex={0}
          >
            <img className={style.cartImage} src={cartIcon} alt="Cart" />
            <div className={style.counter}>0</div>
          </div>
        </div>
      </div>
    </header>
  );
};
