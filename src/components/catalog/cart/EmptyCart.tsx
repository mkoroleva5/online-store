import { history } from '../../../store/filterStore/History';
import style from './Cart.module.css';

export const EmptyCart = () => {
  return (
    <div className={style.empty}>
      <div>Ваша корзина пуста</div>
      <div>
        Исправить это недоразумение очень просто: выберите в каталоге интересующий товар и нажмите
        кнопку «В корзину».
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
  );
};
