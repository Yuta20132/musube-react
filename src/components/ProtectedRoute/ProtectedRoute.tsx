import React from 'react'
import { Navigate } from 'react-router-dom'
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem("access_token");
    
    if (!token) {
        // トークンがない場合、ログインページにリダイレクト
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute
