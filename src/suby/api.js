import { getApiUrl } from '../config';

// Use environment-based API URL
export const API_URL = getApiUrl();

// For local backend testing, set VITE_API_URL=http://localhost:4000 in .env.local