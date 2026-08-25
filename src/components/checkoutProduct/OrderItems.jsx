import React from "react";
import { CgClose } from "react-icons/cg";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";

const OrderItems = ({ item}) => {
  const { _id: id, images, title, price, qty } = item;

  return (
    <div className="flex flex-row px-1 py-2 my-2  bg-gray-100/60 text-gray-700 gap-3 relative" key={id} >
      <div className="h-[100px] w-[100px] rounded-lg bg-gray-300 sm:h-[125px] sm:w-[125px]">
        <img src={images[0]} className="h-full w-full object-cover" alt="idno"/>
      </div>

      <div className=" px-2  w-full relative  ">       
        <div className="mb-5 pr-12">
          <p className="font-bold sm:text-xl me-4"> {title}</p>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <div className="text-base font-bold text-neutral-800/90 flex items-start gap-2 flex-wrap"> ${parseFloat(price).toFixed(2)} X {qty} = <span className="text-lg text-orange-700/80"> $ {parseFloat(price * qty).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItems;
