import React, { useEffect, useState } from 'react'
import './Hero.css'
import dark_arrow from '../../assets/dark-arrow.png'
import white_arrow from '../../assets/white-arrow.png'
import { Link } from 'react-scroll'

const phrases = [
  'Where Health Meets Hope',
  'Education Builds Futures',
  'Communities Grow Together',
  'Change Starts With You',
];

const Hero = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = phrases[phraseIndex];
    const speed = isDeleting ? 50 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(current.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        if (charIndex + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayed(current.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <div className='hero container' id='hero'>
      <div className="hero-text">
        <p className="hero-eyebrow">Debipur Disha Seva Sanstha</p>
        <h1>Together for a</h1>
        <h2>Better Tomorrow</h2>
        <p className="hero-typewriter">
          <span className="typed-text">{displayed}</span>
          <span className="cursor">|</span>
        </p>
        <div className="hero-btns">
          <Link to='program' smooth={true} offset={-260} duration={500} className='btn hero-primary-btn'>
            Explore Programs <img src={dark_arrow} alt="" />
          </Link>
          <a href='#donate' className='btn hero-donate-btn'>
            ❤️ Donate Now <img src={white_arrow} alt="" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Hero
