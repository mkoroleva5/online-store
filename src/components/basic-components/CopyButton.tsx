import classNames from 'classnames';
import { useState } from 'react';
import style from './CopyButton.module.css';
import copyIcon from '../../assets/icons/copy.svg';
import doneIcon from '../../assets/icons/check.svg';

export const CopyButton = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      type="button"
      className={classNames(style.copy, { [style.active]: isActive })}
      title="Скопировать фильтры"
      onClick={() => {
        setIsActive(true);
        navigator.clipboard.writeText(window.location.href);
        setTimeout(() => {
          setIsActive(false);
        }, 1000);
      }}
    >
      <img className={style.copyIcon} src={copyIcon} alt="Copy button" />
      <img className={style.doneIcon} src={doneIcon} alt="Done button" />
    </button>
  );
};
