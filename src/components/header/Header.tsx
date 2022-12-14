/* eslint-disable jsx-a11y/anchor-is-valid */
import style from './Header.module.css';
import logoSource from '../../assets/images/logo.png';
import cartImg from '../../assets/images/cart.png';

export const Header = () => {
  return (
    <div className={style.header_wrapper}>
      <div className={style.header}>
        <a href="#" className={style.logo_wrapper}>
          <img className={style.logo} src={logoSource} alt="Logo" />
          <div className={style.title}>healthy food</div>
        </a>
        <div className={style.cart_wrapper}>
          <div className={style.total}>
            <div>Итого:</div>
            <div>0</div>
          </div>
          <div className={style.cart}>
            <img className={style.cart_image} src={cartImg} alt="Cart" />
          </div>
        </div>
      </div>
    </div>
  );
};
