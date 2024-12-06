import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8070' });

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    console.log(token)
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
export const updateEvent = async (id, formData) => {
    console.log(id, formData);
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    return await API.put(`/events/events/${id}`, formData, config);
};
export const deleteEvent = (id) => API.delete(`/events/events/${id}`);
export const login = (data) => API.post('/auth/login', data);
export const signup = async (userData) => {
    return await API.post(`/auth/signup`, userData);
};
