import React, { useState, useRef, useEffect } from "react";
import { GoQuestion } from "react-icons/go";
import { CgSupport } from "react-icons/cg";
import "../App.css";
import { IoAlertCircleOutline } from "react-icons/io5";
import Navbar from "./Navbar";
import Looter from "./Looter";
import axios from "axios";
import usecotextFunction from "../utils/useContext";
axios.defaults.withCredentials = true;
import ReCAPTCHA from "react-google-recaptcha";

const QuestionData = () => {

    const [supportData, setSupportData] = useState(true);
    const { profile, setprofile, profilesrc, setprofilesrc } =
      usecotextFunction();
   
    const [token, settoken] = useState("");
    const [tokenquestion, settokenquestion] = useState("");
  
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [isSubmitDisabledquestion, setIsSubmitDisabledquestion] =
      useState(true);
  
    const recaptchaRef = useRef(null);
    const recaptchaRefquestiondata = useRef(null);
  
  
  
    const submitdemo = async (e) => {
      e.preventDefault();
      try {
        if (token) {
          alert("Sending POST request");
          console.log("Sending POST request");
          const res = await axios.post(`${import.meta.env.VITE_API_KEY}/contact`, {
            token,
          });
          console.log("Response received:", res.data);
          // recaptchaRef.current.reset();
          console.log("recaptcha", recaptchaRef.current);
          settoken("");
          setIsSubmitDisabled(true);
        } else {
          alert("Please verify the captcha");
        }
      } catch (err) {
        console.log("Error occurred:", err);
      }
    };
  
    // ==============question data=============
  
    const submitdemoquestion = async (e) => {
      e.preventDefault();
      try {
        if (tokenquestion) {
          alert("Sending POST request");
          console.log("Sending POST request");
          const res = await axios.post(`${import.meta.env.VITE_API_KEY}/contactquestion`, {
            tokenquestion,
          });
          console.log("Response received:", res.data);
  
          recaptchaRefquestiondata.current.reset();
          settokenquestion("");
          setIsSubmitDisabledquestion(true);
        } else {
          alert("Please verify the captcha");
        }
      } catch (err) {
        console.log("Error occurred:", err);
      }
    };
  
  
 
  
  
    const onChangequestion = (value) => {
      console.log("toget id from usereference",recaptchaRefquestiondata.current.props.id,"value",value)
      if(recaptchaRefquestiondata.current.props.id === "questiondataid"){
      console.log("questiondataid",recaptchaRefquestiondata.current.props.id,value)
      settokenquestion(value);
          settoken("");
          setIsSubmitDisabledquestion(false);
      
        }
      
    };
    
  return (


    <div>

<form
            className=" w-full flex justify-center my-[1.875rem]"
            onSubmit={submitdemoquestion}
          >
            <div className="w-11/12 md:w-7/12">
              <div
                className=" w-full flex justify-center mt-[1.125rem] xs:flex-col 
md:flex-row"
              >
                <div className=" w-full md:w-5/12 ">
                  <input
                    type="text"
                    placeholder=" Name"
                    className=" w-full border-[0.063rem] 
border-[#B3B4B5] p-[0.438rem]"
                  />
                </div>
                <div className="ml-[0px] w-full  md:w-5/12 ">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className=" w-full border-[0.063rem] 
border-[#B3B4B5] p-[0.438rem] mt-[0.75rem] ml-[0px] LastNamecontact xs:ml-[0px] 
"
                  />
                </div>
              </div>

              <div
                className=" w-full flex justify-center mt-[1.125rem] 
xs:flex-col md:flex-row "
              >
                <div className=" w-full md:w-5/12 ">
                  <input
                    type="text"
                    placeholder=" Email"
                    className=" w-full border-[0.063rem] 
border-[#B3B4B5] p-[0.438rem]"
                  />
                </div>
                <div className="ml-0 xs:mt-[0.75rem] md:w-5/12 telephoneparent ">
                  <input
                    type="text"
                    placeholder="Telephone"
                    className=" w-full border-[0.063rem] 
border-[#B3B4B5] p-[0.438rem] mt-[0.75rem] ml-[0px] Telephonecontact xs:ml-[0px]"
                  />
                </div>
              </div>

              <div className=" w-full flex justify-center mt-[1.125rem]">
                <div className=" w-full flex justify-center">
                  <textarea
                    className=" border-[0.063rem] 
border-[#B3B4B5] w-full md:w-10/12 p-[0.438rem]"
                    placeholder="Ask a Question"
                    rows="10"
                  ></textarea>
                </div>
              </div>

              <div className=" flex justify-center mt-3">
                <ReCAPTCHA
                  sitekey="6LcjhvEpAAAAAALKkt-Wl4RStmhVIGld2eGXSbD5"
                  onChange={onChangequestion}
                  ref={recaptchaRefquestiondata}
                  id="questiondataid"
                />
              </div>
              <div className=" w-full flex justify-center my-[0.875rem]">
                <button
                  className="xs:w-4/12 md:w-2/12 bg-[#F3661E] text-white rounded-3xl p-[0.625rem]"
                  type="submit"
                  disabled={isSubmitDisabledquestion}
                >
                  Question data
                </button>
              </div>
            </div>
          </form>


    </div>


  )
}

export default QuestionData