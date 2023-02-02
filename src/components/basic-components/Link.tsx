import { ReactNode } from 'react';
import { history } from '../../store/History';

interface LinkProps {
  className?: string;
  href: string;
  children: ReactNode;
}

export const Link = ({ className, href, children }: LinkProps) => {
  return (
    <a
      className={className}
      href={href}
      onClick={(e) => {
        e.preventDefault();
        history.push(href);
      }}
    >
      {children}
    </a>
  );
};
