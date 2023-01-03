import { useRef } from 'react';
import { IMaskInput } from 'react-imask';
import { Input } from '../../basic-components/Input';
import style from './CheckoutPage.module.css';

/* const dateMask = () => {
    return {
      mask: Date, // enable date mask
      // other options are optional
      pattern: 'MM/YY', // Pattern mask with defined blocks, default is 'd{.}`m{.}`Y'
      // you can provide your own blocks definitions, default blocks for date mask are:
      blocks: {
        MM: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
          maxLength: 2,
        },
        YY: {
          mask: IMask.MaskedRange,
          from: 2023,
          to: 9999,
        },
      },
    };
  }; */

interface CheckoutPageProps {
  onClose: () => void;
}

export const CheckoutPage = ({ onClose }: CheckoutPageProps) => {
  const ref = useRef(null);
  const inputRef = useRef(null);

  const CVVRef = useRef();
  const handleCVVChange = (element: HTMLInputElement) => {
    console.log(element);
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
        <div className={style.modalTitle}>Персональная информация</div>
        <Input type="text" pattern="[a-zA-Z]{3,}(\s[a-zA-Z]{3,})+" title="Имя и Фамилия" />

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
        <Input
          type="text"
          pattern="[a-zA-Z]{5,}\s[a-zA-Z]{5,}(\s[a-zA-Z]{5,})+"
          title="Адрес доставки"
        />
        <Input
          type="e-mail"
          pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
          title="E-mail"
        />

        <div className={style.creditCardDetails}>
          <div className={style.creditCardTitle}>Данные кредитной карты</div>
          <div className={style.creditCard}>
            <Input
              type="text"
              pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
              title="Номер карты"
            />

            <div className={style.creditNumbersWrapper}>
              <Input type="text" pattern="[0-9][0-9]/[0-9][0-9]" title="Годен до" />
              <Input
                type="text"
                pattern="[0-9]{3}"
                title="CVV"
                ref={CVVRef}
                onChange={() => {
                  if (CVVRef.current) handleCVVChange(CVVRef);
                }}
              />
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
