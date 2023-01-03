import { MutableRefObject } from 'react';
import style from './Input.module.css';

interface InputProps {
  type: string;
  pattern: string;
  title: string;
  onChange?: () => void;
  ref?: MutableRefObject<undefined>;
}

export const Input = ({ type, pattern, title, ref, onChange }: InputProps) => {
  return (
    <div className={style.inputWrapper}>
      <input
        className={style.input}
        type={type}
        pattern={pattern}
        ref={ref?.current}
        onChange={onChange}
      />
      <span className={style.inputTitle}>{title}</span>
    </div>
  );
};
