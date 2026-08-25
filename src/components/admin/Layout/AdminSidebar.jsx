import React, { useState } from "react";
import { BiSolidDashboard } from "react-icons/bi";
import {   FaLessThan, FaUsers,  FaShoppingBag,} from "react-icons/fa"; 
import imgUser from "../../img1.webp";
import { useNavigate } from "react-router-dom";
import { IoBagAdd } from "react-icons/io5";
import { PiShoppingBagOpenLight } from "react-icons/pi";


const menuItem = [
  {id: "dashboard", icon: <BiSolidDashboard className="text-xl" />, label: "Dashboard", active: true, badge: "New"},
      {id: "all-products", label: "All Products", icon: <FaShoppingBag className="text-xl" />},
      {id: "create-porduct", label: "Create Product", icon: <IoBagAdd className="text-xl" />},
      {id: "all-users", label: "All Users", icon: <FaUsers className="text-xl" />},
      { id: "add-user",label: "Add User ",icon: <FaUsers className="text-xl" />},
    {id: "all-orders", icon: <PiShoppingBagOpenLight  className="text-xl" />, label: "Orders"},
  ];

const AdminSidebar = ({ currentPage, setCurrentPage, collapsed, onToggle }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className={`bg-white z-[999] h-screen ${collapsed ? "w-20" : "w-72"} flex flex-col fixed sm:static top-0 left-0`} >
        {!collapsed && ( <div className="w-10 sm:hidden h-10 bg-blue-500 hover:opacity-90 text-white flex items-center justify-center absolute -right-4 top-24 rounded-full text-base " onClick={onToggle} > <FaLessThan /></div> )}

        <div className={`${collapsed ? "p-2" : "p-4"}`}>
          <div className="bg-slate-200/50 w-full p-3 rounded-xl flex items-center gap-2">
            <i className="border rounded-lg bg-gradient-to-t from-blue-500 to-purple-600 w-10 h-10 flex items-center justify-center text-white "><BiSolidDashboard className="text-2xl " /></i>
            {!collapsed && (<div className="">
                <h1 className="text-xl font-bold text-slate-800 "> SparkCart </h1>
                <p className="text-xs text-slate-500 "> Admin Panel</p>
              </div>) }
          </div> 
        </div>

        <div className="flex-1 overflow-y-auto border-t mt-10 border-neutral-300 p-4 ">
          <nav className=" space-y-2">
            {menuItem.map((item, index) => {
              return (<div key={index} className=" ">
                  <div onClick={() => { 
                      setCurrentPage(item.id);
                      navigate(item.id);
                    }} className={` ${ currentPage === item.id? "bg-blue-700/80 text-white": "hover:bg-blue-700/20 text-slate-900"} cursor-pointer p-3 rounded-xl flex items-center gap-3`}> {item.icon}
                    {!collapsed && <p className=" flex-1 ">{item.label}</p>}
                  </div>
                </div>
              ) })}
          </nav>
        </div>

        <div className={`${collapsed ? "p-2" : "p-4"}`}>
          <div className="p-3 bg-gray-200 flex gap-3 rounded-xl">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-red-500">
              <img src={imgUser} className="w-full h-full object-cover object-top" alt=""/>
            </div>
            {!collapsed && ( <div>
                <p className="text-sm font-medium text-slate-800 truncate">Alex Johnson</p>
                <p className="text-xs text-slate-50 truncate ">Administrator</p>
              </div>)}
          </div>
        </div></div></div>
  )};

export default AdminSidebar;