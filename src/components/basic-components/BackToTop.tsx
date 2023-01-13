import { useEffect, useState } from 'react';
import style from './BackToTop.module.css';
import arrow from '../../assets/icons/arrow.svg';

export const BackToTop = () => {
  const [isBackToTop, setIsBackToTop] = useState(false);

  const listenerIsBackToTop = () => {
    setIsBackToTop(window.scrollY > 200);
  };

  const scrollUp = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', listenerIsBackToTop, { passive: true });

    return () => {
      window.removeEventListener('scroll', listenerIsBackToTop);
    };
  }, []);

  return (
    <div>
      {isBackToTop && (
        <a href="#top" onClick={scrollUp}>
          <div className={style.container}>
            <img src={arrow} alt="Arrow" className={style.arrow} />
          </div>
        </a>
      )}
    </div>
  );
};
