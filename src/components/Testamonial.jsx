import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { test1, test2 } from "../assets/images";
import { useGlobalContext } from "../utils/useContextApi";

export default function Testamonial() {
  const { client } = useGlobalContext();
  console.log( "client is", client)
  return (
    <>
      <div className=" bg-blue-100 min-h-fit pb-20   items-center ">
        <div className=" w-full flex justify-center items-center mt-20 ">
          <h1 className=" p-5 text-2xl text-blue-700 font-bold ">
            {
                client[0]?.clientHeading
            }
          </h1>
        </div>

        <Swiper
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
            clickable: true,
          }}
          slidesPerView={1}
          centeredSlides={true}
          spaceBetween={30}
          autoplay={{
            delay: 12000,
            disableOnInteraction: true,
          }}
          modules={[Autoplay, Navigation, Pagination]}
          breakpoints={{
            "@0.00": {
              slidesPerView: 1,
              spaceBetween: 30,
            },
            "@0.75": {
              slidesPerView: 1,
              spaceBetween: 30,
            },
            "@1.00": {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            "@1.50": {
              slidesPerView: 2,
              spaceBetween: 30,
            },
          }}
          loop={true}
          className="mySwiper  "
        >
          {client?.map((elem) => {
            return (
              <div key={elem._id} >
                <SwiperSlide>
                  <div>
                    <div className="bg-white flex flex-col sm:flex-row h-full   border rounded-md ">
                      <div className="   ">
                        <img
                          src={elem.reviewImage}
                          className="   sm:h-full w-full   "
                          alt=""
                        />
                      </div>
                      <div className=" flex-1 p-4 ">
                        <h2 className="mt-5 text-lg font-semibold "> {elem.reviewHeading} </h2>
                        <p className="text-sm mt-14 ">
                         {elem.reviewText}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </div>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}
