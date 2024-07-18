import React, { useState, useEffect } from 'react';

export default function SeeAll() {
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_KEY}/api/v1/notifications`);
        const data = await response.json();
        setNotifications(data.result.reverse());
      } catch (error) {
        console.error('Failed to fetch notifications', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredNotifications = notifications.filter((notification) =>
    notification.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    if (a.message.toLowerCase().includes(searchTerm.toLowerCase())) return -1;
    if (b.message.toLowerCase().includes(searchTerm.toLowerCase())) return 1;
    return 0;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">All Notifications</h1>
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
          {sortedNotifications.map((notification) => (
            <li key={notification._id} className="p-4 border-b border-gray-200">
              <div className="text-gray-500 text-xs flex justify-between">
                <span>{new Date(notification.createdAt).toLocaleDateString()}</span>
                <span>{new Date(notification.createdAt).toLocaleTimeString()}</span>
              </div>
              <p className="text-sm mt-2">
                {notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ? (
                  <span >{notification.message}</span>
                ) : (
                  notification.message
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
 