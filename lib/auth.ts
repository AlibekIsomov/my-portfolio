import crypto from 'crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'admin_session';
const SESSION_TTL_SECONDS = 60 * 60 * 8;

const getSecret = () => {
  const secret = process.env.ADMIN_AUTH_SECRET;
  if (!secret) {
    throw new Error('ADMIN_AUTH_SECRET is not set');
  }
  return secret;
};

const base64UrlEncode = (value: string) =>
  Buffer.from(value).toString('base64url');

const base64UrlDecode = (value: string) =>
  Buffer.from(value, 'base64url').toString('utf8');

const sign = (payload: string) =>
  crypto.createHmac('sha256', getSecret()).update(payload).digest('base64url');

const safeEqual = (a: string, b: string) => {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  if (aBuffer.length !== bBuffer.length) {
    return false;
  }
  return crypto.timingSafeEqual(aBuffer, bBuffer);
};

type SessionPayload = {
  sub: string;
  exp: number;
};

export const createSessionToken = () => {
  const payload: SessionPayload = {
    sub: 'admin',
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  const encoded = base64UrlEncode(JSON.stringify(payload));
  const signature = sign(encoded);
  return `${encoded}.${signature}`;
};

export const verifySessionToken = (token: string) => {
  const [encoded, signature] = token.split('.');
  if (!encoded || !signature) {
    return null;
  }
  const expected = sign(encoded);
  if (!safeEqual(signature, expected)) {
    return null;
  }
  try {
    const payload = JSON.parse(base64UrlDecode(encoded)) as SessionPayload;
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
};

export const getAdminSession = () => {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }
  return verifySessionToken(token);
};

export const setAdminSessionCookie = (token: string) => {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: SESSION_TTL_SECONDS,
    path: '/',
  });
};

export const clearAdminSessionCookie = () => {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/',
  });
};

export const validateCredentials = (username: string, password: string) => {
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedUser || !expectedPassword) {
    return false;
  }
  return safeEqual(username, expectedUser) && safeEqual(password, expectedPassword);
};
