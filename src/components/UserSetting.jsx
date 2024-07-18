import React from 'react'
import { profile } from '../assets/images'
import Looter from './Looter'

export default function UserSetting() {
    return (
        <>
            <div className='bg-blue-700 h-[30vh]   ' >
                <div className=' max-w-4xl m-auto ' >
                    <div className='flex justify-between items-center pt-16 text-white ' >
                        <div className=' flex gap-5 items-center ' >
                            <img src={profile} className='object-contain  h-20 w-20 ' alt=" user profile " />
                            <span className=' text-nowrap' > Zeeshan Adil  </span  >
                        </div>
                        <div className='flex gap-3' >
                            <div>
                                <div className='bg-customOrange p-5 rounded-full' >12</div>
                                <p  >reviews</p>
                            </div>
                            <div>
                                <div className='bg-customOrange p-5 rounded-full' >36</div>
                                <p  >reviews</p>
                            </div>
                            <div>
                                <div className='bg-customOrange p-5 rounded-full' >32</div>
                                <p  >reviews</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className=' max-w-7xl m-auto mt-10' >
                <div className='flex gap-3' >
                    <div className='w-3/5 border h-full rounded-md shadow-md ' >
                        <div className='p-5 border w-full' >
                            <h2 className='text-lg text-orange-500 ' >Personal Setting</h2>
                        </div>
                        <div className='capitalize' >
                            <div className='p-5' >

                                <h4 className='font-bold' >Edit Profile Text</h4>
                                <textarea name="" id="" cols="30" rows="10" className=' h-[20vh] resize-none border w-[100%] mt-3 ' > </textarea>

                            </div>
                            <div className="p-5">
                                <h4>edit photo</h4>
                                <div className='flex items-center' >
                                    <button className='bg-blue-700 text-white p-2 px-5' >Choose File</button>
                                    <div>
                                        <label htmlFor="fileInput" className=' bg-white text-black border border-black-200 p-2 px-5 cursor-pointer'>Choose File</label>
                                        <input type="file" id="fileInput" className='hidden' />
                                    </div>
                                </div>
                            </div>
                            <div className='p-5' >
                                <h4>edit email</h4>
                                <input type="text" className='w-full p-2 border border-slate-400 mt-2 ' placeholder='name@domain.com' />
                            </div>
                            <div className='p-5' >
                                <h4>edit full name</h4>
                                <input type="text" className='w-full p-2 border border-slate-400 mt-2 ' placeholder='your name' />
                            </div>
                            <div className='p-5' >
                                <h4>edit city</h4>
                                <input type="text" className='w-full p-2 border border-slate-400 mt-2 ' placeholder='karachi' />
                            </div>
                            <div className='p-5' >
                                <h4>edit country</h4>
                                <input type="text" className='w-full p-2 border border-slate-400 mt-2 ' placeholder='pakistan' />
                            </div>
                            <div className='w-full text-end mt-5 p-5 ' >
                                <button className='bg-blue-700 p-2 text-white rounded-sm ' >Save Personal Info</button>
                            </div>
                        </div>
                    </div>
                    <div className=' w-2/5 border shadow-md h-full flex item-center ' >
                        <div className='capitalize p-10 ' >
                            <h3 className='text-xl text-orange-500' >delete account</h3>
                            <p className='text-sm mt-10' >At nec senserit aliquando intellegat, et graece facilisis pro. Per in ridens sensibus interesset, eos ei nonumes incorrupte, iriure diceret an eos.</p>
                            <button className='bg-blue-700 text-white p-2 px-5 rounded-sm mt-10 ' >delete account</button>
                        </div>
                    </div>
                </div>
            </section>
            <section className=' max-w-7xl m-auto mt-10' >
                <div className='flex gap-3' >
                    <div className='w-3/5 border h-full rounded-md shadow-md ' >
                        <div className='p-5 border w-full' >
                            <h2 className='text-lg text-orange-500 ' >Personal Setting</h2>
                        </div>
                        <div className='capitalize' >
                            
                            
                            <div className='p-5' >
                                <h4>current password</h4>
                                <input type="text" className='w-full p-2 border border-slate-400 mt-2 ' placeholder='current password' />
                            </div>
                            <div className='p-5' >
                                <h4>new password</h4>
                                <input type="text" className='w-full p-2 border border-slate-400 mt-2 ' placeholder='new password' />
                            </div>
                            <div className='p-5' >
                                <h4>confirm passowrd</h4>
                                <input type="text" className='w-full p-2 border border-slate-400 mt-2 ' placeholder='confirm password' />
                            </div>
                           
                            <div className='w-full text-end mt-5 p-5 ' >
                                <button className='bg-blue-700 p-2 text-white rounded-sm ' >Save Personal Info</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className=' mt-[30px]'>
            <Looter/>
            </div>            
        </>
    )
}
