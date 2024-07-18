import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import {
  grayStar,
  greenStar,
  orangeStar,
  profilePic,
  yellowStar,
} from "../assets/images";
import { CiStar } from "react-icons/ci";
import { useGlobalContext } from "../utils/useContextApi";
import axios from "axios";
import { Rate } from "antd";

export default function Slider() {
  const { companyReview } = useGlobalContext();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/`); // Adjust endpoint if necessary
        setProfile(response.data);
        console.log(response.data);
      } catch (err) {
        console.log("Error", err);
      }
    };
    fetchProfile();
  }, [profile]);
  
  return (
    <>
      <div className="mt-20 mx-20 mb-5 ">
        <h2 className=" text-2xl font-bold  "> Latest Review </h2>
        <p className=" text-slate-600 text-md ">
          {" "}
          Cum doctus civibus efficiantur in imperdiet deterruisset.{" "}
        </p>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          "@1.00": {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          "@1.50": {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {/* double card slider  */}
        {companyReview?.map((elem) => {
          return (
            <div key={elem._id}>
              <SwiperSlide>
                <div className=" w-[100%] h-[50vh] border p-2 shadow-lg  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                  <div className="flex justify-between  capitalize  ">
                    <div>
                      <img
                        src={
                          !elem.profileImageURL
                            ? profilePic
                            : elem.profileImageURL
                        }
                        className="h-[50px]"
                        alt=""
                      />
                    </div>
                    <div className="  ">
                      <p className=" text-customOrange text-[10px] ">
                        {elem.name}
                      </p>
                      <p className=" text-blue-600 text-[10px] "> reviewed </p>
                    </div>
                    <div>
                      <Rate value={elem.rating} disabled />
                    </div>
                  </div>
                  <div className="mt-1 p-2">
                    <p>{elem.review}</p>
                  </div>
                </div>
              </SwiperSlide>
             
            </div>
          );
        })}

        {/* single card slider  */}
      </Swiper>
    </>
  );
}
