import React from 'react'
import './Hero.css'
import dark_arrow from '../../assets/dark-arrow.png'
import { Link } from 'react-scroll'

const Hero = () => {
  return (
    <div className='hero container' id='hero'>
      <div className="hero-text">
        <h1>DEBIPUR</h1>
        <h2>DISHA SEVA SANSTHA</h2>
        <p>Where Health Meets Hope and Education Builds Futures</p>
        <Link to='program' smooth={true} offset={-260} duration={500} className='btn'>
          Explore more <img src={dark_arrow} alt="" />
        </Link>
      </div>
    </div>
  )
}

export default Hero
