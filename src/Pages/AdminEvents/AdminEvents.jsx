import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  clearStoredEvents,
  defaultEvents,
  loadEvents,
  loadLocalEvents,
  loadSharedEvents,
  saveEvents,
} from '../../data/events';
import {
  validateImageFile,
  uploadImageToCloudinary,
} from '../../services/cloudinary';
import './AdminEvents.css';

const emptyForm = {
  title: '',
  date: '',
  category: '',
  description: '',
  location: '',
  attendees: '',
  images: [],
};

const AdminEvents = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    false
  );
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [form, setForm] = useState(emptyForm);
  const [imageFiles, setImageFiles] = useState([]);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [editingImages, setEditingImages] = useState({});
  const [savingEventId, setSavingEventId] = useState(null);
  const [recoveredEvents, setRecoveredEvents] = useState([]);
  const imageInputRef = useRef(null);

  useEffect(() => {
    fetch('/.netlify/functions/admin-auth', { credentials: 'include' })
      .then((response) => setIsAuthenticated(response.ok))
      .catch(() => setIsAuthenticated(false));
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    Promise.all([loadEvents(), loadSharedEvents()]).then(([loadedEvents, sharedEvents]) => {
      setEvents(loadedEvents);
      const localEvents = loadLocalEvents();
      if (!sharedEvents.length && localEvents.some((event) => event.id?.startsWith('custom-'))) {
        setRecoveredEvents(localEvents);
        setSuccess('Previous browser events were recovered. Save them to make them available on every device.');
      }
    });
  }, [isAuthenticated]);

  const syncRecoveredEvents = async () => {
    try {
      await saveEvents(recoveredEvents);
      setEvents(recoveredEvents);
      setRecoveredEvents([]);
      setSuccess('Previous events are now available across devices.');
    } catch (syncError) {
      setError(syncError instanceof Error ? syncError.message : 'Previous events could not be synced.');
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await fetch('/.netlify/functions/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Invalid admin credentials.');
      setIsAuthenticated(true);
      setCredentials({ email: '', password: '' });
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Unable to sign in.');
    }
  };

  const handleImage = (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    Promise.all(files.map(validateImageFile))
      .then(() => {
        setImageFiles(files);
        setForm((currentForm) => ({
          ...currentForm,
          images: files.map((file) => URL.createObjectURL(file)),
        }));
        setError('');
      })
      .catch((validationError) => {
        setError(validationError instanceof Error ? validationError.message : 'The selected images are invalid.');
      });
  };

  const handleExistingImages = (eventId, event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    Promise.all(files.map(validateImageFile))
      .then(() => {
        setEditingImages((current) => ({
          ...current,
          [eventId]: [...(current[eventId] || []), ...files],
        }));
        setError('');
      })
      .catch((validationError) => {
        setError(validationError instanceof Error ? validationError.message : 'The selected images are invalid.');
      });
    event.target.value = '';
  };

  const removeExistingImage = async (eventId, imageIndex) => {
    const event = events.find((item) => item.id === eventId);
    if (!event || event.images.length <= 1) {
      setError('An event must keep at least one image.');
      return;
    }
    const updatedEvents = events.map((item) => item.id === eventId
      ? { ...item, images: item.images.filter((_, index) => index !== imageIndex) }
      : item);
    setSavingEventId(eventId);
    setError('');
    try {
      await saveEvents(updatedEvents);
      setEvents(updatedEvents);
      setSuccess('Event image removed successfully.');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'The image could not be removed.');
    } finally {
      setSavingEventId(null);
    }
  };

  const saveExistingImages = async (eventId) => {
    const files = editingImages[eventId] || [];
    if (!files.length) return;
    const event = events.find((item) => item.id === eventId);
    if (!event) return;
    setSavingEventId(eventId);
    setError('');
    try {
      const uploadedImages = await Promise.all(files.map(uploadImageToCloudinary));
      const updatedEvents = events.map((item) => item.id === eventId
        ? { ...item, images: [...item.images, ...uploadedImages] }
        : item);
      await saveEvents(updatedEvents);
      setEvents(updatedEvents);
      setEditingImages((current) => ({ ...current, [eventId]: [] }));
      setSuccess('New event images added successfully.');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'The images could not be added.');
    } finally {
      setSavingEventId(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    if (!imageFiles.length) {
      setError('Upload at least one event image before saving.');
      return;
    }
    setIsUploading(true);
    try {
      const imageUrls = await Promise.all(imageFiles.map(uploadImageToCloudinary));
      const newEvent = { ...form, images: imageUrls, id: `custom-${Date.now()}` };
      const updatedEvents = [newEvent, ...events];
      await saveEvents(updatedEvents);
      setEvents(updatedEvents);
      form.images.forEach((image) => URL.revokeObjectURL(image));
      setForm(emptyForm);
      setImageFiles([]);
      imageInputRef.current.value = '';
      setSuccess('Event published successfully.');
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'The event could not be published.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = (id) => {
    if (events.length <= 1) {
      window.alert('At least one event is required in the event catalogue.');
      return;
    }
    const updatedEvents = events.filter((event) => event.id !== id);
    saveEvents(updatedEvents).then(() => setEvents(updatedEvents)).catch((deleteError) => {
      setError(deleteError instanceof Error ? deleteError.message : 'The event could not be deleted.');
    });
  };

  const handleReset = () => {
    clearStoredEvents().then(() => {
      setEvents(defaultEvents);
      setSuccess('Custom events removed and default events restored.');
    }).catch((resetError) => {
      setError(resetError instanceof Error ? resetError.message : 'The event catalogue could not be reset.');
    });
  };

  if (!isAuthenticated) {
    return (
      <main className="admin-page admin-login-page">
        <form className="admin-card admin-login-card" onSubmit={handleLogin}>
          <p className="admin-eyebrow">RESTRICTED AREA</p>
          <h1>Event administration</h1>
          <p>Sign in to publish event details and images.</p>
          <label>
            Admin email
            <input
              type="email"
              value={credentials.email}
              onChange={(event) => setCredentials({ ...credentials, email: event.target.value })}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={credentials.password}
              onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
              required
            />
          </label>
          {error && <p className="admin-error" role="alert">{error}</p>}
          <button className="admin-primary-button" type="submit">Sign in</button>
          <button className="admin-link-button" type="button" onClick={() => navigate('/')}>Return to website</button>
        </form>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">ADMIN DASHBOARD</p>
          <h1>Manage events</h1>
        </div>
        <div className="admin-header-actions">
          <button className="admin-secondary-button" type="button" onClick={() => navigate('/')}>View website</button>
          <button
            className="admin-link-button"
            type="button"
            onClick={async () => {
              await fetch('/.netlify/functions/admin-auth', {
                method: 'DELETE',
                credentials: 'include',
              });
              setIsAuthenticated(false);
            }}
          >
            Sign out
          </button>
        </div>
      </header>

      <section className="admin-layout">
        <form className="admin-card admin-event-form" onSubmit={handleSubmit}>
          <h2>Publish an event</h2>
          <p className="admin-muted">Add multiple JPEG, PNG, or WebP images. Each file must be 5 MB or smaller and no side may exceed 8000px.</p>
          <label>Event title<input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required /></label>
          <div className="admin-form-grid">
            <label>Date<input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} required /></label>
            <label>Category<input value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} required /></label>
            <label>Location<input value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} required /></label>
            <label>Attendees<input value={form.attendees} onChange={(event) => setForm({ ...form, attendees: event.target.value })} placeholder="e.g. 250+" required /></label>
          </div>
          <label>Description<textarea rows="5" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} required /></label>
          <label>
            Event images (select multiple)
            <input ref={imageInputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handleImage} required={!form.images.length} />
          </label>
          {form.images.length > 0 && (
            <div>
              <p className="admin-image-count">{form.images.length} image{form.images.length === 1 ? '' : 's'} selected</p>
              <div className="admin-image-previews">
              {form.images.map((image, index) => <img key={image} className="admin-image-preview" src={image} alt={`Selected event preview ${index + 1}`} />)}
              </div>
            </div>
          )}
          {error && <p className="admin-error" role="alert">{error}</p>}
          {success && <p className="admin-success" role="status">{success}</p>}
          <button className="admin-primary-button" type="submit" disabled={isUploading}>
            {isUploading ? 'Uploading image...' : 'Publish event'}
          </button>
        </form>

        <section className="admin-card">
          <div className="admin-list-heading">
            <h2>Published events</h2>
            <div className="admin-header-actions">
              {recoveredEvents.length > 0 && (
                <button className="admin-primary-button" type="button" onClick={syncRecoveredEvents}>
                  Sync recovered events
                </button>
              )}
              <button className="admin-danger-button" type="button" onClick={handleReset}>Restore defaults</button>
            </div>
          </div>
          <div className="admin-event-list">
            {events.map((event) => (
              <article className="admin-event-row" key={event.id}>
                <div className="admin-event-images">
                  {event.images.map((image, index) => (
                    <div className="admin-event-image" key={image}>
                      <img src={image} alt={`${event.title} image ${index + 1}`} />
                      <button
                        type="button"
                        className="admin-image-remove"
                        onClick={() => removeExistingImage(event.id, index)}
                        disabled={savingEventId === event.id || event.images.length <= 1}
                        aria-label={`Remove image ${index + 1} from ${event.title}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="admin-event-details">
                  <strong>{event.title}</strong>
                  <span>{event.date} · {event.category} · {event.images.length} images</span>
                  <div className="admin-event-image-actions">
                    <label className="admin-secondary-button admin-file-button">
                      Add images
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        multiple
                        onChange={(uploadEvent) => handleExistingImages(event.id, uploadEvent)}
                      />
                    </label>
                    {(editingImages[event.id] || []).length > 0 && (
                      <button
                        type="button"
                        className="admin-primary-button"
                        onClick={() => saveExistingImages(event.id)}
                        disabled={savingEventId === event.id}
                      >
                        {savingEventId === event.id ? 'Saving...' : `Save ${(editingImages[event.id] || []).length} new`}
                      </button>
                    )}
                  </div>
                </div>
                {event.id.startsWith('custom-') && (
                  <button className="admin-delete-button" type="button" onClick={() => handleDelete(event.id)}>Delete</button>
                )}
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
};

export default AdminEvents;
