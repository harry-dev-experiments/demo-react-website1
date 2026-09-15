import { useState } from 'react';
import './VisionMission.css';

const VisionMission = () => {
  const [activeTab, setActiveTab] = useState('vision');

  const tabData = {
    vision: {
      title: 'Our Vision',
      content: 'Debipur Disha Seva Sanstha, popularly known as DDSS or DISHA was set up in the year 2000 and registered with the Govt. as Society in the year 2007.  Since its inception, the society in different sectors have been getting the social aids and assistance through this ISO Certified Social Welfare Organisation.  Different social services are extended towards the people specially, the marginal, downtrodden and underprivileged people in various sectors',
      icon: '👁️',
    },
    mission: {
      title: 'Our Mission',
      content: 'It has clear vision to help out the people living in the deprived sector through its lots of social service and welfare measures like: Blood donation camp, Cloth, blanket, mosquito net, food grains, educational instruments distribution among the needy people and student, conducting free medical camp and eye camp with free distribution of spectacles etc.  The society is also engaged in the social awareness and consciousness through its different social activities and programmes.With the help of administration, social activists, more aids in different modes to be provided to the people in such social sectors even introducing and reaching these people with various govt run social welfare schemes with the mission to mainstream them into the society.',
      icon: '🎯',
    },
    motto: {
      title: 'Our Motto',
      content: 'The DDSS or DISHA has a slogan the social equality in the social stratification in terms of status irrespective of caste, creed and sex.',
      icon: '✨',
    }
  };

  return (
    <div className='vision-mission' id='vision-mission'>
      <div className="vm-intro">
        <span className="vm-kicker">THE DISHA PRINCIPLE</span>
        <p>One purpose. Three guiding ideas. A more equal tomorrow.</p>
      </div>
      <div className="vm-container">
        <div className="vm-art" aria-hidden="true">
          <span className="vm-orbit vm-orbit-one" />
          <span className="vm-orbit vm-orbit-two" />
          <span className="vm-art-star">✦</span>
          <span className="vm-art-number">01</span>
        </div>
        <div className="vm-tabs">
          <button type="button"
            aria-selected={activeTab === 'vision'}
            className={`vm-tab-btn ${activeTab === 'vision' ? 'active' : ''}`}
            onClick={() => setActiveTab('vision')}
          >
            <span className="vm-tab-icon">◉</span><span>Vision</span>
          </button>
          <button type="button"
            aria-selected={activeTab === 'mission'}
            className={`vm-tab-btn ${activeTab === 'mission' ? 'active' : ''}`}
            onClick={() => setActiveTab('mission')}
          >
            <span className="vm-tab-icon">↗</span><span>Mission</span>
          </button>
          <button type="button"
            aria-selected={activeTab === 'motto'}
            className={`vm-tab-btn ${activeTab === 'motto' ? 'active' : ''}`}
            onClick={() => setActiveTab('motto')}
          >
            <span className="vm-tab-icon">✦</span><span>Motto</span>
          </button>
        </div>

        <div className="vm-content-wrapper">
          {Object.keys(tabData).map((key) => (
            <div 
              key={key} 
              className={`vm-content-pane ${activeTab === key ? 'active' : ''}`}
            >
              <div className="vm-content-label"><span>{tabData[key].icon}</span> {key}</div>
              <h2>{tabData[key].title}</h2>
              <p>{tabData[key].content}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default VisionMission;
