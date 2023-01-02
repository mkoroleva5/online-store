import { useContext, useState } from 'react';
import { CartState, possiblePromos } from '../cartState';
import style from './PromoCodes.module.css';
import trashIcon from '../../assets/icons/trash.svg';

export const PromoCodes = () => {
  const { cartState, dispatch } = useContext(CartState);
  const [input, setInput] = useState('');

  return (
    <div>
      <label htmlFor="promo">Промокод:</label>
      <input
        className={style.promoInput}
        type="text"
        id="promo"
        value={input}
        onChange={(e) => {
          const { value } = e.target;
          setInput(value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (Object.keys(possiblePromos).includes(input)) {
              dispatch({
                type: 'ADD_PROMO',
                payload: input,
              });
              setInput('');
            }
          }
        }}
      />
      <button
        className={style.submitButton}
        disabled={!Object.keys(possiblePromos).includes(input)}
        type="button"
        onClick={() => {
          if (Object.keys(possiblePromos).includes(input)) {
            dispatch({
              type: 'ADD_PROMO',
              payload: input,
            });
            setInput('');
          }
        }}
      >
        Применить
      </button>
      {Object.keys(cartState.promos).length > 0 && (
        <div>
          {Object.keys(cartState.promos).map((promo) => (
            <div key={promo}>
              <p>{promo}</p>
              <button
                type="button"
                className={style.deleteButton}
                onClick={() => {
                  dispatch({
                    type: 'REMOVE_PROMO',
                    payload: promo,
                  });
                }}
              >
                <img className={style.deleteIcon} src={trashIcon} alt="Delete button" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
