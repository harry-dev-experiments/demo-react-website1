/* global Buffer, process */

import crypto from 'node:crypto';

const COOKIE_NAME = 'ddss_admin_session';
const SESSION_MAX_AGE = 60 * 60 * 8;

const jsonResponse = (statusCode, body, headers = {}) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
    ...headers,
  },
  body: JSON.stringify(body),
});

const createSignature = (value, secret) => crypto
  .createHmac('sha256', secret)
  .update(value)
  .digest('base64url');

const createSession = (secret) => {
  const payload = Buffer.from(JSON.stringify({
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
  })).toString('base64url');
  return `${payload}.${createSignature(payload, secret)}`;
};

const isValidSession = (token, secret) => {
  if (!token) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;

  const expectedSignature = createSignature(payload, secret);
  if (signature.length !== expectedSignature.length) return false;
  const signaturesMatch = crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature),
  );
  if (!signaturesMatch) return false;

  try {
    return JSON.parse(Buffer.from(payload, 'base64url').toString()).exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
};

const getCookies = (cookieHeader = '') => Object.fromEntries(
  cookieHeader.split(';').map((cookie) => {
    const separator = cookie.indexOf('=');
    return separator === -1
      ? ['', '']
      : [cookie.slice(0, separator).trim(), decodeURIComponent(cookie.slice(separator + 1).trim())];
  }).filter(([key]) => key),
);

export const handler = async (event) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  if (!adminEmail || !adminPassword || !sessionSecret) {
    return jsonResponse(500, { message: 'Admin authentication is not configured on the server.' });
  }

  const cookies = getCookies(event.headers.cookie || event.headers.Cookie);
  const sessionCookie = cookies[COOKIE_NAME];

  if (event.httpMethod === 'GET') {
    return jsonResponse(isValidSession(sessionCookie, sessionSecret) ? 200 : 401, {
      authenticated: isValidSession(sessionCookie, sessionSecret),
    });
  }

  if (event.httpMethod === 'DELETE') {
    return jsonResponse(200, { authenticated: false }, {
      'Set-Cookie': `${COOKIE_NAME}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict`,
    });
  }

  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { message: 'Method not allowed.' }, { Allow: 'GET, POST, DELETE' });
  }

  let credentials;
  try {
    credentials = JSON.parse(event.body || '{}');
  } catch {
    return jsonResponse(400, { message: 'Invalid request.' });
  }

  if (credentials.email !== adminEmail || credentials.password !== adminPassword) {
    return jsonResponse(401, { message: 'Invalid admin credentials.' });
  }

  return jsonResponse(200, { authenticated: true }, {
    'Set-Cookie': `${COOKIE_NAME}=${createSession(sessionSecret)}; Max-Age=${SESSION_MAX_AGE}; Path=/; HttpOnly; Secure; SameSite=Strict`,
  });
};
