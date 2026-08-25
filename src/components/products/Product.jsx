import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { RiStarLine, RiStarSFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { backendUrl } from "../../serverUrl";
import { getAllCart } from "../../api/features/cart";


//  calculate discount price
export const calculateDiscountPrice = (originalPrice, discountPercentage) => { 
  const discount = (originalPrice * discountPercentage) / 100;
  const discountedPrice = originalPrice - discount;
  return discountedPrice.toFixed(2); 
};



const Product = ({ item }) => {
  const { thumbnail, title, rating, price, _id } = item;
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const addToCart = async (data) => { // for add to cart
    const checkItem = cart.find((item) => item.productId === data._id);
    if (checkItem) console.log("already in cart");
    else {
      const { _id, ...restData } = data;
      await axios .put(`${backendUrl}/api/v1/cart/add-to-cart`,{productId: data._id,...restData,},{ withCredentials: true },)
        .then((res) =>dispatch(getAllCart()))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <div class="mx-auto w-[240px] rounded-3xl bg-slate-100 border group border-gray-300 p-2 ">
        <div class="h-[260px] w-full rounded-2xl  relative p-4 bg-white">
          <img src={thumbnail} class="h-full w-full object-cover object-center" alt=""/>
          <div class="absolute top-3 right-3 w-10 h-10 flex items-center opacity-0 group-hover:opacity-100 duration-200 justify-center border-2 hover:border-neutral-800/30 border-neutral-800/60 text-neutral-600  rounded-lg text-2xl " title="add to cart" onClick={() => addToCart(item)} >  <FaCartPlus /> </div>
        </div>
        <Link to={`/product-detail/product/${_id}`} class="mt-4 px-1 pb-2">
          <h1 class="text-base font-semibold text-neutral-700">{title}</h1>
          <p class="text-sm text-neutral-500">
            <span className="inline-flex gap-1 text-yellow-600 text-lg my-1">
              {[...Array(5)].map((__, i) => (
                <i key={i}>
                  {i < parseInt(item.rating) ? <RiStarSFill /> : <RiStarLine />}
                </i>
              ))}
            </span> 
          </p>
          <p class="text-lg font-bold text-neutral-800/90 flex items-start gap-2 flex-wrap">
            {calculateDiscountPrice(item.price, item.discountPercentage)}$
            <span class="line-through text-neutral-400 ">{item.price}$</span>
            <span class="text-[11px] hidden sm:inline-block bg-red-200 px-2 py-0.5 rounded-3xl text-red-600/60 ">
              -{item.discountPercentage.toFixed(2)}%
            </span>
          </p>
        </Link>
      </div>
    </div>
  )};

export default Product;
