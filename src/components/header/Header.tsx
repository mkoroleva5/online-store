/* eslint-disable jsx-a11y/anchor-is-valid */
import style from './Header.module.css';
import logoSource from '../../assets/images/healthy-logo.png';
import cartImg from '../../assets/images/cart.png';

export const Header = () => {
  return (
    <header className={style.headerWrapper}>
      <div className={style.header}>
        <a href="#" className={style.logoWrapper}>
          <img className={style.logo} src={logoSource} alt="Logo" />
          <div className={style.title} />
        </a>
        <div className={style.cartWrapper}>
          <div className={style.total}>
            <div>Итого:</div>
            <div>0</div>
          </div>
          <div className={style.cart}>
            <img className={style.cartImage} src={cartImg} alt="Cart" />
            <div className={style.counter}>0</div>
          </div>
        </div>
      </div>
    </header>
  );
};
