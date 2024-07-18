import React, { useState, useEffect } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Pagination, Card } from 'antd'; 
import Navbar from './Navbar';
import Looter from './Looter';
import axios from "axios";
import usecotextFunction from "../utils/useContext";
import '../App.css';
import { img20, img21, img1, IMG54, IMG55, IMG56, IMG57, IMG58, IMG59 } from '../assets/images';

axios.defaults.withCredentials = true;

const ApnaNews = () => {
  const { profile, setprofile, profilesrc, setprofilesrc } = usecotextFunction();
  const [pageNumber, setPagenumber] = useState(1);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [productsdata, setproductsdata] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const handlePageChange = (pageNumber) => {
    setPagenumber(pageNumber);
    const startIndex = (pageNumber - 1) * 6;
    const endIndex = pageNumber * 6;
    setproductsdata(filteredData.slice(startIndex, endIndex));
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchInput(query);
    const filteredData = data.filter(item => 
      item.blogTitle.toLowerCase().includes(query) || 
      item.blogDescription.toLowerCase().includes(query)
    );
    setFilteredData(filteredData);
    setproductsdata(filteredData.slice(0, 6));
    setPagenumber(1);
  };
  
  useEffect(() => {
    function apicalling() {
      axios
        .get(`${import.meta.env.VITE_API_KEY}/api/v1/blog`)
        .then((res) => {
          let answer = res.data.result;
          setData(answer);
          setFilteredData(answer);
          setproductsdata(answer.slice(0, 6));
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
    apicalling();
  }, []);

  return (
    <>
      <Navbar />
      <div className='mt-[1.45rem] p-0 w-full bg-[#EEF3F7] apnanewspage'>
        {/* ================topimage================= */}
        <div className='m-0 Apnanewsbgpic w-full mt-[-0.188rem] p-0 flex justify-center items-center bg-[#091b2a]'>
          <div>
            <h1 className='text-center text-white font-normal text-[1.875rem] md:text-[2.875rem]'>Apna Connection News</h1>
            <p className='text-center text-white text-[0.9113rem] md:text-[1.313rem]'>Apna Connection helps grow your business using customer reviews</p>
          </div>
        </div>
        <div className='w-full flex justify-center mt-4'>
          <div className='relative flex w-3/12 justify-center items-center'>
            <input 
              type="text" 
              className='w-11/12 p-2' 
              placeholder='search' 
              value={searchInput}
              onChange={handleSearch}
            />
            <button className='absolute right-6 bg-blue-700 text-white px-1'>search</button>
          </div>
        </div>
        {/* ============cards ========== */}
        <div className='w-full flex justify-center mt-[0.625rem]'>
          <div className='w-full flex justify-center xs:flex-col md:flex-row md:w-full lg:w-9/12'>
            <div className='left w-11/12 xs:order-1 xs:ml-auto xs:mr-auto md:w-9/12 md:order-0 md:ml-[0px] md:mr-[0px]'>
              <div className='w-full flex justify-around flex-wrap'>
                {/* =============antd================ */}
                {productsdata.map((dat, ind) => (
                  <div key={ind} className='w-11/12 border-2 shadow-lg mt-[0.75rem] md:w-5/12'>
                    <img src={dat.blogImage} loading='lazy' className='w-full h-[240px] object-cover' alt="" />
                    <div className='mx-[0.5rem] my-2 text-center'>{dat.blogTitle}</div>
                    <div className="w-full flex justify-center">
                      <div className='w-11/12 overflow-y-auto h-[120px] text-[0.75rem] text-[#555555] font-normal md:text-[0.875rem] mb-[1.188rem] ml-[0.75rem] text-left mt-1'
                        style={{ wordBreak: 'break-word', maxHeight: '120px', whiteSpace: 'pre-wrap' }}>
                        {dat.blogDescription}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* =============bottom pagination antd============ */}
              <div className='parent flex justify-center mt-[0.75rem]'>
                <Pagination
                  current={pageNumber}
                  total={filteredData.length}
                  pageSize={6}
                  onChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='mt-[1.875rem]'>
          <Looter />
        </div>
      </div>
    </>
  );
};

export default ApnaNews;
