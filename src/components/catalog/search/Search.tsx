import style from './Search.module.css';

export const SearchField = () => {
  return (
    <div className={style.searchWrapper}>
      <input type="text" className={style.searchInput} required />
      <span className={style.searchTitle}>Поиск</span>
    </div>
  );
};
