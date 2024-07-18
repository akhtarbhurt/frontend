import React from 'react'
import  {img6} from '../assets/images';
import { useEffect } from 'react';
import '../App.css' 
import Navbar from './Navbar';
import Looter from './Looter';
import axios from "axios";
import usecotextFunction from "../utils/useContext"
axios.defaults.withCredentials = true;


const Error = () => {

  const { profile, setprofile,profilesrc, setprofilesrc } = usecotextFunction();

 
 


  return (

<>
<Navbar />
    <div className='mt-[1rem] bg-[#082359] errorpage w-full flex flex-col justify-center items-center   xs:h-[40.625rem] min-[768px]:h-[43.75]  lg:h-[49.438rem]'>

<div className=' xs:w-10/12   lg:w-[24.125rem]'>
<img className=' w-full' src={img6} alt="" />
</div>

<h1 className='headingsorry text-center text-[1.875rem]  text-white mt-[1.375rem]   lg:w-4/12 '>Sorry, something went wrong</h1>
<p className='text-center text-white mt-[1.375rem]   lg:text-[1.188rem]  lg:w-6/12 '>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
   <button className='text-center bg-[#F67A3C] text-white p-[0.5rem] rounded-md mt-[4rem]   lg:w-[9.438rem]  lg:mt-[4rem] '>Go To Homepage</button>
    </div>

<div className=' mt-[1.875rem]'>
  <Looter />
</div>

    </>
  )
}

export default Error