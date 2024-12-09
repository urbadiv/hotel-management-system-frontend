import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../utils/auth';

const ProtectedRoute = ({ children, role }) => {
    if (!isAuthenticated() || (role && getUserRole() !== role)) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default ProtectedRoute;
