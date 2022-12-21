import style from './Matches.module.css';

interface MatchesProps {
  length: number;
}
export const Matches = ({ length }: MatchesProps) => {
  let amount;
  const lastNum = +length.toString().split('').reverse()[0];
  if (lastNum === 1 && length !== 11) {
    amount = 'товар';
  } else if ((length < 10 || length > 20) && lastNum > 1 && lastNum < 5) {
    amount = 'товара';
  } else {
    amount = 'товаров';
  }

  const found = lastNum === 1 && length !== 11 ? 'Найден' : 'Найдено';
  return (
    <div className={style.matches}>
      {length > 0 ? `${found} ${length} ${amount}` : 'Ничего не найдено'}
    </div>
  );
};
