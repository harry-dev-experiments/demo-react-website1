import React, { useEffect, useRef, useState } from 'react';
import './Stats.css';

const statsData = [
  { end: 500, suffix: '+', label: 'Families Helped', icon: '🏠' },
  { end: 50, suffix: '+', label: 'Villages Reached', icon: '🌾' },
  { end: 200, suffix: '+', label: 'Active Volunteers', icon: '🤝' },
  { end: 20, suffix: '+', label: 'Years of Service', icon: '🏆' },
];

const useCountUp = (end, duration = 2000, started) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, started]);

  return count;
};

const StatCard = ({ stat, started }) => {
  const count = useCountUp(stat.end, 2000, started);
  return (
    <div className="stat-card">
      <div className="stat-icon">{stat.icon}</div>
      <h3 className="stat-number">
        {count}
        <span className="stat-suffix">{stat.suffix}</span>
      </h3>
      <p className="stat-label">{stat.label}</p>
    </div>
  );
};

const Stats = () => {
  const sectionRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [started]);

  return (
    <section className="stats-section" ref={sectionRef} id="stats">
      <div className="stats-bg-overlay" />
      <div className="stats-content">
        <div className="stats-header">
          <span className="stats-subtitle">OUR IMPACT</span>
          <h2 className="stats-title">Making a Difference, One Life at a Time</h2>
        </div>
        <div className="stats-grid">
          {statsData.map((stat, i) => (
            <StatCard key={i} stat={stat} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
