import { countItems } from '../../../utils/countItems';
import style from './Matches.module.css';

interface MatchesProps {
  length: number;
}

export const Matches = ({ length }: MatchesProps) => {
  const lastNum = +length.toString().split('').reverse()[0];
  const found = lastNum === 1 && length !== 11 ? 'Найден' : 'Найдено';
  return (
    <div className={style.matches}>
      {length > 0 ? (
        `${found} ${length} ${countItems(length)}`
      ) : (
        <>
          <p className={style.matchesTitle}>Ничего не найдено😥</p>
          <p className={style.matchesMessage}>
            Измените или сбросьте настройки фильтра, чтобы увидеть больше товаров
          </p>
        </>
      )}
    </div>
  );
};
