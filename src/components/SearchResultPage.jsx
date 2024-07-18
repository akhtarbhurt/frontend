import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { img22, img23 } from '../assets/images';
import { Rate } from 'antd';
import Looter from './Looter';
import axios from "axios";
import usecotextFunction from "../utils/useContext";
import { useGlobalContext } from '../utils/useContextApi';
import { Link, useParams } from 'react-router-dom';
import Popup from "./Popup"
import { toast } from 'react-toastify';
axios.defaults.withCredentials = true;  

const SearchResultPage = () => {
  const { profile, setprofile, profilesrc, setprofilesrc } = usecotextFunction();
  const { categorys, addCompany, companyReview, companyID } = useGlobalContext();
  const [selectCategory, setSelectCategory] = useState("");
  const [search, setSearch] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [findLength, setFindLength] = useState([])
  const { id } = useParams();
  // Filter by default category id
  const filterCategory = addCompany?.filter((elem) => elem.category === id);
  const getID = filterCategory?.map((elem)=> elem._id )
  console.log(getID.join(" "))
  // Set the default filtered results
  useEffect(() => {
    setFilteredResults(filterCategory);
  }, []);



  const handleClick = () => {
    if (search.trim() === "" && selectCategory.trim() === "") {
      toast.error("Search and category are empty");
      setFilteredResults([]);
    } else {
      const results = addCompany?.filter((elem) => {
        const matchesCategory = selectCategory ? elem.category.toLowerCase() === selectCategory.toLowerCase() : true;
        const matchesSearch = search ? elem.companyName.toLowerCase().includes(search.toLowerCase()) : true;
        return matchesCategory && matchesSearch;
      });
      setFilteredResults(results);
    }
  }

  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

  

  return (
    <>
      <Popup />
      <div className='w-full h-full'>
        <Navbar />
        <div className='  w-full bg-[#dbdcdd] mt-[1rem]  flex justify-center items-center flex-col py-1 md:flex-row'>
          <div className='  w-full flex items-center justify-between md:w-9/12 lg:w-8/12 px-4'>
            <div className='text-white text-center text-sm md:text-left md:w-3/12'>
              145 results for "All categories"
            </div>
            <div className='flex w-full mt-3 md:mt-0 md:w-6/12 bg-slate-100 rounded-md'>
              <input
                type="text"
                placeholder='search for company or category...'
                className='border-r-2 rounded-l-md w-11/12 px-1'
                onChange={(e) => setSearch(e.target.value)}
              />
            
              <img
                loading='lazy'
                className='cursor-pointer px-2 py-1'
                src={img22}
                alt=""
                onClick={handleClick}
              />
            </div>
          </div>
        </div>

        <div className='w-full md:flex justify-center py-2'>
          <div className='w-full flex justify-between md:w-9/12 lg:w-8/12 px-4'>
            <div className='flex justify-between w-4/12 md:w-3/12 lg:w-2/12'>
              <p>All</p>
              <p>Latest</p>
              <p>Oldest</p>
            </div>
            <div className='flex items-center justify-end w-4/12 md:w-2/12'>
              <img loading='lazy' src={img23} alt="pic" />
              <p>More filters</p>
            </div>
          </div>
        </div>

        <div className='md:hidden text-center mt-2'>
          <div>Filters</div>
          <div className='flex justify-around mt-3'>
            <p>All</p>
            <p>Latest</p>
            <p>Oldest</p>
          </div>
        </div>

        <div className='bg-[#EEF3F7] w-full flex justify-center'>
          <div className='w-full md:w-8/12 px-4 min-h-screen'>
            {filteredResults?.length > 0 ? (
              filteredResults.map((elem) => (
                
                <div key={elem._id} className='bg-white w-full mt-3 py-3 px-4 mb-4 md:w-11/12 lg:w-8/12'>
                
                  <div className='text-[#428BCA] flex gap-2'>
                    <Link to={`/publicreviewpage/${elem._id}`}>{elem.companyName}</Link> | <span>{elem.siteLink}</span>
                    <Link to={`/review/${elem._id}`} >
                       <span className='ml-3 text-sm'>Write a review</span>
                    </Link>
                  </div>
                  <div className='flex items-center mt-2'>
                    <p> {elem.description} </p>
                    
                  </div>
                </div>
              ))
            ) : (
              <div className='bg-white w-full py-3 px-4 mb-4 md:w-11/12 lg:w-5/12 text-center'>
                <p>No results found.</p>
              </div>
            )}
          </div>
        </div>

        <Looter />
      </div>
    </>
  );
}

export default SearchResultPage;
