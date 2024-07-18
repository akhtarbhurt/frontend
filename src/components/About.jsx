import React, { useEffect } from 'react'
import '../App.css' 
import  {img2,img1,Rectangle,IMG48,IMG49,IMG50,IMG51,IMG52,IMG53} from '../assets/images';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Navbar from './Navbar';
import Looter from  './Looter';
import axios from "axios";
import usecotextFunction from "../utils/useContext";
axios.defaults.withCredentials = true;

  
   
  

const About = () => {

  const { profile, setprofile,profilesrc, setprofilesrc } = usecotextFunction();

  // for navbar login signup and role
 




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
    speed: 700,
    centerMode: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
     
         
        }
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
     
      

    ]
  };


  return (

<>
    <div className=' h-full w-full overflow-x-hidden aboutpages'>

<Navbar />

  <div className="topaboutbanner mt-[1rem]  w-full  xs:h-[13.75rem]  flex flex-col justify-center items-center md:h-[25rem] lg:h-[31.25rem] ">
  <h1 className=' text-white xs:text-[1.875rem] lg:text-[2.438rem]'>About Apna Connection</h1>
  <p className=' text-white xs:text-[1rem] sm:text-[1rem] md:text-[1.188rem] lg:text-[1.188rem] text-center'>Apna Connection Helps Grow Your Business Using Customer Reviews </p>
  </div>
  

<section className='passiondrive bg-[#eef3f7] w-full h-full flex justify-center items-center pt-[2.688rem] pb-[1.188rem]'>
    <div className='  xs:w-full xs:flex-col  h-full flex justify-center items-center md:w-9/12 md:flex-row'>
<div className=' h-full lg:w-1/2 xs:w-full xs:order-2 lg:order-1 mb-[1.183rem]' >
    <img className=' h-full w-full' loading='lazy' src={img1} alt="" />
</div>
<div className='  lg:w-1/2 ml-[0.75rem] xs:w-full md:h-[21.875rem] md:flex md:flex-col md:justify-center lg:order-2'>
    <h1 className=' text-[2.063rem]'>Passion Drive Us</h1>
    <p className=' mt-[0.625rem] xs:w-11/12 sm:w-11/12 lg:w-9/12'>Dolor detraxit duo in, ei sea dicit reformidans. Mel te accumsan patrioque referrentur. Has causae perfecto ut, ex choro assueverit eum. Qui omnium cetero expetenda no, detracto vivendum corrumpit cu duo.</p>
<p className=' mt-[0.75rem] w-10/12'>Sed ne prompta insolens mediocrem.</p>
<p className=' mt-[1.25rem] mb-[0.875rem]'>Mark Twain CEO</p>
</div>
</div>
</section>


<section className='succesisourgoal bg-white w-full h-full flex justify-center items-center py-[2.688rem]'>
    <div className=' xs:w-full xs:flex-col  h-full flex justify-center items-center md:w-9/12 md:flex-row'>

<div className=' lg:w-1/2 ml-[0.75rem] xs:w-full md:h-[21.875rem] md:flex md:flex-col md:justify-center lg:order-1 mb-[1.25rem]'>
    <h1 className=' text-[1.875rem] '>Succes is our GOAL!</h1>
    <p className=' mt-[0.625rem] w-11/12 sm:w-11/12 lg:w-11/12'>Vis at partem hendrerit, his te facete tacimates concludaturque, duo ex fabulas menandri. Idque saperet assentior mea an. Nisl copiosae reformidans duo ea, no doming elaboraret sed.</p>
<p className=' mt-[0.75rem] w-11/12 sm:w-11/12 lg:w-11/12'>Quod exerci torquatos id sit, ne vix officiis consetetur. Te viris corpora voluptaria mea, hendrerit prodesset no cum.</p>

</div>
<div className='  h-full lg:w-1/2 xs:w-full xs:order-2 lg:order-2'>
    <img loading='lazy' className=' h-full w-full' src={img2} alt="" />
</div>
</div>
</section>


<section className=' ourvalues w-full  md:h-full lg:h-[24.375rem] xs:h-full flex flex-col justify-around items-center py-[0.75rem]'>
    <div className=' xs:py-[0.625rem] lg:py-[0px]'>
        <h1 className=' text-center text-white text-[2rem]'>Our Values</h1>
        <p className=' text-white text-center  xs:text-[1rem] xs:ml-2 sm:text-[1.063rem] md:text-[1.438rem] lg:ml-0 lg:text-left'>Cum doctus civibus efficiantur in imperdiet deterruisset.</p>
    </div>
    <div className=' w-full h-4/6 flex lg:justify-around lg:flex-row xs:flex-col xs:justify-around  xs:mt-[0.75rem] lg:mt-[0px]'>
        <div className=' lg:w-2/6 xs:w-full  flex flex-col justify-center xs:py-[0.625rem] lg:py-[0px] '>
           
           <div className=' flex lg:ml-[3.125rem] xs:ml-[0.625rem] cursor-pointer text-gray-400 hover:text-white parent-div'><span><img className=' h-[1.875rem] child-img' src={Rectangle} alt="image" /></span><p className=' ml-[0.75rem] xs:text-[0.875rem] sm:text-[1rem] lg:text-[1.063rem]'>Helps consumers and companies</p></div> 
           <div className='flex lg:ml-[3.125rem] xs:ml-[0.625rem] cursor-pointer text-gray-400 hover:text-white parent-div1'> <span><img className='child-img1 h-[1.875rem]' src={Rectangle} alt="image" /></span><p className=' ml-[0.75rem] xs:text-[0.875rem] sm:text-[1rem] lg:text-[1.063rem]'>Shoppers and retailers benefits</p></div>
           <div className='flex lg:ml-[3.125rem] xs:ml-[0.625rem] cursor-pointer text-gray-400 hover:text-white parent-div2'><span><img className='child-img2 h-[1.875rem]' src={Rectangle} alt="image" /></span><p className=' ml-[0.75rem] xs:text-[0.875rem] sm:text-[1rem] lg:text-[1.063rem]'>Making e-commerce so divers</p></div> 
          <div className='parent-div3 flex lg:ml-[3.125rem] xs:ml-[0.625rem] cursor-pointer text-gray-400 hover:text-white'> <span className=''><img className='child-img3 h-[1.875rem]' src={Rectangle} alt="image" /></span><p className=' ml-[0.75rem] xs:text-[0.875rem] sm:text-[1rem] lg:text-[1.063rem]'>Assess their service daily</p></div> 
        </div>
        <div className='xs:w-full xs:mt-[0.125rem] xs:ml-2 valueslastpara
                  lg:w-2/6 lg:mt-[0.125rem] lg:ml-0 text-white flex items-center lg:text-[1.188rem] xs:py-[0.625rem] lg:py-[0px] lg:translate-y-[-1/313rem] leading-[1.125rem]'>Vis at partem hendrerit, his te facete tacimates concludaturque, duo ex fabulas menandri. Idque saperet assentior mea an. Nisl copiosae reformidans duo ea, no doming elaboraret sed. Malorum cotidieque an cum.</div>
    </div>

</section>


<section className='founders bg-[#eef3f7] xs:py-[2.5rem] md:py-[3.125rem] lg:py-[1.875rem] lg:pt-[2.063rem]'>
    <div className=' '>
<h1 className=' text-center text-[1.75rem] sm:text-[1.75rem] md:text-[1.75rem] font-normal'>Our Founders</h1>
<p className=' text-center text-[1.375rem] sm:text-[1.438rem] font-normal md:text-[1.438rem] lg:text-[1.438rem]'>Cum doctus civibus efficiantur in imperdiet deterruisset.</p>
</div>
</section>


{/* =============slider============== */}


<section className='  w-full  bg-[#eef3f7] pb-[4.375rem] mb-[3.688rem] lg:pt-[1.875rem]'>
  <div  className="slider-container ">
<Slider {...settings}>
        <div className=''>
          <h3 className=' '><img loading='lazy' className=' w-[10.938rem] h-[8.75rem]' src={IMG49} alt="" /></h3>
        </div>
        <div>
        <h3 className=' '><img className='w-[10.938rem] h-[8.75rem]' loading='lazy' src={IMG50} alt="" /></h3>
        </div>
        <div>
        <h3 className=' '><img className='w-[10.938rem] h-[8.75rem]' loading='lazy'  src={IMG51 } alt="" /></h3>
        </div>
        <div>
        <h3 className=' '><img className='w-[10.938rem] h-[8.75rem]' loading='lazy' src={IMG52} alt="" /></h3>
        </div>
        <div>
        <h3 className=' '><img className='w-[10.938rem] h-[8.75rem]' loading='lazy' src={IMG53} alt="" /></h3>
        </div>
        <div>
        <h3 className=' '><img className='w-[10.938rem] h-[8.75rem]' loading='lazy' src={img1} alt="" /></h3>
        </div>
      </Slider>
      </div>
      </section>

{/* =============slider============== */}
 

    </div>
   
   <div className=' mt-[1rem]'>
    <Looter />
   </div>
    </>
  )
}

export default About