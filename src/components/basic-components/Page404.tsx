import { history } from '../../store/History';
import buttonStyle from '../catalog/cart/Cart.module.css';
import style from './Page404.module.css';

export const Page404 = () => {
  return (
    <div className={style.wrapper}>
      <p className={style.textError}>404</p>
      <p className={style.text}>Что-то пошло не так 😓</p>
      <button
        type="button"
        className={buttonStyle.catalogButton}
        onClick={() => {
          history.push('/');
        }}
      >
        Перейти в каталог
      </button>
    </div>
  );
};
