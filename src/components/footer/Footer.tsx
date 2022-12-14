import style from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={style.footerWrapper}>
      <div className={style.footer}>
        <div className={style.credits}>Online store 2022</div>
      </div>
    </footer>
  );
};
