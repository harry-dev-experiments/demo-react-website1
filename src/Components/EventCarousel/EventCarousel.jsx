import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './EventCarousel.css';
import useScrollReveal from '../../hooks/useScrollReveal';
import { EVENTS_UPDATED_EVENT, loadEvents } from '../../data/events';

const EventCard = ({ event }) => {
  const images = event.images?.length ? event.images : [event.image];
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    if (lightboxImage === null) return undefined;

    const handleKeyDown = (keyboardEvent) => {
      if (keyboardEvent.key === 'Escape') setLightboxImage(null);
      if (keyboardEvent.key === 'ArrowLeft') {
        setLightboxImage((current) => (current - 1 + images.length) % images.length);
      }
      if (keyboardEvent.key === 'ArrowRight') {
        setLightboxImage((current) => (current + 1) % images.length);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [images.length, lightboxImage]);

  const showLightboxImage = (index) => {
    setLightboxImage(index);
  };

  const getDownloadUrl = (imageUrl) => imageUrl.includes('/upload/')
    ? imageUrl.replace('/upload/', '/upload/fl_attachment/')
    : imageUrl;

  return (
    <article className="event-card">
      <div className="event-card-gallery">
        <button
          type="button"
          className="event-gallery-open"
          onClick={() => showLightboxImage(activeImage)}
          aria-label={`Open ${event.title} image ${activeImage + 1} in lightbox`}
        >
          <img src={images[activeImage]} alt={`${event.title} - image ${activeImage + 1}`} />
          <span className="event-gallery-zoom" aria-hidden="true">+</span>
        </button>
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
              onClick={() => {
                setActiveImage(index);
                showLightboxImage(index);
              }}
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
      {lightboxImage !== null && createPortal(
        <div
          className="event-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${event.title} photo gallery`}
          onClick={(clickEvent) => {
            if (clickEvent.target === clickEvent.currentTarget) setLightboxImage(null);
          }}
        >
          <div className="event-lightbox-content">
            <button
              type="button"
              className="event-lightbox-close"
              onClick={() => setLightboxImage(null)}
              aria-label="Close photo gallery"
            >
              ×
            </button>
            <div className="event-lightbox-image-wrap">
              {images.length > 1 && (
                <button
                  type="button"
                  className="event-lightbox-arrow event-lightbox-previous"
                  onClick={() => setLightboxImage((current) => (current - 1 + images.length) % images.length)}
                  aria-label="Show previous image"
                >
                  ‹
                </button>
              )}
              <img
                src={images[lightboxImage]}
                alt={`${event.title} - image ${lightboxImage + 1} of ${images.length}`}
                className="event-lightbox-image"
              />
              {images.length > 1 && (
                <button
                  type="button"
                  className="event-lightbox-arrow event-lightbox-next"
                  onClick={() => setLightboxImage((current) => (current + 1) % images.length)}
                  aria-label="Show next image"
                >
                  ›
                </button>
              )}
            </div>
            <div className="event-lightbox-caption">
              <div>
                <span>{event.category}</span>
                <h3>{event.title}</h3>
              </div>
              <div className="event-lightbox-actions">
                <p>{lightboxImage + 1} / {images.length}</p>
                <a
                  className="event-lightbox-download"
                  href={getDownloadUrl(images[lightboxImage])}
                  download={`${event.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-${lightboxImage + 1}.jpg`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Download current image"
                  title="Download image"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 3v11m0 0 4-4m-4 4-4-4M5 19h14" />
                  </svg>
                </a>
              </div>
            </div>
            {images.length > 1 && (
              <div className="event-lightbox-thumbnails" aria-label="Choose gallery image">
                {images.map((image, index) => (
                  <button
                    type="button"
                    key={image}
                    className={index === lightboxImage ? 'active' : ''}
                    onClick={() => setLightboxImage(index)}
                    aria-label={`Show image ${index + 1}`}
                    aria-current={index === lightboxImage ? 'true' : undefined}
                  >
                    <img src={image} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>,
        document.body,
      )}
    </article>
  );
};

const EventCarousel = () => {
  const [events, setEvents] = useState([]);
  const revealRef = useScrollReveal();

  useEffect(() => {
    const refreshEvents = () => loadEvents().then(setEvents);
    refreshEvents();
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
