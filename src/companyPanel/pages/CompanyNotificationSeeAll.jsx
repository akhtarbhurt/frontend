import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CompanyNotificationSeeAll() {
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const companyIDResponse = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/companyLogin`);
        const companyID = companyIDResponse.data.result._id;

        const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/notifications/${companyID}`);
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
        setError("Failed to fetch notifications");
      }
    };

    fetchNotifications();

    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'new_notification') {
        setNotifications((prevNotifications) => [data.data, ...prevNotifications]);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredNotifications = notifications?.filter((notification) =>
    notification.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedNotifications = [...filteredNotifications]?.sort((a, b) => {
    if (a.message.toLowerCase().includes(searchTerm.toLowerCase())) return -1;
    if (b.message.toLowerCase().includes(searchTerm.toLowerCase())) return 1;
    return 0;
  });
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">All Notifications</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search notifications..."
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>
      <div className="bg-white shadow rounded-lg p-4">
        <ul className="space-y-4">
          {sortedNotifications?.map((notification) => (
            <li key={notification._id} className="p-4 border-b border-gray-200">
              <div className="text-gray-500 text-xs flex justify-between">
                <span>{new Date(notification.createdAt).toLocaleDateString()}</span>
                <span>{new Date(notification.createdAt).toLocaleTimeString()}</span>
              </div>
              <p className="text-sm mt-2">{notification.message}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
