import axios from 'axios';
import { BASE_URL } from './baseurl';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = (data) => api.post('/auth/register', data);
export const verifyOtp = (data) => api.post('/auth/verify-otp', data);
export const loginUser = (data) => api.post('/auth/login', data);

export const updateProfile = (data) => api.put('/auth/profile', data);

export const getAllDestinations = () => api.get('/destinations');
export const createDestination = (data) => api.post('/destinations', data);
export const updateDestination = (id, data) =>
  api.put(`/destinations/${id}`, data);
export const deleteDestination = (id) => api.delete(`/destinations/${id}`);

export const createBooking = (data) => api.post('/bookings', data);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default api;
