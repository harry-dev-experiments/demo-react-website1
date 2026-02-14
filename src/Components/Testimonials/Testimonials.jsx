import React, { useRef } from 'react'
import './Testimonials.css'
import next_icon from '../../assets/next-icon.png'
import back_icon from '../../assets/back-icon.png'
import user_1 from '../../assets/user-1.png'
import user_2 from '../../assets/user-2.png'
import user_3 from '../../assets/user-3.png'
import user_4 from '../../assets/user-4.png'

const Testimonials = () => {

    const slider = useRef();
    let tx = 0;

const slideForward = ()=>{
    if(tx > -50){
        tx -= 25;
    }
    slider.current.style.transform = `translateX(${tx}%)`;
}
const slideBackward = ()=>{
    if(tx < 0){
        tx += 25;
    }
    slider.current.style.transform = `translateX(${tx}%)`;
}

  return (
    <div className='testimonials'>
      <img src={next_icon} alt="" className='next-btn' onClick={slideForward}/>
      <img src={back_icon} alt="" className='back-btn' onClick={slideBackward}/>
      <div className="slider">
        <ul ref={slider}>
            <li>
                <div className="slide">
                    <div className="user-info">
                        <img src={user_1} alt="" />
                        <div>
                            <h3>Kanu Mazumder</h3>
                            <span>Sajirhat, Madhyamgram</span>
                        </div>
                    </div>
                    <p>This initiative is truly changing lives in our community.</p>
                </div>
            </li>
            <li>
                <div className="slide">
                    <div className="user-info">
                        <img src={user_2} alt="" />
                        <div>
                            <h3>Shailendra Dubey</h3>
                            <span>Madhyamgram, West Bengal</span>
                        </div>
                    </div>
                    <p>Access to healthcare has improved significantly thanks to this program.</p>
                </div>
            </li>
            <li>
                <div className="slide">
                    <div className="user-info">
                        <img src={user_3} alt="" />
                        <div>
                            <h3>Harikesh Tiwari</h3>
                            <span>Durgapur, West Bengal</span>
                        </div>
                    </div>
                    <p>A compassionate approach to community wellness.</p>
                </div>
            </li>
            <li>
                <div className="slide">
                    <div className="user-info">
                        <img src={user_4} alt="" />
                        <div>
                            <h3>Avijit Saha</h3>
                            <span>Howrah, West Bengal</span>
                        </div>
                    </div>
                    <p>A well-organized program with meaningful results.</p>
                </div>
            </li>
        </ul>
      </div>
    </div>
  )
}

export default Testimonials
