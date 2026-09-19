import { getStore } from '@netlify/blobs';

const STORE_NAME = 'debipur-events';
const EVENTS_KEY = 'catalogue';

const response = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  },
  body: JSON.stringify(body),
});

const hasAdminSession = (event) => {
  const cookieHeader = event.headers.cookie || event.headers.Cookie || '';
  const token = cookieHeader.split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith('ddss_admin_session='));
  return Boolean(token);
};

export const handler = async (event) => {
  const store = getStore(STORE_NAME);

  if (event.httpMethod === 'GET') {
    const events = await store.get(EVENTS_KEY, { type: 'json' });
    return response(200, { events: events || [] });
  }

  if (!hasAdminSession(event)) {
    return response(401, { message: 'Admin authentication required.' });
  }

  if (event.httpMethod === 'PUT') {
    let events;
    try {
      events = JSON.parse(event.body || '[]');
    } catch {
      return response(400, { message: 'Invalid event data.' });
    }
    if (!Array.isArray(events)) return response(400, { message: 'Events must be an array.' });
    await store.setJSON(EVENTS_KEY, events);
    return response(200, { events });
  }

  if (event.httpMethod === 'DELETE') {
    await store.delete(EVENTS_KEY);
    return response(200, { events: [] });
  }

  return response(405, { message: 'Method not allowed.' });
};
