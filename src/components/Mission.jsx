import React, { useEffect } from 'react'
import { useState } from 'react';
import Looter from './Looter'
import  {img19,Help,policy} from '../assets/images';
import '../App.css'
import { IoAlertCircleOutline } from "react-icons/io5";
import Navbar from './Navbar';
import axios from "axios";
import usecotextFunction from "../utils/useContext";
axios.defaults.withCredentials = true;
const Mission = () => {


    const [showFullText, setShowFullText] = useState(false);
    const [showFullTexttwo, setShowFullTexttwo] = useState(false);
    const [showFullTextthree, setShowFullTextthree] = useState(false);

    const { profile, setprofile,profilesrc, setprofilesrc } = usecotextFunction();

    

    const toggleTextone = () => {
        console.log("ok");
        setShowFullText(!showFullText);
    };

    const toggletextChangeone =() =>{
        setShowFullText(!showFullText);

    }

    const toggleTexttwo = () => {
        console.log("ok");
        setShowFullTexttwo(!showFullTexttwo);
    };

    const toggletextChangetwo =() =>{
        setShowFullTexttwo(!showFullTexttwo);

    }


    const toggleTextthree = () => {
        console.log("ok");
        setShowFullTextthree(!showFullTextthree);
    };

    const toggletextChangethree =() =>{
        setShowFullTextthree(!showFullTextthree);

    }

  return (
<>
<Navbar />
    <div className='mt-[1rem]   p-0 w-full'>

<div className='missionbgpic w-full mt-[-3px] p-0 flex bg-blue-950 justify-center items-center  md:mt-[-7px]'>
<div>
<h1 className=' text-center text-white text-[2.875rem] font-normal'>Our Mission</h1>
<p className=' text-center text-white text-[1.313rem] font-normal'>Apna Connection helps grow your business using customer reviews</p>
</div>
        </div>


        <div className=' w-full flex justify-center my-[4.375rem]'>
            <div className='w-full flex justify-center  md:w-10/12   xs:flex-col  xs:items-center  md:flex-row'>
        <div className=' border-2 border-gray-200 shadow-lg h-[20.625rem]  xs:w-11/12  bg-white flex flex-col justify-around items-center m-[0.313rem]  md:w-3/12'>
    <div className='  rounded-full h-[90px] w-[90px] flex justify-center items-center'>
        <img src={Help} alt="pics" />
    </div>
    
    <div>Our Vision</div>
    {
    showFullText? <div className=' w-full text-center text-[12px]'>We believe every day is an opportunity to further perfect our strategy and spur you on to achieve your organizational goals. Our vision is to make you succeed in yours.
   <div> 
    <button onClick={()=>toggletextChangeone()} className=' text-blue-700'>Show Less</button>
   </div>
    </div>: 
    <div className=' w-full text-center text-[12px]'>We believe every day is an opportunity to further perfect our strategy 
    
    </div>
    }
   
   {!showFullText?
    <div><button onClick={()=>toggleTextone()} className=' text-blue-700'>Read more</button></div>:""
}
   
</div>
<div className='border-2 border-gray-200 shadow-lg h-[20.625rem]  xs:w-11/12  bg-white flex flex-col justify-around items-center m-[0.313rem]  md:w-3/12'> 
    <div className=' rounded-full h-[90px] w-[90px] flex justify-center items-center'>
        <img src={img19} alt="pics" />
    </div>
    <div>Our Vision</div>

    {
    showFullTexttwo? <div className=' w-full text-center text-[12px]'>We consistently work on our development process to provide an informative, user-friendly and effective strategy to provide companies with the message or goal they are hoping to accomplish. This development process is tailored to meet the needs of small, medium and large size businesses and enterprises..
   <div> 
    <button onClick={()=>toggletextChangetwo()} className=' text-blue-700'>Show Less</button>
   </div>
    </div>: 
    <div className=' w-full text-center text-[12px]'>We consistently work on our development process to provide an informative 
    
    </div>
    }
   
   {!showFullTexttwo?
    <div><button onClick={()=>toggleTexttwo()} className=' text-blue-700'>Read more</button></div>:""
}
   
</div>
<div className='border-2 border-gray-200 shadow-lg h-[20.625rem]  xs:w-11/12 bg-white flex flex-col justify-around items-center m-[0.313rem]  md:w-3/12'> 
    <div className=' rounded-full h-[90px] w-[90px] flex justify-center items-center'>
        <img  src={policy} alt="pics" />
    </div>
    <div>Our Mision</div>
    {/* <div className=' w-full text-center text-[12px]'>"To empower our clients to use the web to its full potential by providing affordable, effective, custom solutions."
   
    </div> */}
   {
    showFullTextthree? <div className=' w-full text-center text-[12px]'>"To empower our clients to use the web to its full potential by providing affordable, effective, custom solutions."
   <div> 
    <button onClick={()=>toggletextChangethree()} className=' text-blue-700'>Show Less</button>
   </div>
    </div>: 
    <div className=' w-full text-center text-[12px]'>"To empower our clients to use the web to its full potential by providing...
    
    </div>
    }
   
   {!showFullTextthree?
    <div><button onClick={()=>toggleTextthree()} className=' text-blue-700'>Read more</button></div>:""
}
</div>
</div>
</div>


<div className=' bg-[#EEF3F7] w-full flex flex-col justify-center items-center py-[1.375rem] '>

<div className=' w-full flex my-[0.625rem] justify-center items-center  md:w-10/12  xs:flex-col  md:flex-row'>
    <div className=' mt-[0.438rem] w-11/12 flex items-start  md:w-5/12  md:mt-[0px]'>
        <div><IoAlertCircleOutline className=' text-[35px] text-[#999999]'/></div>
        <div className=' flex flex-col justify-start items-start ml-[0.625rem] mt-[0.438rem]'>
            <h1>Porro soleat pri ex, at has lorem accusamus?</h1>
            <p className=' mt-[0.375rem]'>Ut unum diceret eos, mel cu velit principes, ut quo inani dolorem mediocritatem. Mea in justo posidonium necessitatibus. Augue honestatis vis no, ius quot mazim forensibus in, per sale virtute legimus ne. Mea dicta facilisis eu.</p>
        </div>
    </div>

    <div className=' mt-[0.438rem] w-11/12 flex items-start  md:w-5/12  md:mt-[0px]'>
        <div><IoAlertCircleOutline className=' text-[35px] text-[#999999]'/></div>
        <div className=' flex flex-col justify-start items-start ml-[0.625rem] mt-[0.438rem]'>
            <h1>Porro soleat pri ex, at has lorem accusamus?</h1>
            <p className=' mt-[0.375rem]'>Ut unum diceret eos, mel cu velit principes, ut quo inani dolorem mediocritatem. Mea in justo posidonium necessitatibus. Augue honestatis vis no, ius quot mazim forensibus in, per sale virtute legimus ne. Mea dicta facilisis eu.</p>
        </div>
    </div>
    
</div>


<div className=' w-full flex my-[0.625rem] items-center justify-center  md:w-10/12  xs:flex-col  md:flex-row'>
    <div className=' mt-[0.438rem] w-11/12 flex items-start justify-center  md:w-5/12  md:mt-[0px]'>
        <div><IoAlertCircleOutline className=' text-[35px] text-[#999999]'/></div>
        <div className=' flex flex-col justify-start items-start ml-[0.625rem] mt-[0.438rem]'>
            <h1>Porro soleat pri ex, at has lorem accusamus?</h1>
            <p className=' mt-[0.375rem]'>Ut unum diceret eos, mel cu velit principes, ut quo inani dolorem mediocritatem. Mea in justo posidonium necessitatibus. Augue honestatis vis no, ius quot mazim forensibus in, per sale virtute legimus ne. Mea dicta facilisis eu.</p>
        </div>
    </div>

    <div className=' mt-[0.438rem] w-11/12 flex items-start  md:w-5/12  md:mt-[0px]'>
        <div><IoAlertCircleOutline className=' text-[35px] text-[#999999]'/></div>
        <div className=' flex flex-col justify-start items-start ml-[0.625rem] mt-[0.438rem]'>
            <h1>Porro soleat pri ex, at has lorem accusamus?</h1>
            <p className=' mt-[0.375rem]'>Ut unum diceret eos, mel cu velit principes, ut quo inani dolorem mediocritatem. Mea in justo posidonium necessitatibus. Augue honestatis vis no, ius quot mazim forensibus in, per sale virtute legimus ne. Mea dicta facilisis eu.</p>
        </div>
    </div>
    
</div>

</div>


<div className=' mt-[1.875rem]'>
<Looter />
</div>
    </div>
</>
  )
}

export default Mission