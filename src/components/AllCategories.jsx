import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../utils/useContextApi';
import Navbar from './Navbar';
const AllCategories = () => {
  const { categorys } = useGlobalContext();

  return (
    <>
    <Navbar />
    <section className="all-categories-page mt-[6rem]">
      <h1 className="text-center text-3xl">All Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 place-items-center mt-6">
        {categorys?.map((elem, ind) => (
          <Link to={`/searchresultpage/${elem.category}`} key={ind}>
            <div className="w-[50vw] sm:w-[40vw] md:w-[40vw] h-[18vh] lg:w-[14vw] flex lg:h-[18vh] sm:mt-5 lg:mt-0 justify-evenly items-center flex-col bg-white border shadow-md capitalize hover:cursor-pointer hover:scale-110 transform transition duration-1000 ease-in-out mb-4 hover:bg-blue-500 hover:text-white">
              <div className="flex justify-center flex-col">
                <img src={elem.catImage} alt="category" className="h-[30px]" />
                <h3 className="mt-3 text-[13px]">{elem.category}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
    </>
  );
};

export default AllCategories;
