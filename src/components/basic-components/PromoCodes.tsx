import { useContext, useState } from 'react';
import classNames from 'classnames';
import { CartState, possiblePromos } from '../cartState';
import style from './PromoCodes.module.css';
import x from '../../assets/icons/x.svg';

export const PromoCodes = () => {
  const { cartState, dispatch } = useContext(CartState);
  const [input, setInput] = useState('');

  const isCorrectPromo = Object.keys(possiblePromos).includes(input);

  const handleCorrectPromoInput = () => {
    if (isCorrectPromo) {
      dispatch({
        type: 'ADD_PROMO',
        payload: input,
      });
      setInput('');
    }
  };

  return (
    <div className={style.promoWrapper}>
      <div className={style.promoInputWrapper}>
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
              handleCorrectPromoInput();
            }
          }}
        />
        <button
          className={classNames(style.submitButton, {
            [style.active]: isCorrectPromo,
          })}
          disabled={!isCorrectPromo}
          type="button"
          onClick={() => {
            handleCorrectPromoInput();
          }}
        >
          Применить
        </button>
      </div>
      {Object.keys(cartState.promos).length > 0 && (
        <div className={style.promocodesWrapper}>
          {Object.entries(cartState.promos).map(([promo, discount]) => (
            <div className={style.promo} key={promo}>
              <p>
                {promo} -{discount}%
              </p>
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
                <img className={style.deleteIcon} src={x} alt="Delete button" />
              </button>
            </div>
          ))}
        </div>
      )}
      <p className={style.hint}>Промокоды для теста: RS, WINTER</p>
    </div>
  );
};
