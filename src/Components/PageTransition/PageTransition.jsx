import { useEffect, useRef } from 'react';
import './PageTransition.css';

export const PageTransition = ({ children }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.classList.add('fade-in');
    }
  }, []);
  return <div ref={ref} className="page-transition">{children}</div>;
};
