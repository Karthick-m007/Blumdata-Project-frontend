// src/Components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';

    // If not logged in as admin, redirect to the login page
    if (!isAdminLoggedIn) {
        return <Navigate to="/admin" />;
    }

    return <Outlet />; // Renders the protected route if admin is logged in
};

export default ProtectedRoute;
