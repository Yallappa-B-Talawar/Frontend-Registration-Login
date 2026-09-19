import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { api } from '../services/api';

export default function ProtectedRoute({ children }) {
  const [authState, setAuthState] = useState({
    isLoading: true,
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    let isMounted = true;

    const verifySession = async () => {
      try {
        const userData = await api.getCurrentUser();
        if (isMounted) {
          setAuthState({
            isLoading: false,
            isAuthenticated: true,
            user: userData,
          });
        }
      } catch (err) {
        if (isMounted) {
          setAuthState({
            isLoading: false,
            isAuthenticated: false,
            user: null,
          });
        }
      }
    };

    verifySession();

    return () => {
      isMounted = false;
    };
  }, []);

  if (authState.isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center nextjs-bg px-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-2 border-neutral-300 border-t-black rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-neutral-500 tracking-tight">
            Verifying secure session...
          </p>
        </div>
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Pass authenticated user object to children
  return React.cloneElement(children, { user: authState.user });
}
