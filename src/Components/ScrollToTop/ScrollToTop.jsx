import React, { useState, useEffect } from 'react';
import './ScrollToTop.css';
import white_arrow from '../../assets/white-arrow.png';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down past 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Smooth scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`scroll-to-top ${isVisible ? 'show' : ''}`} onClick={scrollToTop} title="Scroll to top">
      <img src={white_arrow} alt="Scroll to top" className="arrow-up-icon" />
    </div>
  );
};

export default ScrollToTop;
