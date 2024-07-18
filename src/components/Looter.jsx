import React from "react";
import { logo2 } from '../../src/assets/images';
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import usecotextFunction from '../utils/useContext';
axios.defaults.withCredentials = true;
export default function Looter() {
  const { profile, setprofile,profilesrc, setprofilesrc } = usecotextFunction();

  return (
    <>
      <footer className="bg-[#082359] h-full p-5 flex items-center text-white ">
        <div className="w-full md:max-w-5xl m-auto ">
          <div className=" grid grid-cols-2 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 ">
            <div className="  lg:w-full">
            <Link to={'/'}>  <img src={logo2} alt="" /></Link>
              <p className="mt-5 text-[0.813rem] md:ml-[4.375rem]">
                 virtually connection dolor sit amet, consectetur adipiscing elit,{" "}
              </p>
              <p className="text-[0.813rem] md:ml-[4.375rem]">sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
              <p className="mt-5 text-[0.813rem] md:ml-[4.375rem]">Copyright © 2022 apnaconnection.com</p>
            </div>
            <div className="mt-[2.438rem] flex items-start justify-end w-full md:mt-[0px]  ">
                <div className="w-full  md:w-6/12">
              <h2 className="text-lg font-bold mb-[1.25rem] text-center md:text-start">Quick Links</h2>
                <p className="mt-3  hover:no-underline hover:text-orange-500 text-center md:text-start"><Link to={'/about'}>About us</Link> </p>
                <p className="mt-3  hover:no-underline hover:text-orange-500 text-center md:text-start"><Link to={'/faq'}>Faq</Link> </p>
                <p className="mt-3  hover:no-underline hover:text-orange-500 text-center md:text-start"> My account </p>
                {profile !== "false"?
                <p className="mt-3  hover:no-underline hover:text-orange-500 text-center md:text-start"> <Link to={'/'}> Home </Link></p>:
                <p className="mt-3  hover:no-underline hover:text-orange-500 text-center md:text-start"> <Link to={'/register'}> Create account </Link></p>
              }
                <p className="mt-3  hover:no-underline hover:text-orange-500 text-center md:text-start"><Link to = {'/contact'} className =' cursor-pointer'>Contacts </Link> </p>
                </div>
            </div>
            <div className=" my-[2.438rem] flex items-start justify-center w-full md:mt-[0px] ">
                <div className="w-full  md:w-7/12 ">
              <h2 className="text-lg font-bold">Get To Know Us</h2>
              <ul className="mt-5">
                <li className="mt-6  hover:text-orange-500 transition duration-300 ease-in-out hover:no-underline"><Link to={'/mission'}> Our mission </Link></li>
                <li className="mt-6  hover:text-orange-500 transition duration-300 ease-in-out hover:no-underline"> <Link to={'/contact'}> Our team </Link></li>
                <li className="mt-6  hover:text-orange-500 transition duration-300 ease-in-out hover:no-underline"> Terms of service </li>
                <li className="mt-6  hover:text-orange-500 transition duration-300 ease-in-out hover:no-underline"> Privacy policy </li>
              </ul>
              </div>
            </div>
            <div className=" mb-[2.438rem] max-[768px]:mt-[2.5rem] lg:mt-[0px]">
              <div className=" flex justify-center items-center flex-col md:justify-start md:items-start"> 
                <h2 className=" text-lg font-bold capitalize ">subscribe</h2>
                <input
                
                aria-label="text"
                  type="text"
                  placeholder="enter your email"
                  className="mt-5 p-2 rounded-md w-[35vw] md:w-[20vw] text-black "
                />
              </div>
              <div className=" flex justify-center md:justify-start">
              <button className="bg-orange-500 mt-5 p-2 rounded-md w-[35vw] md:w-[12vw] capitalize text-white font-bold hover:bg-[#2267ae] hover:scale-110 transform transition duration-1000 ease-in-out">
                subscribe
              </button>
              </div>
              <div className="mt-5 flex justify-center items-center flex-col md:justify-start md:items-start">
                <h3 className="text-md font-bold capitalize"> get in touch </h3>
                <div className=" flex gap-2 mt-5 ">
                  <FaFacebookSquare className=" cursor-pointer hover:scale-125 transform transition duration-1000 ease-in-out hover:text-blue-800"/>
                  <FaTwitter className=" cursor-pointer hover:scale-125 transform transition duration-1000 ease-in-out hover:text-cyan-600"/>
                  <FaLinkedin className=" cursor-pointer hover:scale-125 transform transition duration-1000 ease-in-out hover:text-sky-600"/>
                  <FaInstagram className=" cursor-pointer hover:scale-125 transform transition duration-1000 ease-in-out  hover:text-red-600"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="missionbtm flex xs:flex-col justify-between text-[0.625rem] md:flex-row">
        <div className="hidden  flex-col items-center md:flex-row md:flex ">
          <p className=" text-[0.813rem] mx-[1rem]">Privacy Policy</p>
          <p className="text-[0.813rem]">Terms of Use</p>
        </div>
        <div className=" hidden  md:mr-[19px] md:flex">
          <p className=" text-[0.813rem]">© 2022 Apna Connection, Made with ❤ by</p>
          <span className="text-[0.813rem] text-red-600">Digitech infra</span>
        </div>
        <div className="flex justify-between  ml-auto mr-auto   w-full  items-center md:hidden ">
          <p className=" text-[0.813rem]">Privacy Policy</p>
          <p className="text-[0.813rem]">Terms of Use</p>
        </div>
        <div className="flex justify-center ml-auto mr-auto    md:hidden">
          <p className=" text-[0.813rem] xs:mt-2 md:mt-0">© 2022 Apna Connection, Made with ❤ by</p>
          <span className="text-[0.813rem] text-red-600 xs:mt-2 md:mt-0">Digitech infra</span>
        </div>
        
      </div>
    </>
  );
}