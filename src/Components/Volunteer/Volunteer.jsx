import React, { useState } from 'react';
import './Volunteer.css';
import msg_icon from '../../assets/msg-icon.png';
import mail_icon from '../../assets/mail-icon.png';
import phone_icon from '../../assets/phone-icon.png';
import location_icon from '../../assets/location-icon.png';
import white_arrow from '../../assets/white-arrow.png';

const Volunteer = () => {
  const [result, setResult] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult('Submitting application...');
    const formData = new FormData(event.target);

    // Web3Forms Access Key
    formData.append('access_key', '1a0e3d2d-d6a3-4d53-8770-30f7dd237f55');
    formData.append('subject', 'New Volunteer Application - Debipur Disha Seva Sanstha');
    formData.append('from_name', 'NGO Website Volunteer Portal');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      }).then((res) => res.json());

      if (res.success) {
        setResult('Thank you for registering! Your volunteer application has been submitted successfully.');
        event.target.reset();
      } else {
        setResult(res.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setResult('Submission error. Please check your internet connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="volunteer" id="volunteer">
      <div className="volunteer-col">
        <h3>Become a Volunteer <img src={msg_icon} alt="Volunteer icon" /></h3>
        <p>
          Join Debipur Disha Seva Sanstha and turn your passion for social service into real-world impact.
          Whether you can teach, organize health camps, manage events, or support our digital initiatives,
          your contribution matters!
        </p>
        <div className="volunteer-highlights">
          <div className="highlight-item">
            <strong>🌟 Community Impact</strong>
            <p>Directly transform lives across rural & semi-urban communities.</p>
          </div>
          <div className="highlight-item">
            <strong>📜 Certificate of Service</strong>
            <p>Receive official recognition and volunteer certification.</p>
          </div>
          <div className="highlight-item">
            <strong>🤝 Leadership & Growth</strong>
            <p>Build lifelong networks and develop core leadership skills.</p>
          </div>
        </div>
        <ul className="volunteer-contact-list">
          <li><img src={mail_icon} alt="Email" /> debipurdisha2001@gmail.com</li>
          <li><img src={phone_icon} alt="Phone" /> +91-9593690XXX</li>
          <li><img src={location_icon} alt="Location" /> Debipur, Chandannagar, Hooghly, West Bengal, India</li>
        </ul>
      </div>

      <div className="volunteer-col">
        <form onSubmit={onSubmit} className="volunteer-form">
          <label>Full Name</label>
          <input type="text" name="name" placeholder="Enter your full name" required />

          <div className="form-row">
            <div>
              <label>Email Address</label>
              <input type="email" name="email" placeholder="Enter your email" required />
            </div>
            <div>
              <label>Phone Number</label>
              <input type="tel" name="phone" placeholder="Enter mobile number" required />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>Area of Interest</label>
              <select name="interest" required defaultValue="">
                <option value="" disabled>Select interest area</option>
                <option value="Education & Teaching">Education & Teaching</option>
                <option value="Healthcare & Sanitation Drives">Healthcare & Sanitation Drives</option>
                <option value="Youth Leadership & Skill Workshops">Youth Leadership & Workshops</option>
                <option value="Event Planning & Logistics">Event Planning & Logistics</option>
                <option value="Digital Media & Photography">Digital Media & Photography</option>
              </select>
            </div>
            <div>
              <label>Availability</label>
              <select name="availability" required defaultValue="">
                <option value="" disabled>Select availability</option>
                <option value="Weekends Only">Weekends Only</option>
                <option value="Weekdays Only">Weekdays Only</option>
                <option value="Flexible / On-Call">Flexible / On-Call</option>
                <option value="Remote / Online Support">Remote / Online Support</option>
              </select>
            </div>
          </div>

          <label>Why do you want to volunteer?</label>
          <textarea
            name="message"
            rows="5"
            placeholder="Tell us briefly about your motivation and skills..."
            required
          ></textarea>

          <button type="submit" className="btn dark-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Register as Volunteer'} <img src={white_arrow} alt="Arrow" />
          </button>

          {result && <span className={`form-status-msg ${result.includes('Thank you') ? 'success' : ''}`}>{result}</span>}
        </form>
      </div>
    </div>
  );
};

export default Volunteer;
