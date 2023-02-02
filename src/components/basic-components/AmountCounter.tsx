import { useContext } from 'react';
import { CartProduct } from '../../data/product';
import { CartStateContext } from '../cartState';
import style from './AmountCounter.module.css';

interface AmountCounterProps {
  id: CartProduct['id'];
}

export const AmountCounter = ({ id }: AmountCounterProps) => {
  const { cartState, dispatch } = useContext(CartStateContext);
  return (
    <div className={style.buttonsWrapper}>
      <button
        className={style.amountButton}
        type="button"
        onClick={() => {
          dispatch({ type: 'DECREASE_PRODUCT', payload: id });
        }}
      >
        -
      </button>
      <div className={style.amount}>{cartState.products[id].amount}</div>
      <button
        className={style.amountButton}
        type="button"
        onClick={() => {
          dispatch({ type: 'INCREASE_PRODUCT', payload: id });
        }}
      >
        +
      </button>
    </div>
  );
};
