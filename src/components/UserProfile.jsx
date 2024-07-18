import React from "react";
import Navbar from "./Navbar";
import axios from "axios";
import usecotextFunction from "../utils/useContext";
axios.defaults.withCredentials = true;
import { useState, useEffect } from "react";
import { logo } from "../assets/images";
import { Spin } from "antd";
import Popup from "./Popup";
import { toast } from "react-toastify";



const UserProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newpassword,setNewPassword] = useState("")
  const [confirmpassword,setConfirmPassword] = useState("")
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const [loader, setLoader] = useState(false);
  const [id, setId] = useState('');
  const { profile, setprofile, profilesrc, setprofilesrc } =
    usecotextFunction();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_KEY}/api/v1/profile`)
      .then((res) => {
        console.log("token matched", res.data.user, "statevalue");
        setName(res.data.user.name)
        setEmail(res.data.user.email)
        setprofile(true);
        setprofilesrc(res.data.user.profileImageURL);
        console.log("setprofilesrc", profilesrc);
        setId(res.data.user._id);
        console.log( "my real id is", id)
      })
      .catch((err) => {
        console.log("token not matched", err);
        setprofile(false);
      });
  }, [ id]);

  const handleprofileupdate = (e) => {
    e.preventDefault();
    if (email) {
      setLoader(true);
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("newpassword", newpassword);
      formdata.append("confirmpassword", confirmpassword);
      formdata.append("profileImageURL", file || profilesrc);
      axios.post(`${import.meta.env.VITE_API_KEY}/api/v1/profile/${id}`, formdata)
      .then((res) => {
        console.log("profile", res);
        localStorage.setItem("tokenapnaconnection", res.data.user.profileImageURL);
        setLoader(false);
        toast.success("Profile updated successfully");
      })
      .catch((err) => {
        console.log("profile error", err.response.data.msg);
        alert(err.response.data.msg)
        // toast.error(err.response.data.msg);

        setLoader(false);
        if (err.response && err.response.data.msg) {
          toast.error(err.response.data.msg);
        } else {
          toast.error("An error occurred");
        }
      });
  } else {
    alert("Please enter email");
  }
  };
  return (
    <>
      <Navbar />
      <div className=" mt-[81px] w-full h-screen flex justify-center items-center">
        <form
          onSubmit={handleprofileupdate}
          encType="multipart/form-data"
          className=" border-[3px] border-blue-500 shadow-lg   xs:w-full xs:h-5/6 lg:flex lg:justify-around lg:w-6/12 lg:h-4/5 items-center"
        >
          <div className=" md:flex md:items-center lg:block">
            <div className="xs:h-[100px] xs:w-[100px] lg:h-[200px] lg:w-[200px] rounded-full  bg-slate-400 flex justify-around items-center  flex-col">
              <img src={profilesrc} alt="" className="h-[150px] w-[150px]" />
            </div>
            <div className=" mt-3">
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            </div>
          </div>

          <div className="xs:w-full lg:w-6/12">
            <div className=" w-full">
              <div className=" w-full flex justify-center mt-4 items-center">
                <label htmlFor="name" className=" mr-3 w-3/12">
                  <strong>Name</strong>
                </label>
                <input
                  type="name"
                  placeholder="Enter Name"
                  //   autoComplete="off"
                  value={name}
                  aria-label="name"
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  className="form-control border-2 rounded-0  w-8/12 p-1"
                />
              </div>
              <div className=" w-full flex justify-center mt-4 items-center">
                <label htmlFor="email" className=" mr-3 w-3/12">
                  <strong>Email</strong>
                </label>
                <input
                value={email}
                  type="email"
                  placeholder="Enter Email"
                  aria-label="email"
                  onChange={(e) => setEmail(e.target.value)}
                  //   autoComplete="off"
                  name="email"
                  className="form-control border-2 rounded-0 w-8/12 p-1"
                />
              </div>
              <div className=" w-full flex justify-center mt-4 items-center">
                <label htmlFor="password" className=" mr-3 w-3/12 ">
                  <strong>Current Password</strong>
                </label>
                <input
                  type="password"
                  placeholder="Update password"
                  aria-label="password"
                  onChange={(e) => setPassword(e.target.value)}
                  //   autoComplete="off"
                  name="password"
                  className="form-control border-2 rounded-0 w-8/12 p-1"
                />
              </div>
              <div className=" w-full flex justify-center mt-4 items-center">
                <label htmlFor="password" className=" mr-3 w-3/12 ">
                  <strong>New Password</strong>
                </label>
                <input
                  type="newpassword"
                  placeholder="Update newpassword"
                  aria-label="newpassword"
                  onChange={(e) => setNewPassword(e.target.value)}
                  //   autoComplete="off"
                  name="newpassword"
                  className="form-control border-2 rounded-0 w-8/12 p-1"
                />
              </div>
              <div className=" w-full flex justify-center mt-4 items-center">
                <label htmlFor="password" className=" mr-3 w-3/12 ">
                  <strong>Confirm Password</strong>
                </label>
                <input
                  type="confirmpassword"
                  placeholder="Update confirmpassword"
                  aria-label="confirmpassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  //   autoComplete="off"
                  name="confirmpassword"
                  className="form-control border-2 rounded-0 w-8/12 p-1"
                />
              </div>
              <div className=" w-full flex justify-center mt-4 items-center">
                <button
                  type="submit"
                  className="bg-blue-600 p-2 text-white w-10/12 rounded-lg hover:bg-orange-500"
                >
                  Send
                </button>
              </div>

              <div>
                <img
                  src={logo}
                  className=" w-8/12 ml-auto mr-auto h-16 mt-3"
                  alt=""
                />
              </div>

              {loader ? (
                <div className="example text-center mt-1">
                  <Spin />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};











export default UserProfile;
