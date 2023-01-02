import { useRef } from 'react';
import { IMaskInput } from 'react-imask';
import style from './CheckoutPage.module.css';

interface CheckoutPageProps {
  onClose: () => void;
}

export const CheckoutPage = ({ onClose }: CheckoutPageProps) => {
  const ref = useRef(null);
  const inputRef = useRef(null);
  /* const phoneMask = IMask(ref, {
    mask: '+{7}(000)000-00-00',
    lazy: false, // make placeholder always visible
    placeholderChar: '#', // defaults to '_'
  }); */

  return (
    <div
      className={style.checkoutPageWrapper}
      onClick={() => onClose()}
      onKeyDown={() => {}}
      role="button"
      tabIndex={0}
    >
      <div
        className={style.checkoutModalWrapper}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onKeyDown={() => {}}
        role="button"
        tabIndex={0}
      >
        <div className={style.modalTitle}>Персональная информация</div>
        <div className={style.inputWrapper}>
          <input className={style.input} type="text" required />
          <span className={style.inputTitle}>Имя и Фамилия</span>
        </div>
        <div className={style.inputWrapper}>
          <IMaskInput
            className={style.input}
            mask="+{375}(00)000-00-00"
            radix="."
            value=""
            lazy={false}
            unmask // true|false|'typed'
            ref={ref}
            inputRef={inputRef} // access to nested input
            // DO NOT USE onChange TO HANDLE CHANGES!
            // USE onAccept INSTEAD
            onAccept={
              // depending on prop above first argument is
              // `value` if `unmask=false`,
              // `unmaskedValue` if `unmask=true`,
              // `typedValue` if `unmask='typed'`
              (value) => console.log(value)
            }
            // ...and more mask props in a guide

            // input props also available
            // placeholder="Enter number here"
          />
          <span className={style.inputTitle}>Телефон</span>
        </div>
        <div className={style.inputWrapper}>
          <input className={style.input} type="text" required />
          <span className={style.inputTitle}>Адрес доставки</span>
        </div>
        <div className={style.inputWrapper}>
          <input className={style.input} type="e-mail" required />
          <span className={style.inputTitle}>E-mail</span>
        </div>

        <div className={style.creditCardDetails}>
          <div className={style.creditCardTitle}>Данные кредитной карты</div>
          <div className={style.creditCard}>
            <div className={style.inputWrapper}>
              <input className={style.input} type="text" required />
              <span className={style.inputTitle}>Номер карты</span>
            </div>
            <div className={style.inputWrapper}>
              <input className={style.input} type="text" required />
              <span className={style.inputTitle}>Годен до</span>
            </div>
            <div className={style.inputWrapper}>
              <input className={style.input} type="text" required />
              <span className={style.inputTitle}>CVV</span>
            </div>
          </div>
        </div>

        <button type="button" className={style.orderButton} onClick={() => {}}>
          Оформить заказ
        </button>
      </div>
    </div>
  );
};
