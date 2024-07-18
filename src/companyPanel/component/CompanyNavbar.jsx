import React, { useState, useEffect, useRef } from "react";
import { IoIosNotifications } from "react-icons/io";
import { profilePic } from "../../assets/images";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

export default function CompanyNavbar({ handleTabs }) {
  const [isProfileActive, setIsProfileActive] = useState(false);
  const [isNotificationActive, setIsNotificationActive] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const profileDropdownRef = useRef(null);
  const profileButtonRef = useRef(null);
  const notificationDropdownRef = useRef(null);
  const notificationButtonRef = useRef(null);
  const [companyID, setCompanyID] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const companyIDResponse = await axios.get(
          `${import.meta.env.VITE_API_KEY}/api/v1/companyLogin`
        );
        const companyID = companyIDResponse.data.result._id;
        setCompanyID(companyID);

        const response = await axios.get(
          `${import.meta.env.VITE_API_KEY}/api/v1/notifications/${companyID}`
        );
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };

    fetchNotifications();
  }, []);

  // WebSocket setup
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("Connected to WebSocket");
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "new_notification") {
        setNotifications((prev) => [message.data, ...prev]);
      }
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket");
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleMarkAsSeen = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_KEY}/api/v1/notifications/mark-as-seen/${id}`
      );
      setNotifications((notifications) =>
        notifications.map((notification) =>
          notification._id === id
            ? { ...notification, seen: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as seen", error);
    }
  };

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

  const handleProfileClick = () => {
    setIsProfileActive((prev) => !prev);
  };

  const handleNotificationClick = async () => {
    setIsNotificationActive((prev) => !prev);

    // If opening the dropdown, mark all notifications as seen
    if (!isNotificationActive && companyID) {
      try {
        await axios.put(
          `${import.meta.env.VITE_API_KEY}/api/v1/notifications/mark-all-as-seen`,
          { companyID }
        );
        setNotifications((notifications) =>
          notifications.map((notification) => ({ ...notification, seen: true }))
        );
      } catch (error) {
        console.error("Failed to mark all notifications as seen", error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_KEY}/api/v1/companyLogout`,
        {},
        { withCredentials: true }
      );
      message.success("Logout successful");
      window.location.href = "/companyLogin";
    } catch (error) {
      console.error("Logout error:", error);
      message.error("Logout failed: An unknown error occurred");
    }
  };

  return (
    <div className="capitalize flex justify-between items-center p-3 bg-white">
      <h1 className="text-blue-500 text-sm sm:text-sm md:text-sm lg:text-2xl hidden sm:hidden md:hidden lg:block">
        Welcome John Doe!
      </h1>
      <div className="flex-grow flex justify-center">
        <input
          type="text"
          className="border border-gray-300 p-2 rounded-2xl px-5 w-[50%] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-300 hidden sm:hidden md:hidden lg:block"
          placeholder="Search anything..."
        />
      </div>
      <div className="flex gap-6 items-center relative">
        <div
          ref={notificationButtonRef}
          className="relative cursor-pointer"
          onClick={handleNotificationClick}
        >
          <IoIosNotifications className="text-2xl text-gray-600" />
          <span className="bg-blue-500 rounded-full h-4 p-2 flex justify-center items-center absolute -top-1 -right-2 text-[10px] text-white">
            {notifications?.filter((notification) => !notification.seen)?.length || 0}
          </span>
        </div>
        <div
          ref={profileButtonRef}
          className="flex items-center gap-3 cursor-pointer relative"
          onClick={handleProfileClick}
        >
          <img
            src={profilePic}
            alt="Profile pic"
            className="h-10 w-10 rounded-full object-cover border border-gray-300"
          />
          <p className="text-sm sm:text-sm md:text-sm lg:text-lg">John Doe</p>
        </div>

        {/* Profile Dropdown */}
        <div
          ref={profileDropdownRef}
          className={`absolute top-14 right-0 z-10 bg-white w-[200px] rounded-md shadow-md border px-4 py-2 cursor-auto transform transition-transform duration-300 ease-in-out ${
            isProfileActive ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
          } origin-top`}
        >
          <ul>
            <Link to={"/companyPanel/companyProfile"}>
              <li
                className="mb-3 hover:text-customOrange cursor-pointer transition-colors duration-300"
                onClick={() => handleTabs("profile")}
              >
                Profile
              </li>
            </Link>
            <hr className="w-full mb-3" />
            <Link to={'/companyPanel/profile'} >
            <li
                className="mb-3 hover:text-customOrange cursor-pointer transition-colors duration-300"
                onClick={() => handleTabs("profile")}
              >
                change password
              </li>
            </Link>
            <li
              className="hover:text-customOrange cursor-pointer transition-colors duration-300"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>

        {/* Notification Dropdown */}
        <div
          ref={notificationDropdownRef}
          className={`absolute top-14 right-14 z-10 bg-white w-[250px] rounded-md shadow-md border px-4 py-2 cursor-auto transform transition-transform duration-300 ease-in-out ${
            isNotificationActive
              ? "scale-y-100 opacity-100"
              : "scale-y-0 opacity-0"
          } origin-top`}
        >
          <ul className=" h-[20vh] overflow-x-auto ">
            {notifications?.length > 0 ? (
              notifications?.map((notification) => (
                <li
                  key={notification._id}
                  className={`flex flex-col gap-2 mb-2 p-2 border-b cursor-pointer ${
                    notification.seen ? "bg-gray-100" : "bg-white"
                  }`}
                  onClick={() => handleMarkAsSeen(notification._id)}
                >
                  <span>{notification.message}</span>
                  <small className="text-gray-500">
                    {new Date(notification.createdAt).toLocaleString()}
                  </small>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No notifications</li>
            )}
          </ul>
          <Link to={"/companyPanel/companyNotification"}>
            <div className="text-center p-2 flex items-center justify-center ">
              see all
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
