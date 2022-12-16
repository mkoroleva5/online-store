import style from './BasicComponents.module.css';

type SwitchProps = {
  isOn: boolean;
  handleToggle: () => void;
};

export const Switch = ({ isOn, handleToggle }: SwitchProps) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className={style.switchCheckbox}
        id="switchNew"
        type="checkbox"
      />
      <label className={`${style.switchLabel} ${isOn ? style.active : ''}`} htmlFor="switchNew">
        <span className={style.switchButton} />
      </label>
    </>
  );
};

interface OptionType {
  value: string;
  id: number;
}
export const BrandOption = ({ value, id }: OptionType) => {
  return (
    <div className={style.option}>
      <input className={style.optionInput} id={`brand-${id}`} type="checkbox" />
      <label className={style.optionLabel} htmlFor={`brand-${id}`}>
        {value}
      </label>
    </div>
  );
};

export const ProductOption = ({ value, id }: OptionType) => {
  return (
    <div className={style.option}>
      <input className={style.optionInput} id={`product-${id}`} type="checkbox" />
      <label className={style.optionLabel} htmlFor={`product-${id}`}>
        {value}
      </label>
    </div>
  );
};
