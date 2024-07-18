import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import  {logo} from '../assets/images';
import { Spin } from 'antd';
import Popup from './Popup';
import { toast } from 'react-toastify';

function Forgetpassword() {
    const [email, setEmail] = useState()
    const [loader,setloader] = useState(false)
    const navigate = useNavigate()
  axios.defaults.withCredentials = true
    const handleSubmit = (e) => {
        e.preventDefault()
        setloader(true)
        axios.post(`${import.meta.env.VITE_API_KEY}/api/v1/forgetpassword`, {email})
        .then(res => {
console.log("resolved",res.data)
            if(res.data.Status === "Success") {

                // navigate(`/resetpassword/${res.data.userId}/${res.data.token}`)
                setloader(false)
                toast.success("sucessfully link send in your email account")
            }

        }).catch(err => {
          console.log(err)
          setloader(false)
        })

    }

    return(

<>
     <Popup />  
    <div className=' w-screen  h-screen flex justify-center items-center'>

<div className=' p-2 w-11/12 lg:w-4/12 bg-white border-2 shadow-lg flex flex-col justify-center items-center'>
<h4 >Forgot Password</h4>

<form action="" className=' w-full' onSubmit={handleSubmit}>
  <div className=' w-full flex justify-center mt-4 items-center'>
<label htmlFor="email" className=' mr-3 '>
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control border-2 rounded-0 w-8/12 p-1"
              onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <div className=' w-full flex justify-center items-center mt-4'>
            <button type="submit" className="bg-blue-600 p-2 text-white w-10/12 rounded-lg hover:bg-orange-500">
            Send
          </button>
         
          </div>
          <img src={logo} className=' w-8/12 ml-auto mr-auto h-16 mt-3' alt="" />
</form>


{loader?
<div className="example">
    <Spin />
  </div>
  :
  ""
}


</div>

    </div>

    
</>

    )
}

export default Forgetpassword;