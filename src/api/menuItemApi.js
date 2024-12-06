import axios from 'axios';

// Create an Axios instance
const API = axios.create({ baseURL: 'http://localhost:8070/menuItems' });

// Add an interceptor to include the authorization token in all requests
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

// API methods for menu items

// Get all menu items
export const getAllMenuItems = () => API.get('/menu-items');

// Get menu items by type (e.g., 'Breakfast', 'Lunch', 'Dinner')
export const getMenuItemsByType = (type) => API.get(`/menu-items/type/${type}`);

// Get a menu item by ID
export const getMenuItemById = (id) => API.get(`/menu-items/${id}`);

// Create a new menu item
export const createMenuItem = async (formData) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    return await API.post('/menu-items', formData, config);
};

// Update an existing menu item
export const updateMenuItem = async (id, formData) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    return await API.put(`/menu-items/${id}`, formData, config);
};

// Delete a menu item
export const deleteMenuItem = (id) => API.delete(`/menu-items/${id}`);
