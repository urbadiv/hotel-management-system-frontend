import axios from 'axios';

// Initialize Axios instance
const API = axios.create({ baseURL: 'http://localhost:8070/order' });

// Add a request interceptor to include the Authorization token in every request
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    if (token) {
        req.headers.Authorization = `Bearer ${token}`; // Attach token to Authorization header
    }
    return req;
});

// Create a new order
export const createOrder = async (orderData) => {
    return await API.post('/create', orderData);
};

// Get all orders for the logged-in user
export const getOrdersByUser = async () => {
    return await API.get('/user');
};

// Get a specific order by ID
export const getOrderById = async (id) => {
    return await API.get(`/details/${id}`);
};

// Update an order by ID
export const updateOrder = async (id, updatedData) => {
    return await API.put(`/update/${id}`, updatedData);
};

// Delete an order by ID
export const deleteOrder = async (id) => {
    return await API.delete(`/delete/${id}`);
};
