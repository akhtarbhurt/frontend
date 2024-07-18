import React from 'react'
import axios from "axios"
import { useState } from 'react';
axios.defaults.withCredentials = true
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const Logout = () => {

    const navigate =  useNavigate()

    useEffect(()=>{

    
    axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/logout`)

  .then((res) => {
    console.log("logout",res)
    localStorage.setItem("apnaconnectionprofile",false)
    localStorage.setItem("apnaconnectionadmin",false)

    navigate("/login")
  })
  .catch((err) =>{
    console.log("error",err)
  })

},[])

  return (

    <div>

        <h1>Logout successfully</h1>

    </div>

  )
}

export default Logout