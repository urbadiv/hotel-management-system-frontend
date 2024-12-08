import axios from 'axios';

// Initialize Axios instance
const API = axios.create({ baseURL: 'http://localhost:8070/booking' });

// Add a request interceptor to include the Authorization token in every request
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    if (token) {
        req.headers.Authorization = `Bearer ${token}`; // Attach token to Authorization header
    }
    return req;
});

// Create a new booking
export const createBooking = async (bookingData) => {
    return await API.post('/bookings', bookingData);
};

// Get all bookings for the logged-in user
export const getBookingsByUser = async () => {
    return await API.get('/bookings');
};

// Get a specific booking by ID
export const getBookingById = async (id) => {
    return await API.get(`/bookings/${id}`);
};

// Update a booking
export const updateBooking = async (id, updatedData) => {
    return await API.put(`/bookings/${id}`, updatedData);
};

// Delete a booking
export const deleteBooking = async (id) => {
    return await API.delete(`/bookings/${id}`);
};
