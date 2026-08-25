import React, { useState, useEffect } from "react";
import OrderItems from "./OrderItems";
import img1 from "../img1.webp";
import { useSelector } from "react-redux";
import { calculateDiscountPrice } from "../products/Product";
import { useNavigate } from "react-router-dom";

const ConfirmOrderSection = () => {
  const { cart, loading } = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState(cart || []);
  const [total, setTotal] = useState(0);
  const totalPrice = parseFloat(total + 3 * cartItems?.length).toFixed(2);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("latestOrder"));

  const GoToPay = () => { // for go to payment page
    const localData = { shippingAddress: user?.shippingAddress, cart: cartItems,totalMoneyShipping: totalPrice, };
    localStorage.setItem("latestOrder", JSON.stringify(localData));
    navigate("/order/paymentStep");
  };

  
  useEffect(() => {
    const totals = cartItems?.reduce((accumulator, currentItem) => { // calculate total price
      return ( accumulator + calculateDiscountPrice(currentItem?.price,currentItem?.discountPercentage,) *currentItem.qty);
    }, 0);
    setTotal(totals);
  }, [cart]);

  return (
    <div className="my-16 grid gap-6 items-start px-3 md:grid-cols-12 ">
      <div className="md:col-span-8 rounded-3xl border border-gray-300 p-3.5">
        <div>
          <h3 className="text-2xl font-semibold text-neutral-800/90 sm:text-3xl">Shipping Info</h3>
          <div className="space-y-1 p-3 text-sm sm:p-8 text-neutral-800 font-medium lg:text-base">
            <p><span>Name:</span> <span>{user?.shippingAddress?.name}</span> </p>
            <p><span>Email:</span> <span>{user?.shippingAddress?.email}</span> </p>
            <p><span>Phone:</span> <span>{user?.shippingAddress?.phoneNumber}</span></p>
            <p><span>Address:</span> <span>{user?.shippingAddress?.address} </span> </p>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-neutral-800/90 md:text-3xl">Your cart Items:</h3>
          <div className="pt-3 md:p-8">
            {cartItems && cartItems?.map((item) => <OrderItems item={item}/>)}
          </div>
        </div>
      </div>

      <div className="p-5 border rounded-[20px] border-gray-300 flex flex-col gap-4 sm:gap-5  max-w-[430px] md:col-span-4 mx-auto w-full">
        <h4 className="text-xl sm:text-2xl font-bold">Order Summery</h4>
        <div className="space-y-5 sm:space-y-6 font-semibold text-neutral-700 ">
          <div className="flex justify-between">
             <span className="">Subtotal:</span> <span className="">$ {parseFloat(total).toFixed(2)}</span> 
          </div>

          <div className="flex justify-between">
            <span className="">Shipping Charges:</span>
            <span className=""> $3 X {cartItems?.length} = ${cartItems?.length * 3} </span>
          </div>
        </div>
        <p className="flex font-bold text-neutral-800/90 pt-2 w-full justify-between border-t border-t-slate-300">
          <span className="">Total:</span> <span className="  "> $ {parseFloat(totalPrice).toFixed(2)}</span>
        </p>

        <button onClick={GoToPay} className="mt-2 w-full bg-black text-white px-6 py-2 rounded-full  text-center" > Proceed To Payment</button>
      </div>
    </div>
  )};

export default ConfirmOrderSection;