import IMask from 'imask';
import { useIMask } from 'react-imask';
import { useState } from 'react';
import classNames from 'classnames';
import style from './CheckoutPage.module.css';
import world from '../../../assets/images/world.png';
import visa from '../../../assets/images/visa.png';
import mastercard from '../../../assets/images/mastercard.png';
import americanExpress from '../../../assets/images/american-express.png';

interface CheckoutPageProps {
  onClose: () => void;
}

export const CheckoutPage = ({ onClose }: CheckoutPageProps) => {
  const { ref: phone, unmaskedValue: PHONE } = useIMask(
    {
      mask: '+{375}(00)000-00-00',
      radix: '.',
      lazy: true,
      unmask: true,
    },
    {
      onAccept: () => {},
    },
  );

  const { ref: card, unmaskedValue: CARD } = useIMask(
    {
      mask: '0000 0000 0000 0000',
      radix: '.',
      lazy: true,
      unmask: true,
    },
    {
      onAccept: () => {},
    },
  );

  const { ref: expire, unmaskedValue: EXPIRE } = useIMask(
    {
      radix: '.',
      mask: 'MM/YY',
      blocks: {
        MM: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
          maxLength: 2,
        },
        YY: {
          mask: IMask.MaskedRange,
          from: 23,
          to: 99,
        },
      },
      lazy: true,
      unmask: true,
    },
    {
      onAccept: () => {},
    },
  );

  const { ref: cvv, typedValue: CVV } = useIMask(
    {
      mask: '000',
      radix: '.',
      lazy: true,
      unmask: true,
    },
    {
      onAccept: () => {},
    },
  );

  const changePaymentSystem = (digit: string) => {
    if (digit === '3') return americanExpress;
    if (digit === '4') return visa;
    if (digit === '5') return mastercard;
    return world;
  };

  const [isEmptyName, setIsEmptyName] = useState(true);
  const [isEmptyAddress, setIsEmptyAddress] = useState(true);
  const [isEmptyEmail, setIsEmptyEmail] = useState(true);

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
        <form className={style.formWrapper}>
          <div className={style.modalTitle}>Персональная информация</div>
          <div className={style.inputWrapper}>
            <input
              className={style.input}
              pattern="[a-zA-Zа-яА-Я]{3,}(\s[a-zA-Zа-яА-Я]{3,})+"
              type="text"
              onChange={(e) => {
                const { value } = e.target;
                if (value) {
                  setIsEmptyName(false);
                } else {
                  setIsEmptyName(true);
                }
              }}
            />
            <span className={classNames(style.inputTitle, { [style.empty]: isEmptyName })}>
              Имя и Фамилия
            </span>
          </div>
          <div className={style.inputWrapper}>
            <input
              ref={phone}
              className={style.input}
              pattern="^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9]){7}$"
              type="text"
            />
            <span className={classNames(style.inputTitle, { [style.empty]: !PHONE })}>Телефон</span>
          </div>
          <div className={style.inputWrapper}>
            <input
              className={style.input}
              pattern="[a-zA-Zа-яА-Я]{5,}\s[a-zA-Zа-яА-Я]{5,}(\s[a-zA-Zа-яА-Я]{5,})+"
              type="text"
              onChange={(e) => {
                const { value } = e.target;
                if (value) {
                  setIsEmptyAddress(false);
                } else {
                  setIsEmptyAddress(true);
                }
              }}
            />
            <span className={classNames(style.inputTitle, { [style.empty]: isEmptyAddress })}>
              Адрес доставки
            </span>
          </div>
          <div className={style.inputWrapper}>
            <input
              className={style.input}
              pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
              type="e-mail"
              onChange={(e) => {
                const { value } = e.target;
                if (value) {
                  setIsEmptyEmail(false);
                } else {
                  setIsEmptyEmail(true);
                }
              }}
            />
            <span className={classNames(style.inputTitle, { [style.empty]: isEmptyEmail })}>
              E-mail
            </span>
          </div>

          <div className={style.creditCardDetails}>
            <div className={style.creditCardTitle}>Данные кредитной карты</div>
            <div className={style.creditCard}>
              <div className={style.creditNumberWrapper}>
                <div className={style.paymentSystem}>
                  <img
                    className={style.paymentSystemLogo}
                    src={changePaymentSystem(CARD[0])}
                    alt="Payment system"
                  />
                </div>
                <div className={style.inputWrapper}>
                  <input
                    ref={card}
                    className={style.input}
                    pattern="[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}"
                    type="text"
                  />
                  <span className={classNames(style.inputTitle, { [style.empty]: !CARD })}>
                    Номер карты
                  </span>
                </div>
              </div>

              <div className={style.creditDataWrapper}>
                <div className={style.inputWrapper}>
                  <input
                    ref={expire}
                    className={style.input}
                    pattern="[0-9]{2}\/[0-9]{2}"
                    type="text"
                  />
                  <span className={classNames(style.inputTitle, { [style.empty]: !EXPIRE })}>
                    Годен до
                  </span>
                </div>
                <div className={style.inputWrapper}>
                  <input ref={cvv} className={style.input} pattern="[0-9]{3}" type="text" />
                  <span className={classNames(style.inputTitle, { [style.empty]: !CVV })}>CVV</span>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className={style.orderButton} onClick={() => {}}>
            Оформить заказ
          </button>
        </form>
      </div>
    </div>
  );
};
