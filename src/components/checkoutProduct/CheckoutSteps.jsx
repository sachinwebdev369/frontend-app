import React, { useEffect, useState } from "react";
import { MdLocalShipping } from "react-icons/md";
import { BiCartDownload } from "react-icons/bi";
import { RiBankFill } from "react-icons/ri";

const CheckoutSteps = ({ activePage = 1 }) => {
  const [percentage, setpercentage] = useState("0%");
  const [active, setActive] = useState(activePage);
 
  useEffect(() => {  // handling tracking animation
    if (active === 1) setpercentage("0%");
    if (active === 2) setpercentage("50%");
    if (active === 3) setpercentage("100%");
  }, [active]);
 

  return (
    <div className="flex h-[15vh] items-center justify-center container  mx-auto">
      <div className="relative mx-auto flex  w-[89%]  items-center justify-between">
        <div className="relative bg-white p-3">
          <p  className={`${active == 1 || 2 || 3 ? "text-orange-600" : "text-gray-500/80"} delay-500 text-xl md:text-2xl`}> <MdLocalShipping /> </p>
          <p className="absolute -left-4 top-12 w-32 text-xs text-neutral-700 font-semibold"> shipping Detail </p>
        </div>

        <div className="relative bg-white p-3">
          <p  className={`${active == 2 || active == 3 ? "text-orange-600" : "text-gray-500/80"} delay-500 text-xl md:text-2xl`} > <BiCartDownload /> </p>
          <p className="absolute -left-4 top-12 w-32 text-xs text-neutral-700 font-semibold"> Confirm Order</p>
        </div>

        <div className="relative bg-white p-3">
          <p className={`${active == 3 ? "text-orange-600" : "text-gray-500/80"} delay-500 text-xl md:text-2xl`} > <RiBankFill /> </p>
          <p className="absolute -left-4 top-12 w-32 text-xs text-neutral-700 font-semibold"> Payment </p>
        </div>

        <div className="absolute -z-10 h-[2px] w-full bg-slate-400">
          <div className="h-full w-[0%] duration-500 bg-orange-600" style={{ width: percentage }} ></div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;