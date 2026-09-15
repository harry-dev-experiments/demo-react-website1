import './Programs.css'
import program_1 from '../../assets/program-1.png'
import program_2 from '../../assets/program-2.png'
import program_3 from '../../assets/program-3.png'
import program_icon_1 from '../../assets/program-icon-1.png'
import program_icon_2 from '../../assets/program-icon-2.png'
import program_icon_3 from '../../assets/program-icon-3.png'

const Programs = () => {
  return (
    <div className='programs' id='program'>
      <div className="program">
        <img src={program_1} alt="Youth and Women Empowerment program" loading="lazy" />
        <div className="caption">
          <img src={program_icon_1} alt="" loading="lazy" />
          <p>Youth and Women Empowerment</p>
        </div>
      </div>
      <div className="program">
        <img src={program_2} alt="Volunteers in action" loading="lazy" />
        <div className="caption">
          <img src={program_icon_2} alt="" loading="lazy" />
          <p>Volunteers</p>
        </div>
      </div>
      <div className="program">
        <img src={program_3} alt="Health and Sanitation initiative" loading="lazy" />
        <div className="caption">
          <img src={program_icon_3} alt="" loading="lazy" />
          <p>Health & Sanitation</p>
        </div>
      </div>
    </div>
  )
}

export default Programs
