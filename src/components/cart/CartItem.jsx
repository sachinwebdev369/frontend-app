import React, { useEffect, useState } from "react";
import img1 from "../img1.webp";
import { IoMdClose } from "react-icons/io";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";
import axios from "axios";
import { backendUrl } from "../../serverUrl";
import { useDispatch } from "react-redux";
import { getAllCart } from "../../api/features/cart";
import { calculateDiscountPrice } from "../products/Product";
import StarRating from "../otherFiles/StarRating";
import { Link } from "react-router-dom";

const CartItem = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const removeFromCart = async (id) => { // remove item from cart
    const response = await axios.delete(`${backendUrl}/api/v1/cart/delete-cart/${id}`,{ withCredentials: true },);
    if (response.data.success) dispatch(getAllCart())
  };

  const handleUpdateQty = async ({ id, qty }) => { // handling quantity of a item
    setLoading(true);
    const response = await axios.post( `${backendUrl}/api/v1/cart/update-cart/${id}`,{ qty }, { withCredentials: true }, );
    if (response.data.success) {
      dispatch(getAllCart());
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div key={item._id} className="flex gap-3.5 border-b border-b-gray-300 py-4 sm:py-6 first:pt-0 last:border-0 last:pb-0" >
      <div className="h-[100px] w-[100px] rounded-lg bg-gray-300 sm:h-[125px] sm:w-[125px]">
        <img src={item.images[0]} className="h-full w-full object-cover" alt="" />
      </div>

      <div className="relative w-full">
        <div onClick={() => removeFromCart(item._id)} className="absolute top-0 right-0 p-2 hvoer:opacity-90" > <FaTrash className="text-lg" /> </div>
        <Link to={`/product-detail/product/${item?.productId}`} className="font-bold sm:text-xl me-4" > {item?.title} </Link>

        <div className="mt-5 flex flex-wrap items-center justify-between">
          <div>
            <p class="text-sm font-bold text-neutral-800/90 flex items-start gap-2 flex-wrap">
              ${calculateDiscountPrice(item?.price, item?.discountPercentage)}
              <span class="line-through text-neutral-400 -1"> {item?.price}$ </span>
              <span class="text-[11px] hidden sm:inline-block bg-red-200 px-2 py-0.5 rounded-3xl text-red-600/60 "> -{item?.discountPercentage.toFixed(2)}% </span>
            </p>

            <p class="text-lg font-medium mt-2 text-neutral-800/90 flex items-start gap-2 flex-wrap"> ${calculateDiscountPrice(item?.price, item?.discountPercentage)} X{" "} {item?.qty} = ${item?.qty * calculateDiscountPrice(item?.price, item?.discountPercentage)}
            </p>
          </div>
          
          <div className="flex h-8 w-[100px] items-center justify-between overflow-hidden rounded-full bg-amber-300 sm:h-10 sm:w-[125px]">
            <span onClick={() => handleUpdateQty({ id: item._id, qty: item.qty + 1 }) }className="flex h-full text-lg flex-1 items-center justify-center hover:bg-amber-50/20"> <FaPlus /> </span>
            <span className="flex items-center justify-center px-1 text-sm"> {item.qty} </span>
            <span onClick={() => handleUpdateQty({ id: item._id, qty: item.qty - 1 }) } className="flex h-full text-lg flex-1 items-center justify-center hover:bg-amber-50/20" > <FaMinus /> </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
