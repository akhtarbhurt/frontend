import React from "react";
import {
  coverImage,
  insuranceImg,
  insuranceImg2,
  logo,
  parallax,
} from "../assets/images";
import Slider from "./Slider";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { AiOutlineMessage } from "react-icons/ai";
import Testamonial from "./Testamonial";
import Looter from "./Looter";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../App.css";
import { Button, Dropdown, Modal, Space } from "antd";
import axios from "axios";
import usecotextFunction from "../utils/useContext";
import { useGlobalContext } from "../utils/useContextApi";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;
import { RxHamburgerMenu } from "react-icons/rx";

export default function Home() {
  const [hamberg, setHamberg] = useState(true);
  const [hambergexp, setHambergexp] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isProfile, setIsProfile] = useState([]);
  const [warning, setWarning] = useState(null);
  const [inputname, setinputName] = useState("");
  const [categories, setCategories] = useState("");
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const [displaydatafromapi,setdisplaydatafromapi] = useState([])

  const navigate = useNavigate();
  const { heading, categorys, sections } = useGlobalContext();
  const {
    profile,
    setprofile,
    profilesrc,
    setprofilesrc,
    setDashboard,
    dashboard,
    name,
    setName,
  } = usecotextFunction();

  setprofile(localStorage.getItem("apnaconnectionprofile"));
  setprofilesrc(localStorage.getItem("tokenapnaconnection"));
  setDashboard(localStorage.getItem("apnaconnectionadmin"));
  // console.log("checking",profile,profilesrc,dashboard)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/`); // Adjust endpoint if necessary
        setIsProfile(response.data);
      } catch (err) {
        console.log("Error", err);
      }
    };
    fetchProfile();
  },  [isProfile]);

  // console.log("your profile is", isProfile._id)

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080"); // Adjust WebSocket URL if necessary

    ws.onopen = () => {
      // console.log('WebSocket connection established');
    };

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.type === "new-warning" && data.data.userID === isProfile._id) {
        setWarning(data.data.warningText);
        console.log("web socket is", data.data.warningText);
        setIsWarningVisible(true);
      }
    };

    ws.onclose = () => {
      // console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, [isProfile._id, isProfile]);

  const handleWarningOk = () => {
    setIsWarningVisible(false);
  };

  useEffect(() => {
    // ============profile===========

    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function hambergfunc() {
    setHamberg(false);
    setHambergexp(true);
  }

  function hambergfuncclose() {
    setHamberg(true);
    setHambergexp(false);
  }
  function onsubmitFetchingdata(e) {
    e.preventDefault();
    let companyname = inputname.toLowerCase();
    let categoryinput = categories.toLowerCase();
    console.log('categories is', categories.toLowerCase())
    console.log(companyname, categoryinput);

    const fetchUserReg = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_KEY}/api/v1/userReg`
        );

        let datas = response.data.result;
        console.log(datas);

        let getfiltereddata = datas?.filter((data,ind) => {
          
          return (

            categoryinput.trim() === data?.category?.toLowerCase().trim() &&
            data?.companyName?.toLowerCase().includes(companyname) 


          )
          
          
          
        });
        console.log("filtered data", getfiltereddata);
        setdisplaydatafromapi(getfiltereddata)
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserReg();
   
    // navigate(`/searchresultpage/${categories}`)
  }

  const items = [
    {
      key: "1",
      label: <Link to={"/userprofile"}>Profile</Link>,
    },
    {
      key: "2",
      label: <Link to={"/logout"}>LogOut</Link>,
    },
  ];


  // ===========modal===========
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setCategories("")
    setinputName("")
    
  };
  const handleCancel = () => {
   
    setIsModalOpen(false);
    setCategories("")
    setinputName("")
  };

  return (
    <>
      {/* ==========navbar========== */}

      <Modal
        title="Important Notice"
        visible={isWarningVisible}
        onOk={handleWarningOk}
        onCancel={handleWarningOk}
      >
        <p>{warning}</p>
      </Modal>

      <section className="  relative homepage font-poppins">
        <div className=" w-full h-screen">
          {heading?.map((elem, ind) => {
            return (
              <div key={ind}>
                <img
                  src={elem.bgImage}
                  alt=""
                  className="absolute h-[100vh] w-full top-0 left-0   z-0"
                />
              </div>
            );
          })}

          {/* <nav className={`xs:hidden md:flex w-full justify-evenly items-center  bg-navRgba ${isSticky ? 'fixed top-0 z-50 bg-white bg-opacity-100 shadow-md p-2' : 'xs:hidden md:flex w-full justify-between items-center absolute top 0 py-2  '}`}> */}
          <nav
            className={`xs:hidden lg:flex w-full justify-around items-center transition duration-500 ease-in-out ${
              isSticky
                ? "fixed top-0 z-50 bg-white bg-opacity-100 shadow-md p-2"
                : "absolute top-0 py-2 bg-navRgba"
            }`}
          >
            <div className=" md:w-3/12  lg:w-4/12 ">
              <Link to={"/"}>
                <img src={logo} alt="logo" className=" h-14 pt-1" />
              </Link>
            </div>
            <div className="flex md:w-5/12 gap-6  justify-end    items-center text-lg font-semibold capitalize  lg:w-5/12">
              <Link to={"/apnanews"} className="hover:text-orange-500 ">
                news
              </Link>

              {/* ==================expandprofile============= */}

              <Link
                to={"/businesshomepage"}
                className=" border-[1px] border-orange-500 p-2 cursor-pointer hover:bg-orange-500    hover:text-white"
              >
                for business
              </Link>

              {dashboard !== "false" && profile !== "false" ? (
                <Link to={"/admin"} className=" hover:text-orange-500">
                  {" "}
                  Dashboard
                </Link>
              ) : (
                ""
              )}

              {profile !== "false" ? (
                <Space direction="vertical">
                  <Space wrap>
                    <Dropdown
                      menu={{
                        items,
                      }}
                      placement="bottom"
                    >
                      <img
                        className=" h-[40px] w-[40px] cursor-pointer rounded-full"
                        src={profilesrc}
                        alt=""
                      />
                      {/* <Button>bottomq</Button> */}
                    </Dropdown>
                  </Space>
                </Space>
              ) : (
                <>
                  <Link to={"/login"} className=" hover:text-orange-500">
                    login
                  </Link>
                  <Link to={"/register"} className="hover:text-orange-500">
                    sign up
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* ========hamberg============= */}

          <nav className=" absolute z-50 block sm:block lg:hidden  right-0 ">
            {hamberg ? (
              <nav
                onClick={() => hambergfunc()}
                className=" bg-blue-500 text-white navhamberg cursor-pointer flex justify-end mr-5 mt-4 lg:hidden p-2  rounded-lg text-[32px]"
              >
                <RxHamburgerMenu className=" text-white" />
                {/* <div className=" h-[2.188rem] w-[2.188rem] border-2 border-black flex flex-col justify-around rounded-lg">
                  <p className=" w-full h-[0.063rem] border-[0.063rem] border-black"></p>
                  <p className=" w-full h-[0.063rem] border-[0.063rem] border-black"></p>
                  <p className=" w-full h-[0.063rem] border-[0.063rem] border-black"></p>
                </div> */}
              </nav>
            ) : (
              ""
            )}
            {/* {hambergexp ? (
              <div className="border-2 border-black bg-white w-screen h-[18.75rem] flex flex-col justify-around   pl-[0.125rem] md:hidden">
                <p className="">
                  <Link to={"/login"}>Login</Link>{" "}
                </p>
                <p className="">
                  <Link to={"/apnanews"}>News</Link>{" "}
                </p>
                <p className="">
                  <Link to={"/register"}>Signup</Link>
                </p>
                <p className="">
                  <Link to={"/businesshomepage"}> For Business </Link>
                </p>
                <p
                  onClick={() => hambergfuncclose()}
                  className=" text-[1.25rem] cursor-pointer "
                >
                  x
                </p>
              </div>
            ) : (
              ""
            )} */}
              {hambergexp && (
        <div className="border-2 border-black bg-blue-600 relative w-screen h-[12.75rem] flex flex-col justify-around px-[2.425rem] lg:hidden">
                    <p className="text-white"><Link className="cursor-pointer" to={"/"}>Home</Link></p>

          <p className="text-white"><Link className="cursor-pointer" to={"/apnanews"}>News</Link></p>

          <p><Link to={"/businesshomepage"} className="text-white cursor-pointer">For Business</Link></p>
          <p onClick={hambergfuncclose} className="text-[1.85rem] cursor-pointer mr-3 absolute right-1 top-2 text-white">x</p>
          {dashboard !== "false" &&
            <p className="text-white"><Link className="cursor-pointer" to={"/dashboard"}>Dashboard</Link></p>
          }
          {profile !== "false" ? (
            <Space direction="vertical">
              <Space wrap>
                <Dropdown
                  menu={{ items }}
                  placement="right"
                >
                  <img
                    className="h-[40px] w-[40px] cursor-pointer rounded-full"
                    src={profilesrc}
                    alt=""
                  />
                </Dropdown>
              </Space>
            </Space>
          ) : (
            <>
              <Link to={"/login"} className="hover:text-orange-500">Login</Link>
              <Link to={"/register"} className="hover:text-orange-500">Sign Up</Link>
            </>
          )}
        </div>
      )}
          </nav>

          <div
            className={`absolute z-10 w-[100%] top-[-2%] flex items-center justify-center lg:top-[5%] `}
          >
            <div className="mt-28">
              <div className=" hidden sm:hidden md:hidden lg:block ">
                {heading?.map((elem, ind) => {
                  return (
                    <div key={ind}>
                      <p className="text-4xl text-white font-bold text-center ">
                        {elem.mainHeading}
                      </p>
                      <p className="text-4xl text-white font-bold text-center">
                        {elem.mainText}
                      </p>
                    </div>
                  );
                })}
              </div>
              <form
                className={`border-white relative   flex flex-col sm:flex-col md:flex-col lg:flex-row lg:mt-10  justify-center `}
                onSubmit={onsubmitFetchingdata}
              >
                <input
                  type="text"
                  value={inputname}
                  className=" w-[100vw] sm:w-[100vw] md:w-[80vw] font-bold   lg:w-[30vw] p-3 bg-[#274D9A] bg-opacity-50 border border-white text-white placeholder-white"
                  placeholder="What are you looking for"
                  onChange={(e) => setinputName(e.target.value)}
                />
                <select
                  name=""
                  id=""
                  value={categories}
                  onChange={(e) => setCategories(e.target.value)} // Handle category change
                  className="w-[100vw] sm:w-[100vw] md:w-[80vw] font-bold lg:w-[30vw] mt-5 sm:mt-5 md:mt-5 lg:mt-0 p-3 bg-[#274D9A] bg-opacity-50 border border-white text-white"
                >
                  <option value="" selected defaultValue={true} disabled>
                    Select Category
                  </option>
                  {categorys?.map((elem, index) => (
                    <option key={index} value={elem.category}>
                      {" "}
                      {/* Use category value */}
                      {elem.category}
                    </option>
                  ))}
                </select>

                <div className="mx-3  mt-5 sm:mt-5 md:mt-5 lg:mt-0 ">
       
                <button
                  onClick={showModal}
                    type="submit"
                    className="bg-blue-700 text-white border border-blue-500 p-3 w-[100%] px-10 "
                  >
                 Search
                  </button>
      <Modal className=""  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
      footer={null}
      width={800}
      >
 {displaydatafromapi.length > 0 ? (
    displaydatafromapi.map((data, ind) => (
      <div key={ind} className=" mt-6" >
        <div className=" flex">
        <Link to={`publicreviewpage/${data._id}`} className="text-blue-600 text-[18px]">
          {data.companyName}
        </Link>
        <p className="mx-3 text-blue-600 text-[18px]">|</p>
        <p className="text-blue-600 text-[18px]">{data.siteLink}</p>
        </div>
        <div className="mt-2 text-blue-600 ">{data.description}</div>
      </div>
    ))
  ) : (
    <div>No data found</div>
  )}
        
      </Modal>
                </div>
              </form>
              {heading?.map((elem, ind) => {
                return (
                  <div key={ind}>
                    <div className=" hidden sm:hidden md:hidden lg:flex  w-[100%]   justify-center bg-[#274D9A] bg-opacity-50 px-3 text-white mt-10 p-5 ">
                      <div className=" w-[20vw] flex items-center  ">
                        <h3>{elem.apnaConnectionHeading}</h3>
                      </div>
                      <div className="w-[47vw]     ">
                        <p className="text-[14px]">{elem.apnaConnectionText}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className=" insurance-div     -top-32  max-w-6xl m-auto    relative z-10  ">
          <div className="text-white mb-7 text-2xl mx-4 md:mt-7 ">
            <h2>Explore Categories </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4   place-items-center">
            {/* {categorys?.map((elem, ind) => {
              return (
                <Link to={`/searchresultpage/${elem.category}`}>
                  <div key={ind}>
                    <div className=" w-[50vw] sm:w-[40vw] md:w-[40vw]  h-[18vh]  lg:w-[14vw] flex lg:h-[18vh] sm:mt-5 lg:mt-0 justify-evenly items-center flex-col bg-white border shadow-md capitalize hover:cursor-pointer  hover:scale-110 transform transition duration-1000 ease-in-out mb-4 hover:bg-blue-500 hover:text-white ">
                      <div className=" flex justify-center flex-col ">
                        <img
                          src={elem.catImage}
                          alt="insurance img"
                          className=" h-[30px]  "
                        />
                        <h3 className="mt-3 text-[13px] "> {elem.category} </h3>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })} */}
              {categorys?.slice(0, 6).map((elem, ind) => {
        return (
          <Link to={`/searchresultpage/${elem.category}`} key={ind}>
            <div>
              <div className="w-[50vw] sm:w-[40vw] md:w-[40vw] h-[18vh] lg:w-[14vw] flex lg:h-[18vh] sm:mt-5 lg:mt-0 justify-evenly items-center flex-col bg-white border shadow-md capitalize hover:cursor-pointer hover:scale-110 transform transition duration-1000 ease-in-out mb-4 hover:bg-blue-500 hover:text-white">
                <div className="flex justify-center flex-col">
                  <img
                    src={elem.catImage}
                    alt="insurance img"
                    className="h-[30px]"
                  />
                  <h3 className="mt-3 text-[13px]">{elem.category}</h3>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
          </div>
        </div>
      </section>

      <section className=" relative -top-12">
        <div className="w-full text-center">
          <button 
           
          className="bg-orange-500 rounded-sm p-2 text-white px-10 hover:scale-110 transform transition duration-1000 ease-in-out">
           <Link to={'/allcategories'}>   View All Categories</Link>
          </button>
        </div>
      </section>
      {sections?.map((elem, ind) => {
        return (
          <div key={ind}>
            <section className=" mt-6">
              <div className="parallax relative h-[60vh]">
                <img
                  src={elem.sectionImage}
                  className=" w-full h-full  z-0"
                  alt=""
                />
                <div className="absolute  top-16 sm:top-16 md:top-16 lg:top-32 left-10 w-[80%] sm:w-[80%] md:w-[80%] lg:w-[50%] z-10">
                  <h2 className=" text-white text-3xl">
                    {" "}
                    {elem.sectionHeading}{" "}
                  </h2>
                  <p className=" text-white text-md mt-5">{elem.sectionText}</p>
                  <button className="bg-orange-500 p-1 px-5 text-white mt-3 rounded-sm hover:scale-110 transform transition duration-1000 ease-in-out hover:bg-[#2267ae]">
                    {elem.sectionButtonText}
                  </button>
                </div>
              </div>
            </section>
          </div>
        );
      })}

      <section className="relative z-10">
        <Slider />
        <Testamonial />
      </section>
      <div>
        <Looter />
      </div>
    </>
  );
}
