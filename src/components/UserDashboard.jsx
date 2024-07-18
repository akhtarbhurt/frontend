import React, { useState, useEffect, useRef } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { profile } from "../assets/images";
import axios from "axios";
import { Button, Modal, Rate, Spin, notification, Dropdown, Menu } from "antd";
import "../App.css";

axios.defaults.withCredentials = true;

export default function UserDashboard() {
  const [togetdata, settogetdata] = useState({});
  const [reviewdata, setreviewdata] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState({});
  const [review, setreview] = useState("");
  const [rating, setrating] = useState(0);
  const [id, setid] = useState("");
  const [loading, setloading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    const storedNotifications =
      JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(storedNotifications);

    function apicallinglogin() {
      axios
        .get(`${import.meta.env.VITE_API_KEY}/api/v1/login`)
        .then((res) => {
          settogetdata(res.data.msg);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }

    apicallinglogin();
  }, []);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.current = ws;

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "new_reply") {
        const newNotification = {
          _id: data.data.notification._id,
          text: data.data.notification.text,
          createdAt: data.data.notification.createdAt,
          seen: false,
        };
        setNotifications((prev) => [...prev, newNotification]);
        notification.success({
          message: "New Reply",
          description: data.data.notification.text,
        });
      }
    };
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (togetdata._id) {
      apicalling();
    }
  }, [togetdata]);

  function apicalling() {
    axios
      .get(`${import.meta.env.VITE_API_KEY}/api/v1/userReviews/${togetdata._id}`)
      .then((res) => {
        setreviewdata(res.data.payload);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem("notifications", JSON.stringify(notifications));
    }
  }, [notifications]);

  const handleNotificationClick = () => {
    // Mark all notifications as seen
    const updatedNotifications = notifications.map((notif) => ({
      ...notif,
      seen: true,
    }));
    setNotifications(updatedNotifications);
    setDropdownVisible(!dropdownVisible);
  };

  const getTimeDifference = (createdAt) => {
    const prevDate = new Date(createdAt);
    if (isNaN(prevDate.getTime())) {
      return "Invalid Date";
    }
    const currentDate = new Date();
    const diffTime = currentDate - prevDate;
    const diffSeconds = Math.floor(diffTime / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffMonths / 12);

    if (diffYears > 0) return `${diffYears} years ago`;
    if (diffMonths > 0) return `${diffMonths} months ago`;
    if (diffDays > 0) return `${diffDays} days ago`;
    if (diffHours > 0) return `${diffHours} hours ago`;
    if (diffMinutes > 0) return `${diffMinutes} minutes ago`;
    return `${diffSeconds} seconds ago`;
  };

  const showModal = (review) => {
    setid(review._id);
    setCurrentReview(review);
    setreview(review.review);
    setrating(review.rating);
    setIsModalOpen(true);
  };

  function Deleteblogfunc(dele) {
    setloading(true);
    let id = dele._id;
    axios
      .delete(`${import.meta.env.VITE_API_KEY}/api/v1/reviews/${id}`, { id })
      .then((res) => {
        setloading(false);
        apicalling();
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setid("");
  };

  const handleupdatedatafunction = (e) => {
    setloading(true);
    e.preventDefault();
    axios
      .put(`${import.meta.env.VITE_API_KEY}/api/v1/reviews/${id}`, { review, rating })
      .then((res) => {
        apicalling();
        setid("");
      })
      .catch((err) => {
        console.log("err", err);
      });
    setloading(false);
    setIsModalOpen(false);
  };

  const handleRatingChange = (value) => {
    setrating(value);
  };

  const updatetextarea = (e) => {
    setreview(e.target.value);
  };

  const unseenNotificationsCount = notifications.filter(
    (notif) => !notif.seen
  ).length;

  const menu = (
    <Menu>
      <Menu.ItemGroup title="Notifications">
        {notifications.length > 0 ? (
          notifications.map((notif, index) => (
            <Menu.Item key={index}>
              {notif.text} - {getTimeDifference(notif.createdAt)}
            </Menu.Item>
          ))
        ) : (
          <Menu.Item>No new notifications</Menu.Item>
        )}
      </Menu.ItemGroup>
    </Menu>
  );

  return (
    <>
      <div className="bg-blue-700 h-[25vh] xs:px-3">
        <div className="max-w-4xl m-auto">
          <div className="flex justify-between items-center pt-16 text-white">
            <div className="flex gap-5 items-center">
              <img
                src={profile}
                className="object-contain h-20 w-20"
                alt="user profile"
              />
              <span className="text-nowrap">{togetdata.name}</span>
            </div>
            <div className="flex gap-3">
              <div>
                <div className="notifications-container  ">
                  <Dropdown
                    overlay={menu}
                    visible={dropdownVisible}
                    onVisibleChange={setDropdownVisible}
                    trigger={["click"]}
                    
                  >
                    <div onClick={handleNotificationClick}  >
                      <IoMdNotificationsOutline className="notification-icon text-2xl " />
                      {unseenNotificationsCount > 0 && (
                        <>
                        <span className="notification-badge">
                          {unseenNotificationsCount}
                        </span>
                         
                        </>
                      )}
                    
                    </div>
                  </Dropdown>
                  
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex gap-3 flex-col sm:flex-col md:flex-col lg:flex-row mt-10">
        <div className="w-full sm:w-full md:w-full lg:w-5/5">
          {reviewdata.map((data, ind) => (
            <div key={ind} className="shadow-lg p-2 mt-10 my-2">
              <div className="flex justify-between">
                <div className="flex gap-5 items-center">
                  <img
                    src={togetdata.profileImageURL}
                    alt="user profile"
                    className="h-20 w-20"
                  />
                  <div>
                    <p className="text-customOrange">{togetdata.name}</p>
                  </div>
                  <div className="flex flex-col gap-1 items-center">
                    <Rate
                      className="text-[18px]"
                      value={data.rating}
                      disabled
                    />
                  </div>
                </div>
                <div>
                  <p>{getTimeDifference(data.createdAt)}</p>
                </div>
              </div>
              <div className="mt-2">
                <p>{data.review}</p>
              </div>
              <div className="flex justify-between mt-3 userdashboardpopup">
                <div className="relative">
                  <MdDelete className="absolute top-2 left-1 text-white" />
                  <button
                    className="bg-red-500 p-1 px-5 rounded-sm text-white w-24"
                    id={data._id}
                    onClick={() => Deleteblogfunc(data)}
                  >
                    Delete
                  </button>
                  {loading ? <Spin className="ml-1" /> : ""}
                </div>
                <div className="bg-slate-500 flex gap-3 text-white p-1 items-center w-24 justify-center rounded-sm">
                  <FaEdit />
                  <Button
                    id={data._id}
                    className=""
                    type="primary"
                    onClick={() => showModal(data)}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Modal
          title="Edit Review"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleupdatedatafunction}>
              Save Changes
            </Button>,
          ]}
        >
          <form>
            <div className="flex flex-col items-start mb-4">
              <label htmlFor="review">Review</label>
              <textarea
                id="review"
                className="border p-2 rounded"
                value={review}
                onChange={updatetextarea}
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="rating">Rating</label>
              <Rate
                id="rating"
                className="text-[18px]"
                value={rating}
                onChange={handleRatingChange}
              />
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
}
