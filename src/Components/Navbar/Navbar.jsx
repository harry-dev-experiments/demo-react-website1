import React, { useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import menu_icon from '../../assets/menu-icon.png'
import { Link } from 'react-scroll';

const navLinks = [
  { id: 'hero',         label: 'Home',         offset: 0 },
  { id: 'program',      label: 'Program',      offset: -260 },
  { id: 'about',        label: 'About us',     offset: -150 },
  { id: 'campus',       label: 'Our Works',    offset: -260 },
  { id: 'testimonials', label: 'Testimonials', offset: -260 },
  { id: 'blog',         label: 'Blog',         offset: -260 },
  { id: 'volunteer',    label: 'Volunteer',    offset: -260 },
];

const Navbar = () => {
    const [sticky, setSticky] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const sectionIds = navLinks.map(l => l.id).concat(['contact']);
        const observers = [];
        sectionIds.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActiveSection(id);
                },
                { threshold: 0.3 }
            );
            observer.observe(el);
            observers.push(observer);
        });
        return () => observers.forEach(o => o.disconnect());
    }, []);

    const toggleMenu = () => setMobileMenu(prev => !prev);

  return (
    <nav className={`container ${sticky ? 'dark-nav' : ''}`}>
      <img src={logo} alt="Logo" className='logo' />
      <ul className={mobileMenu ? '' : 'hide-mobile-menu'}>
        {navLinks.map(link => (
          <li key={link.id}>
            <Link
              to={link.id}
              smooth={true}
              offset={link.offset}
              duration={500}
              className={activeSection === link.id ? 'active-link' : ''}
              onClick={() => setMobileMenu(false)}
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            to='contact'
            smooth={true}
            offset={-260}
            duration={500}
            className={`btn ${activeSection === 'contact' ? 'active-link' : ''}`}
            onClick={() => setMobileMenu(false)}
          >
            Contact us
          </Link>
        </li>
        <li><a href='#donate' className='btn donate-btn'>❤️ Donate Now</a></li>
      </ul>
      <img src={menu_icon} alt="Menu" className='menu-icon' onClick={toggleMenu}/>
    </nav>
  )
}

export default Navbar
