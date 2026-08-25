import React from 'react'
import { FcOk } from 'react-icons/fc'


const OrderSuccess = () => {
  return (
      <div className="flex items-center justify-center w-full h-screen flex-col gap-8">
              <span className="border rounded-full border-orange-500 flex items-center justify-center w-20 h-20 text-white text-6xl"> <FcOk /> </span>
              <p className=" md:text-xl font-medium">Your Order has been Placed successfully</p>
              <a href="/user/profile" className=" sm:px-16 px-5 bg-slate-900 hover:bg-slate-900/90 text-white py-1 rounded">View Order</a>
             </div>
  )}

export default OrderSuccess
