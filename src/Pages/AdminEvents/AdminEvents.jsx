import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearStoredEvents, defaultEvents, loadEvents, saveEvents } from '../../data/events';
import { uploadImageToCloudinary } from '../../services/cloudinary';
import './AdminEvents.css';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

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
    () => sessionStorage.getItem('debipur-admin-session') === 'authenticated'
  );
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [form, setForm] = useState(emptyForm);
  const [imageFiles, setImageFiles] = useState([]);
  const [events, setEvents] = useState(() => loadEvents());
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const imageInputRef = useRef(null);

  const handleLogin = (event) => {
    event.preventDefault();
    setError('');
    if (!adminEmail || !adminPassword) {
      setError('Admin credentials are not configured. Add VITE_ADMIN_EMAIL and VITE_ADMIN_PASSWORD to your environment.');
      return;
    }
    if (credentials.email !== adminEmail || credentials.password !== adminPassword) {
      setError('Invalid admin credentials.');
      return;
    }
    sessionStorage.setItem('debipur-admin-session', 'authenticated');
    setIsAuthenticated(true);
  };

  const handleImage = (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    const invalidFile = files.find((file) => !file.type.startsWith('image/'));
    if (invalidFile) {
      setError('Please choose image files only.');
      return;
    }
    const oversizedFile = files.find((file) => file.size > MAX_IMAGE_SIZE);
    if (oversizedFile) {
      setError('Each image must be 5 MB or smaller.');
      return;
    }
    setImageFiles(files);
    setForm((currentForm) => ({
      ...currentForm,
      images: files.map((file) => URL.createObjectURL(file)),
    }));
    setError('');
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
      saveEvents(updatedEvents);
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
    const updatedEvents = events.filter((event) => event.id !== id);
    saveEvents(updatedEvents);
    setEvents(updatedEvents);
  };

  const handleReset = () => {
    clearStoredEvents();
    setEvents(defaultEvents);
    setSuccess('Custom events removed and default events restored.');
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
            onClick={() => {
              sessionStorage.removeItem('debipur-admin-session');
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
          <p className="admin-muted">Images are uploaded to Cloudinary and event details are restored after reload.</p>
          <label>Event title<input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required /></label>
          <div className="admin-form-grid">
            <label>Date<input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} required /></label>
            <label>Category<input value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} required /></label>
            <label>Location<input value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} required /></label>
            <label>Attendees<input value={form.attendees} onChange={(event) => setForm({ ...form, attendees: event.target.value })} placeholder="e.g. 250+" required /></label>
          </div>
          <label>Description<textarea rows="5" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} required /></label>
          <label>
            Event images
            <input ref={imageInputRef} type="file" accept="image/*" multiple onChange={handleImage} required={!form.images.length} />
          </label>
          {form.images.length > 0 && (
            <div className="admin-image-previews">
              {form.images.map((image, index) => <img key={image} className="admin-image-preview" src={image} alt={`Selected event preview ${index + 1}`} />)}
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
            <button className="admin-danger-button" type="button" onClick={handleReset}>Restore defaults</button>
          </div>
          <div className="admin-event-list">
            {events.map((event) => (
              <article className="admin-event-row" key={event.id}>
                <img src={event.images[0]} alt="" />
                <div>
                  <strong>{event.title}</strong>
                  <span>{event.date} · {event.category}</span>
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
