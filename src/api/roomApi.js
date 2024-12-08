import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8070' });

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    // console.log("Token:", token);
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

// Get all rooms
export const getRooms = () => API.get('/rooms/rooms');

// Get rooms by type (e.g., 'single', 'double', etc.)
export const getRoomsByType = (type) => API.get(`/rooms/rooms/type/${type}`);

// Get a room by ID
export const getRoomById = (id) => API.get(`/rooms/rooms/${id}`);

// Create a new room
export const createRoom = async (formData) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    return await API.post('/rooms/rooms', formData, config);
};

// Update an existing room
export const updateRoom = async (id, formData) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    return await API.put(`/rooms/rooms/${id}`, formData, config);
};

// Delete a room
export const deleteRoom = (id) => API.delete(`/rooms/rooms/${id}`);
