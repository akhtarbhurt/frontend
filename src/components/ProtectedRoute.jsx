import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(null);

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/companyLogin`, {
          withCredentials: true, // Ensure cookies are sent
        });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div className=' min-h-screen flex justify-center items-center ' >Loading...</div>; // or a spinner/loader
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/companyLogin" />;
};

export default ProtectedRoute;
