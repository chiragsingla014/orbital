

const isProduction = import.meta.env.PROD || window.location.hostname !== 'localhost';

export const BACKEND_URL = isProduction
  ? `${window.location.origin}/_/backend`  // Production Vercel URL
  : "http://localhost:5000";