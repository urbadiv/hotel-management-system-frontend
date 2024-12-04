import {jwtDecode} from 'jwt-decode';

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
};

export const getUserRole = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decoded = jwtDecode(token);
    return decoded.role;
};

export const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
};
