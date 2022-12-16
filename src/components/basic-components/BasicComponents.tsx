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
