import React, { useState, useEffect } from "react";
import "../App.css";
import { FaFacebookF } from "react-icons/fa";
import { TiSocialGooglePlus } from "react-icons/ti";
import { FaRegUserCircle } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { FaUnlock } from "react-icons/fa";
import { IMG60, regImage } from "../assets/images";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import { toast } from "react-toastify";
import { Spin } from "antd";
import usecotextFunction from "../utils/useContext";
axios.defaults.withCredentials = true;
// import usecotextFunction from ".";

const Register = () => {
  const [name, setName] = useState();
  const [email, setemail] = useState();
  const [loader, setloader] = useState(false);
  const [password, setpassword] = useState();
  const [confirmpassword, setconfirmpassword] = useState();
  const [file, setfile] = useState();
  const navigate = useNavigate();

  const {
    profile,
    setprofile,
    profilesrc,
    setprofilesrc,
    showLogin,
    setShowLogin,
  } = usecotextFunction();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_KEY}/api/v1/register`)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log("token not matched", err);
        // setprofile(false)
      });
  }, []);

  const handlesignupsubmit = (e) => {
    setloader(true);
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("confirmpassword", confirmpassword);
    formdata.append("profileImageURL", file || "../../public/vite.svg");

    axios
      .post(`${import.meta.env.VITE_API_KEY}/api/v1/register`, formdata)
      .then((res) => {
        console.log("signup", res.data);
        if (res.data.msg === "email already exist") {
          toast.error("email already exist");
          setloader(false);
        } else {
          setprofile(false);
          setShowLogin(false);
          setloader(false);
          toast.success("check your email for varification");
        }
      })
      .catch((err) => {
        console.log("register error", err);
        setloader(false);
        toast.error(err.response.data.msg);
      });
  };

  return (
    <>
      <Popup />
      <div className="">
        <div className=" h-full w-full overflow-hidden">
          <div className=" h-screen w-full flex justify-between overflow-hidden max-[768px]:flex-col">
            <div className=" min-[320px]:h-screen min-[1024px]:h-screen w-full  left flex flex-col justify-around max-[768px]:w-full">
              <div className="flex w-full justify-center items-center max-[768px]:flex-col">
                <div className=" w-9/12 flex justify-center ml-[27px] items-center max-[768px]:ml-[1px]">
                  <Link to={"/"}>
                    <img
                    className=" h-32"
                      src="https://www.apnaconnection.com/public/admin-panel/img/logo.png"
                      alt=""
                    />
                  </Link>
                </div>
                <div className=" w-3/12 flex justify-center ml-[13px] mt-[4px]  items-center cursor-pointer">
                  <Link className="w-2/12 text-[24px] font-bold" to={"/"}>
                    X
                  </Link>
                </div>
              </div>

              <form onSubmit={handlesignupsubmit} encType="multipart/form-data">
                <div className=" flex justify-center w-full mt-[5px]">
                  <div className=" w-2/12 flex items-center justify-center border-y-[1px]  border-s-[1px] border-solid h-[40px]">
                    <span>
                      <FaRegUserCircle className=" text-gray-600" />
                    </span>
                  </div>
                  <input
                    type="text"
                    aria-label="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    className=" w-7/12 border-y-[1px]  border-e-[1px] border-solid focus:outline-none  focus:border-s-[2px] focus:border-[#2363ab] focus:border-e-[2px] focus:border-y-[2px] max-[768px]:w-9/12"
                  />
                </div>

                <div className=" flex justify-center w-full mt-[10px]">
                  <div className=" w-2/12 flex items-center justify-center border-y-[1px]  border-s-[1px] border-solid h-[40px]">
                    <span>
                      <TfiEmail className=" text-gray-600" />
                    </span>
                  </div>
                  <input
                    type="email"
                    aria-label="email"
                    placeholder="Email"
                    onChange={(e) => setemail(e.target.value)}
                    className=" w-7/12 border-y-[1px]  border-e-[1px] border-solid focus:outline-none  focus:border-s-[2px] focus:border-[#2363ab] focus:border-e-[2px] focus:border-y-[2px] max-[768px]:w-9/12"
                  />
                </div>

                <div className=" flex justify-center w-full mt-[10px]">
                  <div className=" w-2/12 flex items-center justify-center border-y-[1px]  border-s-[1px] border-solid h-[40px]">
                    <span>
                      <img src={IMG60} className="h-[20px] w-[20px]" alt="" />
                    </span>
                  </div>
                  <input
                    type="password"
                    onChange={(e) => setpassword(e.target.value)}
                    aria-label="password"
                    placeholder="Password"
                    className=" w-7/12 border-y-[1px]  border-e-[1px] border-solid focus:outline-none  focus:border-s-[2px] focus:border-blue-600 focus:border-e-[2px] focus:border-y-[2px] max-[768px]:w-9/12"
                  />
                </div>

                <div className=" flex justify-center w-full mt-[10px]">
                  <div className=" w-2/12 flex items-center justify-center border-y-[1px]  border-s-[1px] border-solid h-[40px]">
                    <span>
                      <img src={IMG60} alt="" className=" h-[20px] w-[20px]" />
                    </span>
                  </div>
                  <input
                    type="text"
                    onChange={(e) => setconfirmpassword(e.target.value)}
                    aria-label="text"
                    placeholder="Confirm Password"
                    className=" w-7/12 border-y-[1px]  border-e-[1px] border-solid focus:outline-none  focus:border-s-[2px] focus:border-[#2363ab] focus:border-e-[2px] focus:border-y-[2px] max-[768px]:w-9/12"
                  />
                </div>

                <div className="flex justify-center w-full   mt-[10px]">
                  <input
                    type="file"
                    name="profileImageURL"
                    onChange={(e) => setfile(e.target.files[0])}
                    className=" w-9/12"
                  />
                </div>
                <button
                  type="submit"
                  className=" min-[320px]:mt-[7px] flex justify-center w-full min-[1024px]:mt-[10px]"
                >
                  <p className=" w-8/12 flex cursor-pointer items-center justify-center bg-[#3c5a9a] text-white p-[10px] rounded-lg">
                    <p>
                      {" "}
                      <span className=" font-bold">Register Now!</span>{" "}
                    </p>
                  </p>
                </button>
              </form>
              {loader ? (
                <div className=" text-center">
                  <div className="example">
                    <Spin />
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className=" min-[320px]:translate-y-[4px] w-full flex justify-center min-[1024px]:mt-[0px] min-[768px]:translate-y-[0px]">
                <p className=" text-sm text-gray-400">
                  Already have an account?
                  <Link to={"/login"} className=" text-[#2363ab]">
                    {" "}
                    Sign In!
                  </Link>
                </p>
              </div>
              <p className=" text-center font-semibold  min-[769px]:block min-[768px]:translate-y-[6px]">
                © 2024 Apna Connection
              </p>
            </div>

            <div className=" overflow-hidden min-[320px]:hidden min-[1024px]:block h-full w-8/12 right max-[768px]:w-full">
              <img
                className="overflow-hidden w-full h-[39.58rem]"
                src={regImage}
                alt=""
              />
            </div>
          </div>
          {/* <p className=' translate-y-[-4px] block text-center min-[769px]:hidden '>© 2024 Apna Connection</p> */}
        </div>
      </div>
    </>
  );
};

export default Register;
