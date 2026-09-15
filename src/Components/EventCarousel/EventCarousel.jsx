import { useEffect, useState } from 'react';
import './EventCarousel.css';
import useScrollReveal from '../../hooks/useScrollReveal';
import { EVENTS_UPDATED_EVENT, loadEvents } from '../../data/events';

const EventCard = ({ event }) => {
  const images = event.images?.length ? event.images : [event.image];
  const [activeImage, setActiveImage] = useState(0);

  return (
    <article className="event-card">
      <div className="event-card-gallery">
        <img src={images[activeImage]} alt={`${event.title} - image ${activeImage + 1}`} />
        <span className="ec-category-badge">{event.category}</span>
        <span className="event-image-count">{images.length} {images.length === 1 ? 'photo' : 'photos'}</span>
      </div>
      {images.length > 1 && (
        <div className="event-gallery-thumbnails">
          {images.map((image, index) => (
            <button
              type="button"
              key={image}
              className={index === activeImage ? 'event-gallery-thumb active' : 'event-gallery-thumb'}
              onClick={() => setActiveImage(index)}
              aria-label={`Show image ${index + 1} of ${event.title}`}
            >
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      )}
      <div className="event-card-content">
        <p className="ec-date">📅 {event.date}</p>
        <h2>{event.title}</h2>
        <p className="event-card-description">{event.description}</p>
        <div className="ec-meta">
          <span>📍 {event.location}</span>
          <span>👥 {event.attendees} Attended</span>
        </div>
      </div>
    </article>
  );
};

const EventCarousel = () => {
  const [events, setEvents] = useState(() => loadEvents());
  const revealRef = useScrollReveal();

  useEffect(() => {
    const refreshEvents = () => setEvents(loadEvents());
    window.addEventListener(EVENTS_UPDATED_EVENT, refreshEvents);
    return () => window.removeEventListener(EVENTS_UPDATED_EVENT, refreshEvents);
  }, []);

  return (
    <section className="event-carousel" id="events">
      <div className="ec-wrapper reveal" ref={revealRef}>
        <div className="event-catalogue-heading">
          <p className="ec-date">OUR EVENT CATALOGUE</p>
          <h2>Stories of community in action</h2>
          <p>Explore our initiatives, the places we serve, and the people who make every event possible.</p>
        </div>
        <div className="event-catalogue">
          {events.map((event) => <EventCard key={event.id} event={event} />)}
        </div>
      </div>
    </section>
  );
};

export default EventCarousel;
