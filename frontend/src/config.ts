

const isProduction = process.env.NODE_ENV === 'production' || window.location.hostname !== 'localhost';

export const BACKEND_URL = isProduction
  ? `${window.location.origin}/_/backend`  // On Vercel: automatically uses your live domain + the backend route prefix
  : "http://localhost:5000";