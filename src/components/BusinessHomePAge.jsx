import React, { useEffect } from "react";
import {
  img25,
  img26,
  img27,
  I,
  IM,
  IM6,
  IM7,
  IM9,
  IM13,
  IM14,
  IM15,
  IM18,
  IMag,
  IM21,
  IMG28,
  IMG29,
  IMG30,
  IMG31,
  IMG32,
  IMG33,
  IMG35,
} from "../assets/images";
import "../App.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Navbar from "./Navbar";
import Looter from "./Looter";
import axios from "axios";
import usecotextFunction from "../utils/useContext";
import { Link } from "react-router-dom";
axios.defaults.withCredentials = true;

const BusinessHomePAge = () => {
  const { profile, setprofile, profilesrc, setprofilesrc } =
    usecotextFunction();


  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "#051d4d" }}
        onClick={onClick}
      />
    );
  }
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "#051d4d" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    centerMode: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className=" w-full mt-[1rem] businesshomepage ">
        <div className="businesshomepagebanner w-full ">
          <div className="businessoverlay w-full flex justify-center items-center">
            <div className=" w-full md:w-8/12 ml-[0.75rem] md:ml-[0px]">
              <h1 className=" text-[1.625rem] md:text-[2.875rem] text-white leading-[1.438rem]">
                The Power
              </h1>
              <h1 className=" text-[1.625rem] md:text-[2.875rem] text-white ">
                of your most passionate customers
              </h1>
              <p className=" text-[1.313rem] text-white leading-[1.438rem]">
                Apna Connection helps grow your business using customer reviews
              </p>

            </div>
          </div>
        </div>

        {/* ======================3 icons and text============== */}
        <div className='w-full flex justify-center items-center mt-[1.438rem] mb-[2.688rem]'>

    <div className=' min-[320px]:w-full md:w-full md:flex md:justify-center md:items-center lg:w-9/12'>

    <div className='w-full flex items-center justify-around mt-[0.5rem] mr-[0.5rem]'>

<div className=' ml-[0.563rem]'>
    <img  src={img25} alt="" />
</div>

<div className='w-7/12 md:ml-[1.125rem] md:w-full'>
    <p><span className=' text-[1.938rem] font-semibold'>30</span> thousand</p>
    <p className=' leading-[0px] text-[1rem] font-normal'>
    reviews seen every month
        </p>
    <p className=' mt-[0.75rem] text-[#555555] text-[1rem] font-normal'>Over 30 thousand review impressions every month</p>
</div>

    </div>


    <div className='w-full flex items-center justify-around xs:mt-[1rem] md:mt-[0.5rem] md:justify-between mr-[0.5rem]'>

<div className=' md:ml-[0.563rem]'>
    <img src={img26} alt="" />
</div>

<div className='w-7/12 md:w-full md:ml-[1.125rem]'>
    <p><span className=' text-[1.688rem]'>5</span> thousand</p>
    <p className=' leading-[0px]'>
    real reviews per month
        </p>
    <p className=' mt-[0.75rem] text-[#555555]'>Over 5 thousand reviews posted every month</p>
</div>

    </div>

    <div className='w-full flex items-center justify-around mt-[0.5rem]'>

<div className=' ml-[0.563rem]'>
    <img src={img27} alt="" />
</div>

<div className=' w-7/12 md:w-full md:ml-[1.125rem]'>
    <p><span className=' text-[1.688rem]'>1</span> thousand</p>
    <p className=' leading-[0px]'>
    have a great return
        </p>
    <p className=' mt-[0.75rem] text-[#555555] leading-[1.188rem]'>Over 1 thousand companies increase their business</p>
</div>

    </div>

    </div>
</div>


        {/* ==============marquee========== */}

        <div className=" text-center mt-14">
          More than 1000 companies use Apna Connection!
        </div>

        {/* ===========sliding text============= */}

        <div className="businesshomepage">
          <section className="  w-full   pb-[4.375rem]  mt-[1rem]">
            <div className="slider-container ">
              <Slider {...settings}>
                <div className="">
                  <h3 className=" ">
                    <img
                      loading="lazy"
                      className=" w-[10.938rem] h-[6.25rem] flex justify-center items-center"
                      src={I}
                      alt=""
                    />
                  </h3>
                </div>
                <div>
                  <h3 className=" ">
                    <img
                      loading="lazy"
                      className="w-[10.938rem] h-[6.25rem] flex justify-center items-center"
                      src={IM}
                      alt=""
                    />
                  </h3>
                </div>
                <div>
                  <h3 className=" ">
                    <img
                      loading="lazy"
                      className="w-[10.938rem] h-[6.25rem] flex justify-center items-center"
                      src={IM6}
                      alt=""
                    />
                  </h3>
                </div>
                <div>
                  <h3 className=" ">
                    <img
                      loading="lazy"
                      className="w-[10.938rem] h-[6.25rem] flex justify-center items-center"
                      src={IM7}
                      alt=""
                    />
                  </h3>
                </div>
                <div>
                  <h3 className=" ">
                    <img
                      loading="lazy"
                      className="w-[10.938rem] h-[6.25rem] flex justify-center items-center"
                      src={IM14}
                      alt=""
                    />
                  </h3>
                </div>
                <div>
                  <h3 className=" ">
                    <img
                      loading="lazy"
                      className="w-[10.938rem] h-[6.25rem] flex justify-center items-center"
                      src={IM15}
                      alt=""
                    />
                  </h3>
                </div>
                <div>
                  <h3 className=" ">
                    <img
                      loading="lazy"
                      className="w-[10.938rem] h-[6.25rem] flex justify-center items-center"
                      src={IM9}
                      alt=""
                    />
                  </h3>
                </div>
                <div>
                  <h3 className=" ">
                    <img
                      loading="lazy"
                      className="w-[10.938rem] h-[6.25rem] flex justify-center items-center"
                      src={IM18}
                      alt=""
                    />
                  </h3>
                </div>
                <div>
                  <h3 className=" ">
                    <img
                      loading="lazy"
                      className="w-[10.938rem] h-[6.25rem] flex justify-center items-center"
                      src={IM21}
                      alt=""
                    />
                  </h3>
                </div>
                <div>
                  <h3 className=" ">
                    <img
                      loading="lazy"
                      className="w-[10.938rem] h-[6.25rem] flex justify-center items-center"
                      src={IM13}
                      alt=""
                    />
                  </h3>
                </div>
                <div>
                  <h3 className=" ">
                    <img
                      loading="lazy"
                      className="w-[10.938rem] h-[6.25rem] flex justify-center items-center"
                      src={IMag}
                      alt=""
                    />
                  </h3>
                </div>
              </Slider>
            </div>
          </section>
        </div>

        {/* ===========sliding text bottom============= */}

        <div className=" w-full flex flex-col md:flex-row">
          <div className=" w-full h-[25rem] bg-[#EEF3F7] flex justify-center items-center md:w-6/12 md:h-[28.125rem]">
            <img
              loading="lazy"
              className=" w-11/12 h-[26.875rem] md:h-[31.25rem]"
              src={IMG28}
              alt=""
            />
          </div>

          <div className=" w-full h-[25rem] bg-[#051D4D] flex justify-center items-center md:w-6/12  md:h-[28.125rem]">
            <div className=" w-10/12 text-white">
              <div className=" my-[0.625rem] ">
                <h1 className=" text-[28px] font-semibold	">
                  {" "}
                  Increase conversions with the power of your customers
                </h1>
              </div>
              <div className=" my-[0.625rem] text-[1rem]">
                <p>
                  {" "}
                  Mucius doctus constituto pri at, ne cetero postulant pro. At
                  vix utinam corpora, ea oblique moderatius usu. Vix id viris
                  consul honestatis, an constituto deterruisset consectetuer
                  pro.
                </p>
              </div>
              
            </div>
          </div>
        </div>

        {/* ===================features================   */}

        <div className=" mt-[1.5rem]">
          <h1 className=" text-center text-[2rem] font-bold">Features</h1>
          <p className=" text-center text-[1.438rem] font-normal text-[#555555]">
            Cum doctus civibus efficiantur in imperdiet deterruisset.
          </p>
        </div>

        <div className=" w-full mt-[1.25rem] mb-[3.75rem]">
          <div className=" w-full flex justify-center">
            <div className=" w-10/12 flex justify-around flex-col mt-[1.375rem] md:flex-row left">
              <div className=" border w-full md:w-7/12">
                <div className=" px-[0.875rem] py-[0.625rem]">
                  <div className="flex">
                    <img loading="lazy" src={IMG29} className=" " alt="PICS" />
                    <span className=" ml-[0.625rem] font-semibold text-[1.313rem]">
                      Analytics Tools
                    </span>
                  </div>
                </div>
                <div className=" px-[0.875rem] py-[0.625rem] font-normal text-[0.875rem]">
                Analytics tools help businesses collect, process, and analyze data to inform decision-making and optimize operations. Examples include Google Analytics, Tableau, and IBM SPSS.
                </div>
              </div>

              <div className=" border mt-[0.625rem] w-full ml-[0px] md:ml-[1.188rem] md:w-7/12 md:mt-[0px]">
                <div className=" px-[0.875rem]">
                  <div className="flex items-center">
                    <img
                      loading="lazy"
                      src={IMG30}
                      className="h-[30px]"
                      alt="PICS"
                    />
                    <span className="  font-semibold text-[1.313rem] px-[0.875rem] py-[0.625rem]">
                      Social Integration
                    </span>
                  </div>
                </div>
                <div className=" px-[0.875rem] py-[0.625rem] text-[0.875rem]">
                Mucius Doctus focuses on the establishment of learned principles, emphasizing the balance of moderation and wisdom. It tackles the issues of honest counsel and the deterrence of corrupt influences.
                </div>
              </div>
            </div>
          </div>

          <div className=" w-full flex justify-center">
            <div className=" w-10/12 flex justify-around flex-col mt-[22px] md:flex-row left">
              <div className=" border w-full md:w-7/12 ">
                <div className=" px-[0.875rem] py-[0.625rem]">
                  <div className="flex">
                    <img loading="lazy" src={IMG31} className=" " alt="PICS" />
                    <span className=" ml-[0.625rem] font-semibold text-[1.313rem]">
                      Targeted Consumers
                    </span>
                  </div>
                </div>
                <div className=" px-[0.875rem] py-[0.625rem] text-[0.875rem]">
                Targeted consumers are the specific group of people a product or service is designed and marketed for. Identifying this group helps businesses tailor their marketing strategies to meet the needs and preferences of their ideal customers.
                </div>
              </div>

              <div className=" border mt-[0.625rem] w-full ml-[0px] md:ml-[1.188rem] md:w-7/12 md:mt-[0px]">
                <div className=" p-[0.625rem]">
                  <div className="flex">
                    <img loading="lazy" src={IMG32} className=" " alt="PICS" />
                    <span className=" ml-[0.625rem] font-semibold text-[1.313rem]">
                      Awesome Support
                    </span>
                  </div>
                </div>
                <div className=" p-[0.625rem] text-[0.875rem]">
                Awesome Support is a comprehensive WordPress plugin designed to provide robust customer support capabilities. It offers features such as ticket management, customizable fields, and automated responses to enhance the support experience for users.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" featureslastimg flex justify-center items-center flex-col">
          <p className=" text-white text-[15px]  mb-[0.625rem] md:text-[28px]">
            Get started now with Vanno...improve your business.
          </p>

          <div className=" w-10/12 flex justify-center items-center mt-[0.313rem] md:w-4/12">
            <Link to={"/companyRegister"} >
              <button className=" bg-white  text-[#3578FA] rounded-sm p-[0.625rem]  text-[0.75rem] md:text-[1rem]">
                Join <span className=" font-bold">Apna Connection</span> Now!
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className=" mt-[30px]">
        <Looter />
      </div>
    </>
  );
};

export default BusinessHomePAge;
