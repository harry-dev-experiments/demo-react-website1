import React from 'react'
import './Footer.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-scroll'

const Footer = () => {
  return (
    <footer className='footer-wrapper'>
      <div className='footer-main'>

        {/* Brand Column */}
        <div className='footer-col footer-brand'>
          <img src={logo} alt="Debipur Disha Seva Sanstha" className='footer-logo' />
          <p className='footer-tagline'>
            Empowering communities through healthcare, education, and social welfare since 2001.
          </p>
          <div className='footer-social'>
            <a href='https://facebook.com' target='_blank' rel='noreferrer' aria-label='Facebook' className='social-icon'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href='https://instagram.com' target='_blank' rel='noreferrer' aria-label='Instagram' className='social-icon'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href='https://twitter.com' target='_blank' rel='noreferrer' aria-label='Twitter/X' className='social-icon'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href='https://youtube.com' target='_blank' rel='noreferrer' aria-label='YouTube' className='social-icon'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="#08003A" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className='footer-col'>
          <h4 className='footer-heading'>Quick Links</h4>
          <ul className='footer-links'>
            <li><Link to='hero' smooth={true} offset={0} duration={500}>Home</Link></li>
            <li><Link to='program' smooth={true} offset={-260} duration={500}>Programs</Link></li>
            <li><Link to='about' smooth={true} offset={-150} duration={500}>About Us</Link></li>
            <li><Link to='campus' smooth={true} offset={-260} duration={500}>Our Works</Link></li>
            <li><Link to='blog' smooth={true} offset={-260} duration={500}>Blog</Link></li>
            <li><Link to='volunteer' smooth={true} offset={-260} duration={500}>Volunteer</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className='footer-col'>
          <h4 className='footer-heading'>Contact Us</h4>
          <ul className='footer-contact'>
            <li>
              <span className='contact-icon'>📍</span>
              Debipur, Chandannagar, Hooghly<br/>West Bengal, India
            </li>
            <li>
              <span className='contact-icon'>📧</span>
              <a href='mailto:debipurdisha2001@gmail.com'>debipurdisha2001@gmail.com</a>
            </li>
            <li>
              <span className='contact-icon'>📞</span>
              +91-9593690XXX
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className='footer-col'>
          <h4 className='footer-heading'>Legal</h4>
          <ul className='footer-links'>
            <li><a href='/terms'>Terms of Service</a></li>
            <li><a href='/privacy'>Privacy Policy</a></li>
            <li><a href='/disclaimer'>Disclaimer</a></li>
          </ul>
          <div className='footer-reg'>
            <p>Reg. No: <strong>S/1L/19491</strong></p>
            <p>PAN: <strong>AAAAD1234X</strong></p>
          </div>
        </div>

      </div>

      <div className='footer-bottom'>
        <p>© {new Date().getFullYear()} Debipur Disha Seva Sanstha. All rights reserved.</p>
        <p className='footer-made'>Made with ❤️ for our community</p>
      </div>
    </footer>
  )
}

export default Footer
