import style from './Input.module.css';

type InputProps = {
  title: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ title, value, ...rest }: InputProps) => {
  return (
    <div className={style.inputWrapper}>
      <input className={style.input} value={value} {...rest} />
      <span className={style.inputTitle}>{title}</span>
    </div>
  );
};
