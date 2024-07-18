import React, { useState, useEffect, useRef } from "react";
import { IoIosNotifications } from "react-icons/io";
import { profilePic } from "../../assets/images";
import { Link } from "react-router-dom";

export default function AdminNavbar() {
  const [isProfileActive, setIsProfileActive] = useState(false);
  const [isNotificationActive, setIsNotificationActive] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const profileDropdownRef = useRef(null);
  const profileButtonRef = useRef(null);
  const notificationDropdownRef = useRef(null);
  const notificationButtonRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      profileDropdownRef.current &&
      !profileDropdownRef.current.contains(event.target) &&
      profileButtonRef.current &&
      !profileButtonRef.current.contains(event.target)
    ) {
      setIsProfileActive(false);
    }

    if (
      notificationDropdownRef.current &&
      !notificationDropdownRef.current.contains(event.target) &&
      notificationButtonRef.current &&
      !notificationButtonRef.current.contains(event.target)
    ) {
      setIsNotificationActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/notifications");
        const data = await response.json();
        setNotifications(data.result);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
  
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'review_report') {
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          data.data.notification // Ensure the notification data is accessed correctly
        ]);
      }
    };
    
  
    return () => {
      socket.close();
    };
  }, []);

  const markNotificationAsSeen = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/v1/notifications/${id}/seen`, {
        method: 'PUT'
      });

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === id ? { ...notification, seen: true } : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as seen:", error);
    }
  };

  const markAllAsSeen = async () => {
    try {
      await fetch('http://localhost:3000/api/v1/notifications/markAllSeen', {
        method: 'PUT'
      });

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          seen: true
        }))
      );
    } catch (error) {
      console.error("Error marking all notifications as seen:", error);
    }
  };

  return (
    <div className="w-full flex justify-between items-center bg-white p-4 border-b">
      <div className="font-bold text-lg">Admin Panel</div>
      <div className="flex items-center space-x-4">
        <button
          className="relative"
          ref={notificationButtonRef}
          onClick={() => setIsNotificationActive((prev) => !prev)}
        >
          <IoIosNotifications className="text-2xl" />
          {notifications.some((notification) => !notification.seen) && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          )}
        </button>
        <button
          className="flex items-center"
          ref={profileButtonRef}
          onClick={() => setIsProfileActive((prev) => !prev)}
        >
          <img src={profilePic} alt="Profile" className="w-8 h-8 rounded-full" />
          <span className="ml-2">Admin</span>
        </button>
      </div>

      {isNotificationActive && (
        <div
          ref={notificationDropdownRef}
          className="absolute right-16 top-12 bg-white shadow-lg border rounded w-64 z-20 "
        >
          <div className="flex justify-between items-center p-4 border-b">
            <span className="font-bold">Notifications</span>
            <button
              className="text-blue-500"
              onClick={markAllAsSeen}
            >
              Mark all as seen
            </button>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className={`p-4 border-b cursor-pointer ${notification.seen ? 'bg-gray-100' : 'bg-white'}`}
                onClick={() => markNotificationAsSeen(notification._id)}
              >
                {notification.message}
              </div>
            ))}
            
          </div>
          <div className=" p-2 capitalize text-center border-t">
              <Link to="/admin/seeAll" className="text-blue-500">See All</Link>
            </div>
        </div>
      )}

      {isProfileActive && (
        <div
          ref={profileDropdownRef}
          className="absolute right-4 top-12 bg-white shadow-lg border rounded w-48"
        >
          <Link to="/profile" className="block p-4 border-b">Profile</Link>
          <Link to="/changePassword" className="block p-4 border-b">Change Password</Link>
          <button className="block w-full text-left p-4">Logout</button>
        </div>
      )}
    </div>
  );
}
