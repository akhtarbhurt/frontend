import React from 'react'
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import  {logo} from '../assets/images';
import { Spin } from 'antd';


function ResetPassword() {
    const [password, setPassword] = useState()
    const [loader,setloader] = useState(false)

    const navigate = useNavigate()
    const {id, token} = useParams()

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
      setloader(true)
        e.preventDefault()
        axios.post(`${import.meta.env.VITE_API_KEY}/api/v1/resetpassword/${id}/${token}`, {password})
        .then(res => {
            if(res.data.Status === "Success") {
              setloader(false)
                navigate('/login')
               
            }
        }).catch(err => {
          console.log(err)
          setloader(false)
        })
    }

    return(
  


// ============resetpassword==============

<>
<div className=' w-screen  h-screen flex justify-center items-center'>

<div className=' p-2 w-11/12 lg:w-4/12 bg-white border-2 shadow-lg flex flex-col justify-center items-center'>
<h4 >Enter Your New Password</h4>

<form action="" className=' w-full' onSubmit={handleSubmit}>
  <div className=' w-full flex justify-center mt-4 items-center'>
<label htmlFor="password" className=' mr-3 '>
              <strong>password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              autoComplete="off"
              name="password"
              className="form-control border-2 rounded-0 w-8/12 p-1"
              onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <div className=' w-full flex justify-center items-center mt-4'>
            <button type="submit" className="bg-blue-600 p-2 text-white w-10/12 rounded-lg hover:bg-orange-500">
            Submit
          </button>
         
          </div>
          <img src={logo} className=' w-8/12 ml-auto mr-auto h-16 md:h-24 lg:h-16 mt-3' alt="" />
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

export default ResetPassword;