import React from 'react'
import { BiBell,BiDownArrow,BiMenu, BiSearch, } from "react-icons/bi";
import imgUser  from '../../img1.webp'
import { CiSettings } from "react-icons/ci";

const TopHeader = ({ onToggle }) => {
  return (
     <div className="px-6 py-4 bg-white border-b sticky top-0 z-[111] border-b-gray-300" >
      <div className=" gap-6 flex items-center justify-between w-full">
        <div className=" gap-6 flex items-center justify-between">
          <i className="text-2xl rounded-md hover:bg-slate-100 p-2.5" onClick={onToggle} > <BiMenu /> </i>
          <div className="hidden xl:block">
            <h1 className="text-2xl font-black   text-neutral-800  ">Dashboard</h1>
            <p className="text-xs  text-neutral-500 font-medium "> Welcome back, sachin! Here's what happing today</p>
          </div>
        </div>
        <div className="hidden sm:block relative flex-1 max-w-[450px] mx-auto">
          <input type="text" className="border w-full py-2.5 ps-4 pe-12 bg-slate-100 rounded-lg" placeholder="Seach here..." />
          <i className="absolute top-1/2 right-1 px-2.5 rounded-md transform -translate-y-1/2 py-2.5 text-lg text-neutral-600  hover:bg-slate-200 "> <BiSearch /></i>
        </div>

        <div className="flex items-center justify-center gap-1">
          <span className="hover:bg-slate-100 p-2.5 sm:hidden block  rounded-md text-lg "> <BiSearch /> </span>
          
          <span className="hover:bg-slate-100 p-2.5 rounded-md text-lg relative "> <BiBell />
            <p className="text-xs bg-red-600 text-white w-5 h-5  rounded-2xl flex items-center justify-center absolute -top-1 right-1">4</p>
          </span>
          <span className="hover:bg-slate-100 p-2.5 rounded-md text-lg "> <CiSettings /> </span>

          <div className="flex items-center  justify-center gap-3 border-l border-l-gray-300 ps-2 ms-2  ">
            <div className="bg-slate-200 rounded-full overflow-hidden text-lg w-9 h-9 ">
              <img src={imgUser} className="w-full h-full object-cover object-top" alt=""/>
            </div>
            <div className="hidden lg:block">
              <h3 className="text-base text-slate-500 ">Sachin kumar</h3>
              <p className="text-xs text-neutral-500 font-normal">Administrator </p>
            </div>
            <i className="text-lg text-neutral-600 p-2 hidden lg:inline-block"> <BiDownArrow /></i>
          </div>
        </div>   </div>  </div>
  )}

export default TopHeader
