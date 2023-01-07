import style from './Footer.module.css';
import githubLogo from '../../assets/images/github.png';
import rsLogo from '../../assets/images/rs-school.png';

export const Footer = () => {
  return (
    <footer className={style.footerWrapper}>
      <div className={style.footer}>
        <div className={style.githubWrapper}>
          <a
            className={style.githubLink}
            href="https://github.com/MOONcitizenX/"
            target="_blank"
            rel="noreferrer"
          >
            <img className={style.githubLogo} src={githubLogo} alt="GitHub" />
            <div className={style.githubName}>MOONcitizenX</div>
          </a>
          <a
            className={style.githubLink}
            href="https://github.com/mkoroleva5/"
            target="_blank"
            rel="noreferrer"
          >
            <img className={style.githubLogo} src={githubLogo} alt="GitHub" />
            <div className={style.githubName}>mkoroleva5</div>
          </a>
        </div>
        <div className={style.footer}>
          <p>Online store 2022</p>
        </div>
        <a className={style.rsLink} href="https://rs.school/js/" target="_blank" rel="noreferrer">
          <img className={style.rsLogo} src={rsLogo} alt="Rolling Scopes School" />
        </a>
      </div>
    </footer>
  );
};
