import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../AuthContext';
import { RingLoader } from 'react-spinners';

export const AuthRedirect = ({ children }) => {
    const { user, isLoading, isAuthenticated } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate('/signin');
        }
    }, [isLoading, isAuthenticated, navigate]);

    if (isLoading) {
        <div className="flex justify-center items-center h-screen w-screen">
            <RingLoader color="#0362e9" size={120} />
        </div>
    }
    if (!isAuthenticated) return null;

    return children;
};