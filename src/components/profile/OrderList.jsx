import React from 'react'
import { useEffect } from 'react';
import { FiMoreHorizontal } from "react-icons/fi";
import {useSelector, useDispatch} from 'react-redux'
import { allOrder } from '../../api/features/order';
import { calculateDiscountPrice } from '../products/Product';

const OrderList = () => {
  
const dispatch = useDispatch()
const {orders, loading} = useSelector(state => state.order) 

useEffect(()=>{
dispatch(allOrder()) // for load all orders from server
}, [])

  return (
    <div className="bg-white  rounded-md  w-full">
      <div className=" p-6">
        <h3 className="text-xl font-bold text-slate-800">All Orders</h3>
      </div>
      <div className="bg-white rounded-2xl overflow-hidden max-w-full">
        <div className="overflow-x-auto mb-5">
          <table className="w-full min-w-[880px] ">
            <thead className="border-b border-b-gray-100">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-slate-600  bg-white ">  Order ID </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600"> Product Name </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600"> Item qty </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600"> Amount </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600"> payment type </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600"> Brand </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-600 "> status </th>               
              </tr>
            </thead>
            <tbody>
              {orders && orders.map((item, index) => {
                return (
                  <tr className="border-b border-slate-200/50  hover:bg-slate-50/50 even:bg-gray-50/80 transition-colors " key={index} >
                    <td className="p-4   bg-white"> <span className="text-sm font-medium text-blue-600/80"> {item.cart[0]._id} </span> </td>
                    <td className="p-4"> <span className="text-sm text-slate-800  "> {item.cart[0].title}</span> </td>
                    <td className="p-4"> <span className="text-sm text-slate-800  ">{item.cart[0].qty}</span> </td>
                    <td className="p-4"> <span className="text-sm text-slate-800  "> ${item.cart[0].qty*calculateDiscountPrice(item.cart[0].price, item.cart[0].discountPercentage) + item.shippingCharge}</span> </td>
                    <td className="p-4"> <span className={`text-sm px-0.5  `}>{item.payment}</span> </td>
                    <td className="p-4"> <span className={`text-sm px-0.5  `}>{item.cart[0].brand}</span> </td>
                    <td className="p-4"> <span className="text-sm text-slate-800  "> {item.orderStatus} </span></td>                     
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default OrderList