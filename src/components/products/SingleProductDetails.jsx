import React, { useState } from "react"; 
import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { RiStarLine } from "react-icons/ri";
import { calculateDiscountPrice } from "./Product";
import StarRating from "../otherFiles/StarRating";
import { useEffect } from "react";

const SingleProductDetails = ({ product }) => {
  const {_id,title,images,description,price,discountPercentage,rating,thumbnail} = product;
  const [mainImage, setMainImage] = useState(0);
  const [productSize, setProductSize] = useState("medium");
  const [activeTab, setActiveTab] = useState(0);
  const singleProduct = { reviews: [] }; 

  const addToCart = async (data) => { // handle add to cart
    const checkItem = cart.find((item) => item.productId === data._id);
    if (checkItem) console.log("already in cart");
    else {
      const { _id, ...restData } = data;
      await axios.put(`${backendUrl}/api/v1/cart/add-to-cart`,{productId: data._id, ...restData, }, { withCredentials: true })
        .then((res) => dispatch(getAllCart()))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <div className="my-6 flex flex-col lg:flex-row gap-5 md:gap-10">
        <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row gap-4 h-full lg:w-[50%] min-h-[300px] ">
          <div className="flex-1 flex items-center w-full  h-full justify-center order-1 md:order-2 lg:order-1 xl:order-2">
            {images && <img src={images[mainImage]} loading="lazy" alt="Product" className=" object-cover w-full h-full  md:max-h-[450px] bg-gray-200  rounded-lg shadow-md p-4"/>}
          </div>
          <div className="flex gap-4 md:flex-col lg:flex-row xl:flex-col md:min-w-[130px]  md:max-h-[450px] order-2 md:order-1 lg:order-2 xl:order-1 flex-nowrap overflow-x-auto h-full">
            {images && images?.map((image, index) => <img key={index} onClick={() => setMainImage(index)} src={image} alt={`Product ${index + 1}`} className="w-[120px] h-[130px] object-cover bg-gray-200 rounded-lg shadow-md mb-2 " /> )}
          </div>
        </div>

        <div className=" space-y-3 md:space-y-4 lg:w-[50%]">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold font-heading "> {title} </h2>
          <div className="flex items-center gap-4 ">
            <div className="flex items-center gap-2 "> <StarRating rating={rating} /> </div>
            <p className="text-sm text-neutral-500  md:text-base "> ({rating}/5) </p>
          </div>

          <p class="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-800/90 flex items-start gap-2.5 md:gap-3">
            {calculateDiscountPrice(price, discountPercentage)}$
            <span class="line-through text-neutral-400 -1"> {price}$ </span>
            <span class="text-sm md:text-base bg-red-200 px-2 py-0.5 rounded-3xl text-red-600/60 "> -{discountPercentage}% </span>
          </p>
          <p className="text-gray-600 mt-2 text-sm  md:text-base"> {description} </p>

          <div className="flex gap-4 mt-6">
            <div className="flex h-8 w-[150px] items-center justify-between overflow-hidden rounded-full bg-amber-300 sm:h-10 sm:w-[125px]">
              <span className="flex cursor-pointer pl-2 h-full flex-1 items-center justify-center hover:bg-amber-50/20"> <FaPlus size={20} /> </span>
              <span className="flex items-center justify-center px-1 text-sm"> 1 </span>
              <span className="flex h-full pr-2 cursor-pointer flex-1 items-center justify-center hover:bg-amber-50/20"> <FaMinus size={20} /> </span>
            </div>

            <button className="bg-black w-full  max-w-[400px] text-white px-6 py-3 rounded-full text-sm " onClick={() => addToCart(product)} > Add to cart </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductDetails;