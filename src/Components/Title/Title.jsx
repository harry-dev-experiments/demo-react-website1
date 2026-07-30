import React from 'react'
import './Title.css'
import useScrollReveal from '../../hooks/useScrollReveal'

const Title = ({subTitle, title}) => {
  const ref = useScrollReveal();
  return (
    <div className='title reveal' ref={ref}>
      <p>{subTitle}</p>
      <h2>{title}</h2>
    </div>
  )
}

export default Title
