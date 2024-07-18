import React from 'react'
import Navbar from './Navbar'
import Looter from './Looter'
import { checkmark,Help,flag,policy } from '../assets/images';
import axios from "axios";
import usecotextFunction from "../utils/useContext";
axios.defaults.withCredentials = true;
const Reviewdone = () => {

  const { profile, setprofile,profilesrc, setprofilesrc } = usecotextFunction();

 
 
  return (

    <div className=' w-full overflow-hidden reviewdone'>
      
 <Navbar />

 <div className=' w-full xs:mt-[10px] min-[500px]:mt-[96px] bg-[#082359] flex justify-center items-center h-[400px]'>
 <div className=' flex flex-col justify-center items-center'>
   <img  className=' h-[100px] w-[100px]' src={checkmark} alt="" />
   <div className=' flex flex-col justify-center items-center mt-[12px]'>
   <h1 className=' text-white text-[30px] font-bold'>Review submitted! </h1>
   <p className=' text-white text-[13px] font-normal'>Sit an meis aliquam, cetero inermis.</p>
   </div>
 </div>
 </div>

 <div className='w-full h-full flex justify-center items-center my-[100px]'>
  <div className=' w-full flex justify-center items-center xs:flex-col md:w-9/12 md:flex-row'>
  <div className='py-[19px]  w-10/12 h-[331px] shadow-lg border-2 border-gray-100  flex flex-col justify-around items-center md:w-6/12 md:mr-[5px]'>
    <p><img loading='lazy' src={Help} className=' h-[110px] w-[110px]' alt="pics" /></p>
  <p className=' font-bold text-[18px] text-[#F3661E]'>Need Help?</p>
  <p className=' w-11/12 text-center'>Dolor detraxit duo in, ei sea dicit reformidans. Mel te accumsan patrioque referrentur. Has causae perfecto ut, ex choro assueverit eum...</p>
  <p className=' font-bold text-[#283B93] text-[18px]'>Rear more</p>
  </div>
  <div className='py-[19px] w-10/12 h-[331px] shadow-lg border-2 border-gray-100  flex flex-col justify-around items-center md:w-6/12 md:mr-[5px]'>
    <p><img loading='lazy' src={flag} className=' h-[110px] w-[110px]' alt="pics" /></p>
  <p className='  font-bold text-[18px] text-[#F3661E]'>Report Abuse</p>
  <p className=' w-full text-center'>Dolor detraxit duo in, ei sea dicit reformidans. Mel te accumsan patrioque referrentur. Has causae perfecto ut, ex choro assueverit eum...</p>
  <p className=' font-bold text-[#283B93] text-[18px]'>Rear more</p>
  </div>
  <div className='py-[19px] w-10/12 h-[331px] shadow-lg border-2 border-gray-100  flex flex-col justify-around items-center md:w-6/12'>
    <p><img loading='lazy' src={policy} className=' h-[110px] w-[110px]' alt="pics" /></p>
  <p className=' font-bold text-[18px] text-[#F3661E]'>Cancel Policy</p>
  <p className=' w-full text-center'>Dolor detraxit duo in, ei sea dicit reformidans. Mel te accumsan patrioque referrentur. Has causae perfecto ut, ex choro assueverit eum...</p>
  <p className=' font-bold text-[#283B93] text-[18px]'>Rear more</p>
  </div>
  </div>
 </div>

 <Looter />
     </div>
  )
}

export default Reviewdone