import  { useEffect } from 'react'
import "../App.css"
import  {img11,img12,img13,img14,img15,img16,img17} from '../assets/images';
import Navbar from './Navbar';
import Looter from './Looter';
import axios from "axios";
import usecotextFunction from "../utils/useContext";
axios.defaults.withCredentials = true;

const Help = () => {

    const { profile, setprofile,profilesrc, setprofilesrc } = usecotextFunction();

 

  return (
<>
<Navbar />
    <div className=' mt-[1rem] '>
        <div className='helpbgpic flex justify-center items-center flex-col'>
<h1 className=' text-white'>Help Center</h1>
<div className=' flex mt-[1.188rem]'>
    <input type="text" aria-label='help'  className=' h-[2.063rem] xs:w-[13.125rem] md:w-[17.5rem]' />
    <span className=' h-[2.063rem] w-[3.563rem] bg-[#3578FA]'></span>
</div>
        </div>


        <div className=' w-full bg-[#EEF3F7] flex justify-center helppage'>
<div className=' w-full flex flex-wrap justify-center my-[0.938rem]'>
<div className=' h-[16.563rem]  xs:w-10/12  bg-white flex flex-col justify-around items-center mx-[0.313rem] my-[0.625rem] md:w-3/12 md:py-[1.125rem]'>
    <div className=' bg-[#EAEBF4] rounded-full h-[5.625rem] w-[5.625rem] flex justify-center items-center'>
        <img loading='lazy' src={img11} alt="pics" />
    </div>
    <div className=' font-medium leading-[22px]'>Payments</div>
    <div className=' w-10/12 text-center leading-[22px]'>Id mea congue dictas, nec et summo mazim impedit. Vim te audiam impetus interpretaris.</div>
</div>
<div className='h-[16.563rem]  xs:w-10/12 bg-white flex flex-col justify-around items-center m-[0.313rem] md:w-3/12 md:py-[1.125rem]'> 
    <div className=' bg-[#EAEBF4] rounded-full h-[5.625rem] w-[5.625rem] flex justify-center items-center'>
        <img loading='lazy' src={img12} alt="pics" />
    </div>
    <div className=' font-medium'>Account</div>
    <div className=' w-10/12 text-center'>Id mea congue dictas, nec et summo mazim impedit. Vim te audiam impetus interpretaris.</div>
</div>
<div className='h-[16.563rem]  xs:w-10/12 bg-white flex flex-col justify-around items-center m-[0.313rem] md:w-3/12 md:py-[1.125rem]' > 
    <div className=' bg-[#EAEBF4] rounded-full h-[5.625rem] w-[5.625rem] flex justify-center items-center'>
        <img loading='lazy' src={img13} alt="pics" />
    </div>
    <div className=' font-medium'>General help</div>
    <div className=' w-10/12 text-center'>Id mea congue dictas, nec et summo mazim impedit. Vim te audiam impetus interpretaris.</div>
</div>
<div className='h-[16.563rem]  xs:w-10/12 bg-white flex flex-col justify-around items-center m-[0.313rem] md:w-3/12 md:py-[1.125rem]'> 
    <div className=' bg-[#EAEBF4] rounded-full h-[5.625rem] w-[5.625rem] flex justify-center items-center'>
        <img loading='lazy' src={img14} alt="pics" />
    </div>
    <div className=' font-medium'>International</div>
    <div className=' w-10/12 text-center'>Id mea congue dictas, nec et summo mazim impedit. Vim te audiam impetus interpretaris.</div>
</div>
<div className='h-[16.563rem]  xs:w-10/12 bg-white flex flex-col justify-around items-center m-[0.313rem] md:w-3/12 md:py-[1.125rem]'>
    <div className=' bg-[#EAEBF4] rounded-full h-[5.625rem] w-[5.625rem] flex justify-center items-center'>
        <img loading='lazy' src={img15} alt="pics" />
    </div>
    <div className=' font-medium'>Cancellation</div>
    <div className=' w-10/12 text-center'>Id mea congue dictas, nec et summo mazim impedit. Vim te audiam impetus interpretaris.</div>
</div>
<div className='  xs:w-10/12 bg-white flex flex-col justify-around items-center m-[0.313rem] md:w-3/12 md:py-[1.125rem] h-[16.563rem]'>
    <div className=' bg-[#EAEBF4] rounded-full h-[5.625rem] w-[5.625rem] flex justify-center items-center'>
        <img loading='lazy' src={img16} alt="pics" />
    </div>
    <div className=' font-medium'>Reviews</div>
    <div className=' w-10/12 text-center'>Id mea congue dictas, nec et summo mazim impedit. Vim te audiam impetus interpretaris.</div>
</div>
</div>
        </div>


        <div className=' populararticles bg-white w-full py-[2.063rem]' >

<div className=' w-full flex justify-center items-center my-[1.25rem]'>
    <div className=' w-9/12'>
<h1 className=' text-[2rem] font-normal '>Popular articles</h1>
<p className=' text-[1.063rem] font-normal'>Cum doctus civibus efficiantur in imperdiet deterruisset.</p>
    </div>
</div>
<div className=' w-full flex justify-center items-center '>
<div className='   xs:w-full md:w-9/12 flex justify-between  xs:flex-col md:flex-row'>
<div className=' w-full left md:w-6/12'>
    <div className='py-[0.75rem]  flex items-center border-b-[1px] border-zinc-200 mb-[0.188rem] ml-[0.75rem] md:ml-[0px]'>
        <p><img loading='lazy' src={img17} alt="pic" /></p><span className=' ml-[6px] text-[#555555]'>Et dicit vidisse epicurei pri</span>
    </div>
    <div className='py-[0.75rem] mb-[0.188rem] flex items-center border-b-[1px] border-zinc-200 ml-[0.75rem] md:ml-[0px]'>
        <p><img loading='lazy' src={img17} alt="pic" /></p><span className=' ml-[6px] text-[#555555]'>Et dicit vidisse epicurei pri</span>
    </div>
    <div className='py-[0.75rem] mb-[0.188rem] flex items-center border-b-[1px] border-zinc-200 ml-[0.75rem] md:ml-[0px]'>
        <p><img loading='lazy' src={img17} alt="pic" /></p><span className=' ml-[6px] text-[#555555]'>Et dicit vidisse epicurei pri</span>
    </div>
    <div className='py-[0.75rem] mb-[0.188rem] flex items-center border-b-[1px] border-zinc-200 ml-[0.75rem] md:ml-[0px]'>
        <p><img loading='lazy' src={img17} alt="pic" /></p><span className=' ml-[6px] text-[#555555]'>Et dicit vidisse epicurei pri</span>
    </div>
</div>

<div className='  w-full right  md:w-6/12 md:ml-[19px]'>
    <div className='py-[0.75rem] mb-[0.188rem] flex items-center border-b-[1px] border-zinc-200 ml-[0.75rem] md:ml-[0px]'>
        <p><img loading='lazy' src={img17} alt="pic" /></p><span className=' ml-[6px] text-[#555555]'>Et dicit vidisse epicurei pri</span>
    </div>
    <div className='py-[0.75rem] mb-[0.188rem] flex items-center border-b-[1px] border-zinc-200 ml-[0.75rem] md:ml-[0px]'>
        <p><img loading='lazy' src={img17} alt="pic" /></p><span className=' ml-[6px] text-[#555555]'>Et dicit vidisse epicurei pri</span>
    </div>
    <div className='mb-[0.188rem] flex items-center border-b-[1px] border-zinc-200 ml-[0.75rem] md:ml-[0px] py-[0.75rem]'>
        <p><img loading='lazy' src={img17} alt="pic" /></p><span className=' ml-[6px] text-[#555555]'>Et dicit vidisse epicurei pri</span>
    </div>
    <div className=' flex items-center border-b-[1px] border-zinc-200 ml-[0.75rem] md:ml-[0px] py-[0.75rem]'>
        <p className=''><img loading='lazy' src={img17} alt="pic" /></p><span className=' ml-[6px] text-[#555555]'>Et dicit vidisse epicurei pri</span>
    </div>
</div>
</div>

</div>    

        </div>

        <hr className=' border-b-[1px] border-[#EDEDED] mt-[0.75rem]'/>
    </div>

<div className=' mt-[1.875rem]'>
<Looter /> 
</div>   
</>
  )
}

export default Help;