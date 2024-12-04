import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8070' });

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export const getEvents = () => API.get('/events/events');
export const getAdminEvents = () => API.get('/events/events?admin=true');
// export const createEvent = (data) => API.post('/events/events', data);
export const createEvent = async (formData) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    return await API.post('/events/events', formData, config);
};
export const updateEvent = (id, data) => API.put(`/events/events/${id}`, data);
export const deleteEvent = (id) => API.delete(`/events/events/${id}`);
export const login = (data) => API.post('/auth/login', data);
export const signup = async (userData) => {
    try {
        const response = await fetch('/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
};

