import usecotextFunction from '../utils/useContext';
import React, { useState, useEffect } from 'react';
import { coverImage, insuranceImg, insuranceImg2, logo, parallax } from '../../src/assets/images';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Space } from "antd";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [hambergexp, setHambergexp] = useState(false);
  const [hamberg, setHamberg] = useState(true);
  const { profile, setprofile, profilesrc, setprofilesrc, dashboard, setDashboard } = usecotextFunction();

  useEffect(() => {
    setprofile(localStorage.getItem("apnaconnectionprofile"));
    setprofilesrc(localStorage.getItem("tokenapnaconnection"));
    setDashboard(localStorage.getItem("apnaconnectionadmin"));
  }, [setprofile, setprofilesrc, setDashboard]);

  const items = [
    {
      key: "1",
      label: <Link to={"/userprofile"}>Profile</Link>,
    },
    {
      key: "2",
      label: <Link to={"/logout"}>LogOut</Link>,
    }
  ];

  useEffect(() => {
    const debounce = (func, wait) => {
      let timeout;
      return function (...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    };

    const handleScroll = debounce(() => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
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

  return (
    <div className='h-full shadow-lg'>
      <nav className={`xs:hidden lg:flex w-full justify-evenly pb-3 items-center pt-4 ${isSticky ? 'fixed top-0 z-50 bg-white shadow-md pt-4 pb-4 sticky-navbar' : ''}`}>
        <div className='lg:w-4/12'>
          <Link to={'/'}>
            <img src={logo} className="h-12" alt="" />
          </Link>
        </div>
        <ul className="flex text-lg items-center lg:w-5/12 justify-end gap-6">
          <li><Link to={'/apnanews'} className='font-bold hover:text-orange-500'>News</Link></li>
          <li>
            <div>
              <Link to={'/businesshomepage'}>
                <button className="border border-customOrange p-2 text-black font-bold hover:bg-orange-500 hover:text-white">For Business</button>
              </Link>
            </div>
          </li>
          {profile !== "false" && dashboard !== "false" &&
            <li className='font-bold'>
              <Link to={'/admin'} className='hover:text-orange-500'>Dashboard</Link>
            </li>
          }
          {profile !== "false" ? (
            <Space direction="vertical">
              <Space wrap>
                <Dropdown
                  menu={{ items }}
                  placement="bottom"
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
              <Link to={"/login"} className="hover:text-orange-500 font-bold">Login</Link>
              <Link to={"/register"} className="hover:text-orange-500 font-bold">Sign Up</Link>
            </>
          )}
        </ul>
      </nav>
      {hamberg && (
        <nav onClick={hambergfunc} 
        className='navhamberg  cursor-pointer flex justify-end mr-4 mt-4 lg:hidden text-[32px] '>
          <div className=' bg-blue-500 rounded-md p-3'>
          <RxHamburgerMenu  className='  text-white'/>
          </div>
        </nav>
      )}
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
    </div>
  );
}
