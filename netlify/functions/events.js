/* global Buffer, process */

import { getStore } from '@netlify/blobs';
import crypto from 'node:crypto';

const STORE_NAME = 'debipur-events';
const EVENTS_KEY = 'catalogue';
const SESSION_COOKIE = 'ddss_admin_session=';

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
    .find((cookie) => cookie.startsWith(SESSION_COOKIE))
    ?.slice(SESSION_COOKIE.length);
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!token || !secret) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  if (signature.length !== expected.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
  try {
    return JSON.parse(Buffer.from(payload, 'base64url').toString()).exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
};

export const handler = async (event) => {
  const siteID = process.env.NETLIFY_SITE_ID;
  const token = process.env.NETLIFY_AUTH_TOKEN;
  if (!siteID || !token) {
    return response(500, {
      message: 'Netlify Blobs is not configured. Add NETLIFY_SITE_ID and NETLIFY_AUTH_TOKEN in Netlify environment variables.',
    });
  }

  const store = getStore({
    name: STORE_NAME,
    siteID,
    token,
    consistency: 'strong',
  });

  try {
    if (event.httpMethod === 'GET') {
      const events = await store.get(EVENTS_KEY, { type: 'json' });
      return response(200, { events: events || [] });
    }

    if (!hasAdminSession(event)) {
      return response(401, { message: 'Admin authentication required. Sign in again.' });
    }

    if (event.httpMethod === 'PUT') {
      let events;
      try {
        events = JSON.parse(event.body || '[]');
      } catch {
        return response(400, { message: 'Invalid event data.' });
      }
      if (!Array.isArray(events)) return response(400, { message: 'Events must be an array.' });
      if (events.length === 0) {
        return response(400, { message: 'At least one event is required in the catalogue.' });
      }
      await store.setJSON(EVENTS_KEY, events);
      return response(200, { events });
    }

    if (event.httpMethod === 'DELETE') {
      await store.delete(EVENTS_KEY);
      return response(200, { events: [] });
    }

    return response(405, { message: 'Method not allowed.' });
  } catch (error) {
    console.error('Event catalogue storage error:', error);
    return response(500, {
      message: 'Shared event storage is unavailable. Check Netlify Blobs configuration.',
    });
  }
};
