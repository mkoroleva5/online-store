/* eslint-disable jsx-a11y/anchor-is-valid */
import style from './Header.module.css';
import logoSource from '../../assets/images/healthy-logo.png';
import cartIcon from '../../assets/icons/cart.svg';

export const Header = () => {
  return (
    <header className={style.headerWrapper}>
      <div className={style.header}>
        <a href="#home" className={style.logoWrapper}>
          <img className={style.logo} src={logoSource} alt="Logo" />
          <div className={style.title} />
        </a>
        <div className={style.cartWrapper}>
          <div className={style.total}>
            <div>Итого:</div>
            <div>0</div>
          </div>
          <div className={style.cart}>
            <img className={style.cartImage} src={cartIcon} alt="Cart" />
            <div className={style.counter}>0</div>
          </div>
        </div>
      </div>
    </header>
  );
};
