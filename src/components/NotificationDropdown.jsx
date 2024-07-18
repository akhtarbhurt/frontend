// NotificationDropdown.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotificationDropdown = React.forwardRef(({ notifications, markNotificationAsSeen, markAllAsSeen }, ref) => (
  <div
    ref={ref}
    className="absolute right-16 top-12 bg-white shadow-lg border rounded w-64 z-20"
  >
    <div className="flex justify-between items-center p-4 border-b">
      <span className="font-bold">Notifications</span>
      <button className="text-blue-500" onClick={markAllAsSeen}>
        Mark all as seen
      </button>
    </div>
    <div className="max-h-64 overflow-y-auto">
      {notifications?.map((notification) => (
        <div
          key={notification._id}
          className={`p-4 border-b cursor-pointer ${notification.seen ? 'bg-gray-100' : 'bg-white'}`}
          onClick={() => markNotificationAsSeen(notification._id)}
        >
          {notification?.message}
        </div>
      ))}
    </div>
    <div className="p-2 capitalize text-center border-t">
      <Link to="/user/seeAll" className="text-blue-500">See All</Link>
    </div>
  </div>
));

export default NotificationDropdown;
