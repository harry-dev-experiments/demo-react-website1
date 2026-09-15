import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './Navbar.css'
import logo from '../../assets/logo.png'
import menu_icon from '../../assets/menu-icon.png'
import { Link as ScrollLink } from 'react-scroll';
import ComingSoonPopup from '../Popup/ComingSoonPopup';

const navLinks = [
  { id: 'hero',           label: 'Home',         offset: 0 },
  { id: 'leadership',     label: 'Leadership',   offset: -260 },
  { id: 'program',        label: 'Program',      offset: -260 },
  { id: 'about',          label: 'About us',     offset: -150 },
  { id: 'vision-mission', label: 'Vision',       offset: -260 },
  { id: 'campus',         label: 'Our Works',    offset: -260 },
  { id: 'testimonials',   label: 'Testimonials', offset: -260 },
  { id: 'blog',           label: 'Blog',         offset: -260 },
  { id: 'volunteer',      label: 'Volunteer',    offset: -260 },
];

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  // Sticky header handling
  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section observer for active link highlighting (home only)
  useEffect(() => {
    if (!isHome) return;
    const sectionIds = navLinks.map(l => l.id).concat(['contact']);
    const observers = [];
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [isHome]);

  const toggleMenu = () => setMobileMenu(prev => !prev);

  // Navigate to a section, handling cross‑page case
  const handleNav = (id) => {
    if (!isHome) {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenu(false);
  };

  return (
    <React.Fragment>
      <nav className={`container ${sticky || !isHome ? 'dark-nav' : ''}`}>
        <a href="/">
          <img src={logo} alt="Logo" className='logo' />
        </a>
        <ul className={mobileMenu ? '' : 'hide-mobile-menu'}>
          {navLinks.map(link => (
            <li key={link.id}>
              {isHome ? (
                <ScrollLink
                  to={link.id}
                  smooth={true}
                  offset={link.offset}
                  duration={500}
                  className={activeSection === link.id ? 'active-link' : ''}
                  onClick={() => setMobileMenu(false)}
                  style={{ cursor: 'pointer' }}
                >
                  {link.label}
                </ScrollLink>
              ) : (
                <button
                  onClick={() => handleNav(link.id)}
                  className={activeSection === link.id ? 'active-link' : ''}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit', color: 'inherit' }}
                >
                  {link.label}
                </button>
              )}
            </li>
          ))}
          <li>
            {isHome ? (
              <ScrollLink
                to='contact'
                smooth={true}
                offset={-260}
                duration={500}
                className={`btn ${activeSection === 'contact' ? 'active-link' : ''}`}
                onClick={() => setMobileMenu(false)}
                style={{ cursor: 'pointer' }}
              >
                Contact us
              </ScrollLink>
            ) : (
              <button
                onClick={() => {
                  navigate('/');
                  setTimeout(() => {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                  setMobileMenu(false);
                }}
                className='btn'
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit', color: 'inherit' }}
              >
                Contact us
              </button>
            )}
          </li>
          <li><button className='btn donate-btn' onClick={() => setShowPopup(true)}>❤️ Donate Now</button></li>
        </ul>
        <img src={menu_icon} alt="Menu" className='menu-icon' onClick={toggleMenu} />
      </nav>
      <ComingSoonPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </React.Fragment>
  );
};

export default Navbar;
