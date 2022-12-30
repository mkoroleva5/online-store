import style from './CheckoutPage.module.css';

export const CheckoutPage = () => {
  return (
    <div className={style.checkoutPageWrapper}>
      <div className={style.checkoutModalWrapper}>
        <div className={style.modalTitle}>Персональная информация</div>
        <div className={style.inputWrapper}>
          <input className={style.input} type="text" required />
          <span className={style.inputTitle}>Имя и Фамилия</span>
        </div>
        <div className={style.inputWrapper}>
          <input className={style.input} type="text" required />
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
