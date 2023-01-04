import IMask from 'imask';
import { useIMask } from 'react-imask';
import { useContext, useRef, useState } from 'react';
import classNames from 'classnames';
import style from './CheckoutPage.module.css';
import world from '../../../assets/images/world.png';
import visa from '../../../assets/images/visa.png';
import mastercard from '../../../assets/images/mastercard.png';
import americanExpress from '../../../assets/images/american-express.png';
import { history } from '../../../store/History';
import { CartState } from '../../cartState';

interface CheckoutPageProps {
  onClose: () => void;
}

export const CheckoutPage = ({ onClose }: CheckoutPageProps) => {
  const { dispatch } = useContext(CartState);
  const [isEmptyName, setIsEmptyName] = useState(true);
  const [isEmptyAddress, setIsEmptyAddress] = useState(true);
  const [isEmptyEmail, setIsEmptyEmail] = useState(true);
  const [isOrdered, setIsOrdered] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);

  const { ref: phone, value: PHONE } = useIMask(
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
        {!isOrdered ? (
          <form
            className={style.formWrapper}
            onSubmit={(e) => {
              e.preventDefault();
              setIsOrdered(true);
              setTimeout(() => {
                setIsOrdered(false);
                dispatch({ type: 'CLEAR_CART' });
                history.push('/');
              }, 5000);
            }}
          >
            <div className={style.modalTitle}>Персональная информация</div>
            <div className={style.inputWrapper}>
              <input
                ref={nameRef}
                className={classNames(style.input, { [style.emptyInput]: isEmptyName })}
                pattern="[a-zA-Zа-яА-Я]{3,}(\s[a-zA-Zа-яА-Я]{3,})+"
                type="text"
                title="Имя должно содержать не менее двух слов, длина каждого не менее 3 символов"
                onChange={(e) => {
                  const { value } = e.target;
                  if (value) {
                    setIsEmptyName(false);
                  } else {
                    setIsEmptyName(true);
                  }
                }}
                required
              />
              <span className={classNames(style.inputTitle, { [style.empty]: isEmptyName })}>
                Имя и Фамилия
              </span>
            </div>
            <div className={style.inputWrapper}>
              <input
                ref={phone}
                className={classNames(style.input, { [style.emptyInput]: !PHONE })}
                pattern="^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9]){7}$"
                type="text"
                title="Номер телефона должен содержать 12 цифр"
                required
              />
              <span className={classNames(style.inputTitle, { [style.empty]: !PHONE })}>
                Телефон
              </span>
            </div>
            <div className={style.inputWrapper}>
              <input
                ref={addressRef}
                className={classNames(style.input, { [style.emptyInput]: isEmptyAddress })}
                pattern="[a-zA-Zа-яА-Я]{5,}\s[a-zA-Zа-яА-Я]{5,}(\s[a-zA-Zа-яА-Я]{5,})+"
                type="text"
                title="Адрес должен содержать не менее трех слов, длина каждого не менее 5 символов"
                onChange={(e) => {
                  const { value } = e.target;
                  if (value) {
                    setIsEmptyAddress(false);
                  } else {
                    setIsEmptyAddress(true);
                  }
                }}
                required
              />
              <span className={classNames(style.inputTitle, { [style.empty]: isEmptyAddress })}>
                Адрес доставки
              </span>
            </div>
            <div className={style.inputWrapper}>
              <input
                ref={emailRef}
                className={classNames(style.input, { [style.emptyInput]: isEmptyEmail })}
                pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
                type="e-mail"
                title="E-mail должен содержать @ и иметь правильный домен"
                onChange={(e) => {
                  const { value } = e.target;
                  if (value) {
                    setIsEmptyEmail(false);
                  } else {
                    setIsEmptyEmail(true);
                  }
                }}
                required
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
                      className={classNames(style.input, { [style.emptyInput]: !CARD })}
                      pattern="[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}"
                      type="text"
                      title="Количество введенных цифр должно быть ровно 16, допускается ввод только цифр"
                      required
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
                      className={classNames(style.input, { [style.emptyInput]: !EXPIRE })}
                      pattern="[0-9]{2}\/[0-9]{2}"
                      type="text"
                      title="Месяц не может быть больше 12, год - меньше 23"
                      required
                    />
                    <span className={classNames(style.inputTitle, { [style.empty]: !EXPIRE })}>
                      Годен до
                    </span>
                  </div>
                  <div className={style.inputWrapper}>
                    <input
                      ref={cvv}
                      className={classNames(style.input, { [style.emptyInput]: !CVV })}
                      pattern="[0-9]{3}"
                      type="text"
                      title="Длина 3 символа, допускается ввод только цифр"
                      required
                    />
                    <span className={classNames(style.inputTitle, { [style.empty]: !CVV })}>
                      CVV
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <input type="submit" className={style.orderButton} value="Оформить заказ" />
          </form>
        ) : (
          <div className={style.orderPageWrapper}>
            <p className={style.orderTitle}>Заказ оформлен!</p>
            <div className={style.userData}>
              <p className={style.userDataTitle}>Информация о заказе:</p>
              <p>
                Имя: <span className={style.userDataItem}>{nameRef.current?.value}</span>
              </p>
              <p>
                Телефон: <span className={style.userDataItem}>{PHONE}</span>
              </p>
              <p>
                E-mail: <span className={style.userDataItem}>{emailRef.current?.value}</span>
              </p>
              <p>
                Адрес доставки:{' '}
                <span className={style.userDataItem}>{addressRef.current?.value}</span>
              </p>
              <p>
                Статус оплаты: <span className={style.userDataPayment}>оплачено</span>
              </p>
            </div>
            <p className={style.additionalInfo}>
              В течение 30 минут менеджер обработает Ваш заказ и свяжется с Вами!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
