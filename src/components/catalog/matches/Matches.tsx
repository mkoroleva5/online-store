import { countItems } from '../../../utils/countItems';
import style from './Matches.module.css';

interface MatchesProps {
  length: number;
}

export const Matches = ({ length }: MatchesProps) => {
  return (
    <div className={style.matches}>
      {length > 0 ? (
        `${countItems(length, ['Найден', 'Найдено', 'Найдено'])} ${length} ${countItems(length, [
          'товар',
          'товаров',
          'товара',
        ])}`
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
