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
import QuestionData from "./QuestionData";

const Contact = () => {

useEffect(()=>{
  setIsSubmitDisabled(true);

},[])

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
        recaptchaRef.current.reset();
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

  const DisplaySupportData = () => {
    setSupportData(true);
  };
  const DisplayQuestionData = () => {
    setSupportData(false);
  };

  const onChange = (value) => {

console.log("toget id from usereference",recaptchaRef.current.props.id,"value",value)
if(recaptchaRef.current.props.id === "submitid"){

console.log("submit",recaptchaRef.current.props.id,value)

    settoken(value);
    settokenquestion("");
    setIsSubmitDisabled(false);

  }

  };



  const onChangequestion = (value) => {
    console.log("toget id from usereference",recaptchaRefquestiondata.current.props.id,"value",value)
    if(recaptchaRefquestiondata.current.props.id === "questiondataid"){
    
    console.log("questiondataid",recaptchaRefquestiondata.current.props.id,value)
        settoken(value);
        settokenquestion("");
        setIsSubmitDisabled(false);
    
      }
    
  };

  return (
    <>
      <Navbar />
      <div className="  p-0 w-full overflow-hidden">
        {/* =================topbannerimg=============== */}

        <div className="contactbgpic w-full mt-[-0.438rem] p-0 flex justify-center items-center bg-blue-900">
          <div>
            <h1 className=" text-center text-white text-[2.875rem]">
              Get in Touch with Vanno
            </h1>
            <p className=" text-center text-white text-[1.313rem]">
              Apna Connection helps grow your business using customer reviews
            </p>
          </div>
        </div>

        {/* =========question===================== */}
        <div className=" w-full flex ">
          <div
            onClick={() => DisplayQuestionData()}
            className={`${
              !supportData ? "bg-[#EDEDED]" : "bg-white"
            }  w-6/12 flex justify-end cursor-pointer contactleftparent pt-[0.313rem]`}
          >
            <div
              className={`w-full flex    items-center md:w-5/12 cursor-pointer md:translate-x-[-2.75rem]`}
            >
              <div className=" text-[2.5rem] text-[#F3661E]">
                <GoQuestion />
              </div>
              <div className=" ml-[0.188rem] md:ml-[0.75rem]">
                <p className=" text-[0.625rem] md:text-[1.313rem]">Questions</p>
                <p className=" text-[0.625rem] md:text-[0.938rem]">
                  Omnis justo gloriatur et sit
                </p>
              </div>
            </div>
          </div>
          <div
            onClick={() => DisplaySupportData()}
            className={`w-6/12  bg-${
              supportData ? "[#EDEDED]" : "white"
            } cursor-pointer h-[60px] flex`}
          >
            <div className=" w-full flex justify-start  items-center ml-[0.813rem] cursor-pointer">
              <div className=" text-[2.5rem] text-[#8E8E8E]">
                <CgSupport />
              </div>
              <div className=" ml-[0.188rem] md:ml-[0.75rem]">
                <p className="text-[0.625rem] md:text-[1.313rem]">Support</p>
                <p className=" text-[0.625rem] md:text-[0.938rem]">
                  Quo corrumpit euripidis
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ============inputs============ */}
        {supportData ? (
          // submit form
          <form
            className=" w-full flex justify-center my-[1.875rem]"
            onSubmit={submitdemo}
          >
            <div className="w-11/12 md:w-7/12">
              <div
                className=" w-full flex justify-center mt-[1.125rem] xs:flex-col 
md:flex-row"
              >
                <div className=" w-full md:w-5/12 ">
                  <input
                    type="text"
                    aria-label="name"
                    placeholder=" Name"
                    className=" w-full border-[0.063rem] 
border-[#B3B4B5] p-[0.438rem]"
                  />
                </div>
                <div className="ml-[0px] w-full  md:w-5/12 ">
                  <input
                    type="text"
                    aria-label="last-name"
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
                    aria-label="email"
                    placeholder=" Email"
                    className=" w-full border-[0.063rem] 
border-[#B3B4B5] p-[0.438rem]"
                  />
                </div>
                <div className="ml-0 xs:mt-[0.75rem] md:w-5/12 telephoneparent ">
                  <input
                    type="text"
                    aria-label="telephone"
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
border-[#B3B4B5] w-full md:w-10/12  p-[0.438rem]"
                    placeholder="Ask Issues"
                    rows="10"
                  ></textarea>
                </div>
              </div>

              <div className=" flex justify-center mt-3">
                <ReCAPTCHA
                  sitekey="6Le1-dspAAAAAMwFOKWWG4fZ3kNn1gyx3OJ9QvTR"
                  onChange={onChange}
                  ref={recaptchaRef}
                  id="submitid"
                />
              </div>

              <div className=" w-full flex justify-center my-[0.875rem]">
                <button
              
                  type="submit"
                  className="xs:w-4/12 md:w-2/12 bg-[#F3661E] text-white rounded-3xl p-[0.625rem]"
                  disabled={isSubmitDisabled}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        ) : (
          //question data form
         <QuestionData />
        )}

        {/* ======================bottom============ */}

        <div className=" bg-[#EEF3F7] w-full flex flex-col justify-center items-center py-[1.875rem]">
          <div className=" w-full flex my-[0.625rem] justify-center items-center md:w-10/12 xs:flex-col md:flex-row">
            <div className=" mt-[0.438rem] w-11/12 flex items-start md:w-5/12 md:mt-[0px]">
              <div>
                <IoAlertCircleOutline className=" text-[2.188rem] text-[#999999]" />
              </div>
              <div className=" flex flex-col justify-start items-start ml-[0.625rem] mt-[0.438rem]">
                <h1>Porro soleat pri ex, at has lorem accusamus?</h1>
                <p className=" mt-[0.375rem] text-[0.813rem] w-11/12 text-left">
                  Ut unum diceret eos, mel cu velit principes, ut quo inani
                  dolorem mediocritatem. Mea in justo posidonium necessitatibus.
                  Augue honestatis vis no, ius quot mazim forensibus in, per
                  sale virtute legimus ne. Mea dicta facilisis eu.
                </p>
              </div>
            </div>

            <div className=" mt-[0.438rem] w-11/12 flex items-start md:w-5/12 md:mt-[0px]">
              <div>
                <IoAlertCircleOutline className=" text-[2.188rem] text-[#999999]" />
              </div>
              <div className=" flex flex-col justify-start items-start ml-[0.625rem] mt-[0.438rem]">
                <h1>Ut quo inani dolorem mediocritatem?</h1>
                <p className=" mt-[0.375rem] text-[0.813rem] w-11/12 text-left">
                  Ut unum diceret eos, mel cu velit principes, ut quo inani
                  dolorem mediocritatem. Mea in justo posidonium necessitatibus.
                  Augue honestatis vis no, ius quot mazim forensibus in, per
                  sale virtute legimus ne. Mea dicta facilisis eu.
                </p>
              </div>
            </div>
          </div>

          <div className=" w-full flex my-[0.625rem] items-center justify-center md:w-10/12 xs:flex-col md:flex-row">
            <div className=" mt-[0.438rem] w-11/12 flex items-start justify-center md:w-5/12 md:mt-[0px]">
              <div>
                <IoAlertCircleOutline className=" text-[2.188rem] text-[#999999]" />
              </div>
              <div className=" flex flex-col justify-start items-start ml-[0.625rem] mt-[0.438rem]">
                <h1>Per sale virtute legimus ne?</h1>
                <p className=" mt-[0.375rem] text-[0.813rem] w-11/12 text-left">
                  Ut unum diceret eos, mel cu velit principes, ut quo inani
                  dolorem mediocritatem. Mea in justo posidonium necessitatibus.
                  Augue honestatis vis no, ius quot mazim forensibus in, per
                  sale virtute legimus ne. Mea dicta facilisis eu.
                </p>
              </div>
            </div>

            <div className=" mt-[0.438rem] w-11/12 flex items-start md:w-5/12 md:mt-[0px]">
              <div>
                <IoAlertCircleOutline className=" text-[2.188rem] text-[#999999]" />
              </div>
              <div className=" flex flex-col justify-start items-start ml-[0.625rem] mt-[0.438rem]">
                <h1>Mea in justo posidonium necessitatibus?</h1>
                <p className=" mt-[0.375rem] text-[0.813rem] w-11/12 text-left">
                  Ut unum diceret eos, mel cu velit principes, ut quo inani
                  dolorem mediocritatem. Mea in justo posidonium necessitatibus.
                  Augue honestatis vis no, ius quot mazim forensibus in, per
                  sale virtute legimus ne. Mea dicta facilisis eu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" mt-[1.875rem]">
        <Looter />
      </div>
    </>
  );
};

export default Contact;
