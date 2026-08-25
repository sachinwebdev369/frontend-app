import React, { useEffect, useState } from "react";
import { BiMenu, BiSearchAlt2, BiSolidUserCircle } from "react-icons/bi";
import { FaDashcube } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [activeNav, setActiveNav] = useState(false);
  const [showSearchbar, setShowSearchbar] = useState(false);
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const handleOnClick = (toGo) => {
    setActiveNav(false);
    navigate(toGo);
  };

  let navItems = [
    { item: "home", goto: "/" },
    { item: "products", goto: "/products" },
    { item: "about us", goto: "/about-us" },
    { item: "contact us", goto: "/contact-us" },
  ];

  return (
    <div>
      <header className="relative flex items-center justify-between gap-6 bg-neutral-0 p-4">
        <div className="flex items-center gap-6 ">
          <div onClick={() => setActiveNav(!activeNav)} className="p-1 lg:hidden"> <BiMenu size={30} /> </div>

          <div className="flex gap-2 items-center">
            <div className="bg-gradient-to-tr from-neutral-600 to-neutral-700 text-white p-2 text-xl rounded-lg shadow-xl"><FaDashcube /> </div>
            <h1 className="text-3xl font-bold font-heading"> SparkCart</h1>
          </div>
        </div>

        <nav className="hidden lg:block">
          <ul className="flex items-center text-base lg:text-lg  px-3">
            {navItems.map((item, i) => (
              <li>
                <Link to={item.goto} className="cursor-pointer px-5 py-0.5 hover:text-neutral-800 text-neutral-700 capitalize">  {item.item}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* <!-- mobile nav  --> */}
        <nav className={`absolute top-full ${activeNav ? "left-0" : "-left-full"} w-full z-2000 text-center   font-medium duration-200 lg:hidden  px-2`}>
          <ul className="px-1.5 space-y-1 py-4 text-sm text-neutral-800 rounded-lg bg-neutral-200/95">
            {navItems.map((item, i) => (
              <li>
                <p onClick={() => handleOnClick(item.goto)} className="rounded-md  block p-1 ps-3 duration-150 cursor-pointer hover:text-neutral-800 text-neutral-700 capitalize">
                  {item.item}
                </p>
              </li>
            ))}

            <div className="sm:hidden block  pt-2 ">
              <UserBtn user={user} isAuthenticated={isAuthenticated} />
            </div>
          </ul>
        </nav>

        <div className="flex items-center gap-3 ps-2">
          <div className="sm:hidden" onClick={() => setShowSearchbar(true)}> <BiSearchAlt2 size={23} /> </div>
          <Link to={"/cart"} className="relative">
            <IoMdCart className="text-3xl" />
            <span className="cursor-pointer hover:opacity-90 text-xs text-white font-medium flex items-center justify-center rounded-full absolute -top-3  -right-2 bg-orange-600/95 w-5 h-5"> {cart?.length} </span>
          </Link>

          <div className="hidden sm:block "> <UserBtn user={user} isAuthenticated={isAuthenticated} /> </div>
        </div>
      </header>
    </div>
  )};



const UserBtn = ({ user, isAuthenticated }) => {
  return !isAuthenticated ? (
    <div className="flex items-center gap-3">
      <Link to={"/signup"}> 
        <button className="cursor-pointer hover:opacity-90 bg-black text-white px-6 py-2 rounded-full  "> SignUp</button>
      </Link>
      <Link to={"/login"}> 
        <button className="cursor-pointer hover:opacity-90 bg-black text-white px-6 py-2 rounded-full  "> Login </button>
      </Link>
    </div>
  ) : (
    <div className=" flex gap-3 items-center">
      <Link to={"/user/profile"} className="text-3xl"> <BiSolidUserCircle /> </Link>

      {user.role === "admin" && (
        <Link to={"/admin/dashboard"}> 
          <button className="cursor-pointer hover:opacity-90 bg-black text-white px-6 py-2 rounded-full  "> Admin Dashboard </button>
        </Link>)}
    </div>
  )};

export default Navbar;