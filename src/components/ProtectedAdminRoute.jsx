import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedAdminRoute() {
  const [isAdmin, setIsAdmin] = useState(null); // Use null to indicate loading state
  const [loading, setLoading] = useState(true); // Separate loading state

  useEffect(() => {
    const checkAdminRoute = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/`);
        setIsAdmin(response.data);
      } catch (error) {
        console.error('Error checking admin route:', error);
      } finally {
        setLoading(false);
      }
    };
    checkAdminRoute();
  }, []);

  if (loading) {
    return <div className='min-h-screen flex justify-center items-center'>Loading...</div>;
  }

  return isAdmin?.role === "admin" ? <Outlet /> : <Navigate to="/" />;
}
