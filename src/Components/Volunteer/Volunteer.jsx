import { useState } from 'react';
import { jsPDF } from 'jspdf';
import './Volunteer.css';
import msg_icon from '../../assets/msg-icon.png';
import mail_icon from '../../assets/mail-icon.png';
import phone_icon from '../../assets/phone-icon.png';
import location_icon from '../../assets/location-icon.png';
import white_arrow from '../../assets/white-arrow.png';
import ddssLogo from '../../assets/logo.png';

const Volunteer = () => {
  const [result, setResult] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registration, setRegistration] = useState(null);

  const createDishaId = () => {
    const uniquePart = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID().split('-')[0]
      : `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
    return `DISHA-${uniquePart.toUpperCase()}`;
  };

  const loadLogoDataUrl = () => new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      canvas.getContext('2d').drawImage(image, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    image.onerror = reject;
    image.src = ddssLogo;
  });

  const downloadIdCard = async (details) => {
    const logoDataUrl = await loadLogoDataUrl();
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: [86, 54] });

    pdf.setFillColor(33, 46, 160);
    pdf.roundedRect(0, 0, 86, 54, 4, 4, 'F');
    pdf.setFillColor(245, 215, 122);
    pdf.circle(76, 9, 13, 'F');
    pdf.addImage(logoDataUrl, 'PNG', 6, 3, 8, 8);
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.text('DEBIPUR DISHA SEVA SANSTHA', 17, 8);
    pdf.setFontSize(5.5);
    pdf.setFont('helvetica', 'normal');
    pdf.text('VOLUNTEER IDENTITY CARD', 17, 13);

    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(6, 19, 20, 25, 2, 2, 'F');
    pdf.setTextColor(33, 46, 160);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.text(details.name.trim().charAt(0).toUpperCase(), 16, 35, { align: 'center' });

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(9);
    pdf.text(details.name.trim().slice(0, 28), 31, 24);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(6.5);
    pdf.text(`DISHA-ID: ${details.dishaId}`, 31, 30);
    pdf.text(`Interest: ${details.interest}`, 31, 35, { maxWidth: 48 });
    pdf.text(`Availability: ${details.availability}`, 31, 41, { maxWidth: 48 });
    pdf.setDrawColor(245, 215, 122);
    pdf.line(6, 48, 80, 48);
    pdf.setFontSize(5.5);
    pdf.text('This card confirms volunteer registration with DDSS.', 6, 51);
    pdf.save(`${details.dishaId}-ID-card.pdf`);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setRegistration(null);
    setResult('Submitting application...');
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData.entries());
    const dishaId = createDishaId();
    const details = { ...formValues, dishaId };

    // Web3Forms Access Key
    formData.append('access_key', import.meta.env.VITE_WEB3FORMS_KEY);
    formData.append('subject', 'New Volunteer Application - Debipur Disha Seva Sanstha');
    formData.append('from_name', 'NGO Website Volunteer Portal');
    formData.append('disha_id', dishaId);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      }).then((res) => res.json());

      if (res.success) {
        setRegistration(details);
        setResult(`Registration successful. Your unique DISHA-ID is ${dishaId}. Download your ID card below.`);
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

          {result && <span className={`form-status-msg ${registration ? 'success' : ''}`}>{result}</span>}
          {registration && (
            <div className="id-card-download">
              <strong>DISHA-ID: {registration.dishaId}</strong>
              <button type="button" className="btn id-card-button" onClick={() => downloadIdCard(registration)}>
                Download ID Card (PDF)
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Volunteer;
