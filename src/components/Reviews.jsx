import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../utils/useContextApi';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { Rate } from 'antd';
import Looter from './Looter';
import Popup from './Popup';

export default function Reviews() {
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  const { companyID } = useParams();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/`); 
      setProfile(response.data);
      setIsLoading(false);
     
    } catch (err) {
      console.log("Error", err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [profile]);

  const [isReview, setIsReview] = useState({
    name: profile?.name,
    review: "",
    rating: 0,
    companyID: companyID,
    userID: "",
  });

  useEffect(() => {
    if (profile) {
      setIsReview((prevState) => ({
        ...prevState,
        name: profile?.name,
        userID: profile?._id,
      }));
    }
  }, [profile]);

  const handleRatingChange = (value) => {
    setIsReview((prevState) => ({
      ...prevState,
      rating: value,
    }));
  };

  const handleReviewFunction = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_KEY}/api/v1/reviews`, isReview);
      if (response.status === 200) {
        toast.success("Review has been submitted");
        // Optionally, reset the form or update the state with new review
        setIsReview({
          name: profile?.name,
          review: "",
          rating: 0,
          companyID: companyID,
          userID: profile?._id,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit review. Please try again.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Popup />
      <Navbar />
      <div className='h-screen w-full flex justify-center items-center capitalize'>
        <div className='w-[50%] text-center'>
          <div className='bg-white shadow-2xl border p-3'>
            <h3>Rate your recent experience</h3>
            <Rate
              className='mt-5 text-2xl'
              tooltips={desc}
              value={isReview.rating}
              onChange={handleRatingChange}
            />
            <div className='mt-5'>
              <Link to={''}>Tell us about your experience</Link>
            </div>
            <form onSubmit={handleReviewFunction}>
              <textarea
                className='resize-none h-[15vh] w-[70%] border border-black px-2 capitalize mt-5'
                placeholder="Enter your review here"
                value={isReview.review}
                onChange={(e) =>
                  setIsReview({ ...isReview, review: e.target.value })
                }
              ></textarea>
              <div className='mt-5'>
                <button type='submit' className='bg-customOrange text-white p-2 px-5 rounded-md'>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Looter />
    </>
  );
}
