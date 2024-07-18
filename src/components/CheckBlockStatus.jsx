import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const CheckBlockStatus = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(null);
    const [checkStatus, setCheckStatus] = useState([])
  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/`, {
          withCredentials: true, // Ensure cookies are sent
        });
        setCheckStatus(response.data)
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);
  
  if (checkStatus.status === "block") {
    return <div>you are not allowed to access</div>; // or a spinner/loader
  }

  return checkStatus.status === "block" ? <Outlet /> : <Navigate to="/login" />;
};

export default CheckBlockStatus;
