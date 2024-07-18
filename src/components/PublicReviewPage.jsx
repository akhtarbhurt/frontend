import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { IoShareSocialOutline, IoFlagOutline } from "react-icons/io5";
import { Rate } from "antd";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Looter from "./Looter";
import { useGlobalContext } from "../utils/useContextApi";
import {
  IMG36,
  IMG37,
  IMG38,
  IMG39,
  IMG41,
  IMG45,
  IMG46,
  IMG47,
  IMG48,
} from "../assets/images";
import axios from "axios";

const PublicReviewPage = () => {
  const { addCompany, companyReview, replies } = useGlobalContext();
  const { id } = useParams();
  const [isProfile, setIsProfile] = useState([]);
  const [likes, setLikes] = useState({});
  const [findLength, setFindLength] = useState([])
  const company = addCompany?.find((elem) => elem._id === id);
  const reviews = companyReview?.filter((elem) => elem.companyID === id);
  console.log("company review is", reviews);

  useEffect(() => {
    const fetchProfileAndLikes = async () => {
      try {
        const [profileResponse, likesResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/`),
          axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/like`),
        ]);
        setIsProfile(profileResponse.data);
        setLikes(
          likesResponse.data.result.reduce((acc, like) => {
            acc[like.postID] = acc[like.postID] || { count: 0, liked: false };
            acc[like.postID].count += 1;
            if (like.userID === profileResponse.data._id) {
              acc[like.postID].liked = true;
            }
            return acc;
          }, {})
        );
      } catch (err) {
        console.log("Error", err);
      }
    };
    fetchProfileAndLikes();
  }, [isProfile?._id]);
  console.log("profile is", isProfile);

  console.log(likes);
  const getLikes = likes?.result?.map((elem) => elem.length);
  const getTimeDifference = (createdAt) => {
    const prevDate = new Date(createdAt);
    const currentDate = new Date();
    const diffTime = currentDate - prevDate;
    const diffSeconds = Math.floor(diffTime / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays} days ago`;
    if (diffHours > 0) return `${diffHours} hours ago`;
    if (diffMinutes > 0) return `${diffMinutes} minutes ago`;
    return `${diffSeconds} seconds ago`;
  };

  const desc = ["terrible", "bad", "normal", "good", "wonderful"];

  const renderReplies = (reviewID) => {
    return replies
      ?.filter((reply) => reply.reviewID === reviewID)
      ?.map((reply) => (
        <div
          key={reply._id}
          className="ml-10 mt-4 p-4 border-t border-gray-200"
        >
          <div className="flex items-center mb-2">
            <img
              src={reply.isCompanyReply ? company.logo : reply.userPhoto}
              alt={reply.isCompanyReply ? company.companyName : reply.userName}
              className="h-8 w-8 rounded-full"
            />
            <div className="ml-2">
              <div className="text-sm font-bold">
                {reply.isCompanyReply ? company.companyName : reply.userName}
              </div>
              <div className="text-xs text-gray-500">
                {getTimeDifference(reply.createdAt)}
              </div>
            </div>
          </div>
          <div className="text-sm">{reply.text}</div>
        </div>
      ));
  };

  const handleLike = async (reviewID) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_KEY}/api/v1/like`, {
        likeBy: isProfile.name,
        postID: reviewID,
        userID: isProfile._id,
      });

      setLikes((prevLikes) => ({
        ...prevLikes,
        [reviewID]: {
          liked: !prevLikes[reviewID]?.liked,
          count: response.data.likeCount,
        },
      }));
    } catch (error) {
      console.log(error);
    }
  };

 useEffect(()=>{
  const reviewLength = async ()=>{
    const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/companyReviews/${id}`)
    setFindLength(response.data.payload)
  } 
  reviewLength()
 },[])

 const ratings = findLength?.map(review => review.rating);

// Calculate the sum of all the ratings
const sumOfRatings = ratings.reduce((acc, rating) => acc + rating, 0);

// Calculate the average rating
const averageRating = sumOfRatings / ratings.length;

console.log("Average Rating:", averageRating.toFixed(2)); // Output: 3.20

 console.log("review length is", findLength.length )
  return (
    <>
      <Navbar />
      <div className="h-full w-full mt-[12px] bg-[#F2F2F5] publicreviewpage md:mt-[96px]">
        <div className="w-full h-[280px] bg-white md:h-full">
          <div className="w-full topreviewpage flex justify-center flex-col items-center">
            <div className="w-full flex mb-[40px] justify-between items-center xs:flex-col md:w-10/12 md:h-[150px] md:flex-row ">
              <div className="w-full md:w-7/12 flex items-center justify-between md:justify-center ">
                <div>
                  <img
                    loading="lazy"
                    src={company?.logo}
                    alt={company?.companyName}
                    className="h-[100px] w-[100px] object-fill"
                  />
                </div>
                <div className="translate-x-[59px] md:translate-x-[10px]">
                  <h2 className="text-[15px] md:text-[30px] font-bold">
                    {company?.companyName}
                  </h2>
                  <p className="text-[13px] font-normal ">
                    Reviews {findLength.length}
                  </p>
                  <div className="flex items-center">
                    <Rate tooltips={desc} value={averageRating.toFixed(2)} />
                    <div className="flex items-center ml-[4px]">
                      <p>{averageRating.toFixed(2)}</p>
                      <img src={IMG36} alt="Rating" />
                    </div>
                  </div>
                  <div className="flex items-center bg-[#EEF9F5]">
                    <img src={IMG37} alt="Verified Company" />
                    <p className="ml-[1px] text-[7px] font-normal">
                      VERIFIED COMPANY
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center md:w-6/12 ">
                <a
                  href={company?.siteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11/12 border-2 flex justify-around items-center md:w-7/12 md:h-[104px]"
                >
                  <div className="flex items-center">
                    <img
                      loading="lazy"
                      src={company?.logo}
                      alt={company?.companyName}
                      className="h-[50px]"
                    />
                    <p className="ml-[12px] text-[12px] text-blue-600 font-normal">
                      Visit This Website {company?.companyName}
                    </p>
                  </div>
                  <MdOutlineKeyboardArrowRight />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center mt-[20px]">
          <div className="w-11/12 flex justify-between xs:flex-col lg:flex-row lg:w-8/12">
            <div className="w-full md:w-11/12 lg:w-7/12">
              <div className="bg-white h-[88px] flex justify-between items-center px-[12px] mb-5">
                <div className="flex items-center">
                  <img loading="lazy" src={IMG38} alt="Write Review" />
                  <Link
                    to={`/review/${id}`}
                    className="text-[#1A66FF] text-[14px] font-normal ml-[13px]"
                  >
                    Write a review
                  </Link>
                </div>
                <img loading="lazy" src={IMG39} alt="Icon" />
              </div>
             
              {reviews?.map((review) => (
                <div
                  key={review._id}
                  className="w-full bg-white flex flex-col mb-5"
                >
                  <div className="w-11/12 mx-auto">
                    <div className="flex items-center pt-[5px]">
                      <div>
                        {" "}
                        <img src={isProfile.profileImageURL} className=" h-9" alt="" />{" "}
                      </div>
                      <div className="ml-[12px]">
                        <div>{review.name}</div>
                      </div>
                    </div>
                    <hr className="my-[16px]" />
                    <div className="flex justify-between">
                      <Rate
                        className="mt-5 text-2xl"
                        tooltips={desc}
                        value={review.rating}
                        disabled
                      />
                      <div className="w-4/12 text-right text-[#6C6C85] md:w-3/12">
                        {getTimeDifference(review.createdAt)}
                      </div>
                    </div>
                    <p className="my-[12px] text-[18px]">
                      {(() => {
                        switch (review.rating) {
                          case 1:
                            return " Response was terrible";
                          case 2:
                            return " Response was bad";
                          case 3:
                            return " Response was normal";
                          case 4:
                            return "Response was good";
                          case 5:
                            return "Response was wonderful";
                          default:
                            return "You have not rated ";
                        }
                      })()}
                    </p>
                    <p className="text-[14px] my-[6px]">{review?.review}</p>
                    <hr className="my-[6px]" />
                    <div className="flex justify-between my-[12px]">
                      <div className="w-5/12 flex items-center md:w-4/12">
                        <AiOutlineLike
                          onClick={() => handleLike(review._id)}
                          className={`mr-2 cursor-pointer ${
                            likes[review._id]?.liked ? "text-blue-500" : ""
                          }`}
                        />
                        <div>{likes[review._id]?.count || 0} Likes</div>{" "}
                        {/* Display like count */}
                      </div>
                      <div className="w-3/12 text-right flex items-center justify-end">
                        <IoFlagOutline />
                      </div>
                    </div>
                    {renderReplies(review._id)}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-[15px] w-full md:w-6/12 lg:w-4/12 lg:mt-[0px]">
              <div className="bg-white rounded-md py-[12px] px-[5px] mb-[20px] companyactivity">
                <div className="text-[16px] font-normal ml-[10px]">
                  Company activity See all
                </div>
                <hr className="my-[8px]" />
                <div className="flex items-center ml-[10px]">
                  <div>
                    <img loading="lazy" src={IMG36} alt="Company Activity" />
                  </div>
                  <div className="ml-[6px]">
                    <p className="text-[13px] font-normal">
                      Ashe S.{" "}
                      <span className="text-[#6C6C85]">left a review</span>
                    </p>
                    <p className="text-[#6C6C85] text-[13px]">30 minutes ago</p>
                  </div>
                </div>
                <hr className="my-[8px]" />
                <div className="flex items-center ml-[10px]">
                  <div>
                    <img loading="lazy" src={IMG36} alt="Company Activity" />
                  </div>
                  <div className="ml-[6px]">
                    <p className="text-[13px] font-normal">
                      Janko W.{" "}
                      <span className="text-[#6C6C85]">left a review</span>
                    </p>
                    <p className="text-[#6C6C85] text-[13px]">1 hour ago</p>
                  </div>
                </div>
                <hr className="my-[8px]" />
                <div className="flex items-center ml-[10px]">
                  <div>
                    <img loading="lazy" src={IMG36} alt="Company Activity" />
                  </div>
                  <div className="ml-[6px]">
                    <p className="text-[13px] font-normal">
                      Oscar J.{" "}
                      <span className="text-[#6C6C85]">left a review</span>
                    </p>
                    <p className="text-[#6C6C85] text-[13px]">2 hours ago</p>
                  </div>
                </div>
              </div>
              
              <div className="">
                <img className=" h-[490px] object-fill" src="https://www.creatopy.com/blog/wp-content/uploads/2019/01/creative-advertising-ideas-2.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <Looter />
      </div>
    </>
  );
};

export default PublicReviewPage;
