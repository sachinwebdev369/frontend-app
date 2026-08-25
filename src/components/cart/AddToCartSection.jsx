import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem"; 
import axios from "axios";
import { backendUrl } from "../../serverUrl";
import { Link } from "react-router-dom";
import { calculateDiscountPrice } from "../products/Product";

const AddToCartSection = () => {
  const { cart, loading } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);
  const [total, setTotal] = useState(0); 
  const totalPrice = total + 3 * cart?.length;

  useEffect(() => {
    const totals = cart?.reduce((accumulator, currentItem) => { // calculating total money
      return ( accumulator + calculateDiscountPrice(currentItem?.price, currentItem?. discountPercentage, ) * currentItem.qty);
    }, 0);
    setTotal(totals);
  }, [cart]);

  return (
    <div className="flex items-start justify-start gap-6 mt-5 flex-col md:flex-row">
      <div className="w-full rounded-3xl border border-gray-300 p-3.5">
        {cart && isAuthenticated && cart.length === 0 ? <ZeroItemMsg /> : cart?.map((item) => <CartItem item={item} /> )}
      </div>

      <div className="p-5 border rounded-[20px] border-gray-300 flex flex-col gap-4 sm:gap-5 w-full sm:w-[50%] max-w-[430px]">
        <p className="text-xl sm:text-2xl font-bold">Order Summary</p>
        <div className="space-y-5 sm:space-y-6 sm:text-lg">
          <p className="flex justify-between "> 
            <span>subTotal</span> <b className=""> ${total.toFixed(2)}</b>
          </p>
          <p className="flex justify-between ">
            <span>Delivery fee</span>
            <b> $3 X {cart?.length} = {cart?.length * 3}</b>
          </p>
          <hr className="text-gray-300" />
          <p className="font-medium flex justify-between">
            <span>Total</span>
            <b className="text-xl sm:text-2xl">${totalPrice.toFixed(2)}</b>
          </p>
        </div>
        <div className="w-full">
          <Link to="/order/shipping" className="block text-center bg-black text-white px-6 py-3 rounded-full w-full  " > Go to Checkout </Link>
        </div>
      </div>
    </div>
  )};




  const ZeroItemMsg = () => {
    return (
       <div className='flex items-center flex-col min-h-[30vh] justify-center '>
        <p className='text-xl font-semibold text-neutral-800'>No any item in carts </p>
        <Link to="/" className='text-5xl mt-2 hover:underline transition-all font-bold text-orange-600/80 hover:text-orange-500/80'>shop Now</Link>
      </div>
    )
  }




export default AddToCartSection;