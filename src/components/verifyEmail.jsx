import React, { useEffect } from 'react'
import { useState,useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import  {logo} from '../assets/images';
import { Spin } from 'antd';
import usecotextFunction from "../utils/useContext";
import Popup from './Popup';
import { toast } from 'react-toastify';
function ResetPassword() {
    const [loader,setloader] = useState(false)
  const { profile, setprofile,profilesrc, setprofilesrc,showLogin, setShowLogin } = usecotextFunction();
  const toastShownRef = useRef(false);

    const {id, token} = useParams()

    axios.defaults.withCredentials = true;
    useEffect(() => {
        const call = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/verify-email/${id}`);
                if (!toastShownRef.current) {
                  toast.success('Email verified successfully');
                  toastShownRef.current = true;
                }
                setShowLogin(true);
              }
            catch (err) {
            toast.error('Email not verified');
          }
        };
    
        call();
      }, []);


   

    return(
  


// ============resetpassword==============

<>
<Popup />
<div className=' w-screen  h-screen flex justify-center items-center'>
<div className=' p-2 w-11/12 lg:w-4/12 bg-white border-2 shadow-lg flex flex-col justify-center items-center'>
<h4 >Email successfully verified</h4>
<img src={logo} className=' w-8/12 ml-auto mr-auto h-16 md:h-24 lg:h-16 mt-3' alt="" />
<Link to={"/login"} className=' bg-blue-600 px-4 py-2 text-white'>Login</Link>



</div>

    </div>
</>
    )
}

export default ResetPassword;