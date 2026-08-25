import React from 'react'
import { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { allOrderAdmin } from '../../../api/features/order'
import { useState } from 'react'
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import {Link} from 'react-router-dom'
import { calculateDiscountPrice } from '../../products/Product'

const OrderList = () => {
    const dispatch = useDispatch()
  const { allOrders, loading } = useSelector(state => state.order)
  const [pageNo, setPageNo] = useState(1)
 
  let arrNumb = [1,2,3,4]
  let DTlength = 4

    useEffect(()=> { // load all order from server
        dispatch(allOrderAdmin())
    }, [])
  return (
    <div className="">
        <div className="flex items-center justify-between flex-wrap gap-6 p-6">
          <h3 className="text-xl text-slate-800 font-semibold">Order List</h3>          
        </div>
        <div className="p-6">
          <div className=" bg-white rounded-xl">
          {allOrders &&  <OrderTable allOrders={allOrders} pageNo={pageNo}  />}
           </div> 
        </div> 
    </div>
  )}



 export const OrderTable = ({allOrders, pageNo}) => {
  return (
    <div className="overflow-x-auto pb-2 ">
      <table className="min-w-[700px] w-full ">
        <thead>
          <tr className="">
            <th className="p-4  text-sm text-slate-800 text-left">order ID</th>
            <th className="p-4  text-sm text-slate-800 text-left">user Name</th>
            <th className="p-4  text-sm text-slate-800 text-left">Email</th>
            <th className="p-4  text-sm text-slate-800 text-left">phone no.</th>
            <th className="p-4  text-sm text-slate-800 text-left">product Name</th>
            <th className="p-4  text-sm text-slate-800 text-left">brand</th>
            <th className="p-4  text-sm text-slate-800 text-left">amount</th>
            <th className="p-4  text-sm text-slate-800 text-left">orderStatus</th>
          </tr>
        </thead>
        <tbody>
          {allOrders && allOrders.map((item) => {
            return (
              <tr className="border-b last:border-0 border-slate-200 hover:bg-slate-50">
                <th className="p-4 font-medium text-sm text-blue-600 text-left">
                  <Link to={`/admin/order-details/${item._id}`}>{item._id} </Link>
                </th>
                <th className="p-4 font-medium text-sm text-slate-600 text-left">
                  <span>{item.userData.name} </span>
                </th>
                <th className="p-4 font-medium text-sm text-slate-600 text-left">
                  <span>{item.userData.email} </span>
                </th>
                <th className="p-4 font-medium text-sm text-slate-600 text-left">
                  <span>{item.userData.phoneNumber} </span>
                </th>
                <th className="p-4 font-medium text-sm text-slate-600 text-left">
                  <span>{item.cart[0].title.lenght >14 ? item.cart[0].title : item.cart[0].title.slice(0,15) + "..."} </span>
                </th>
                <th className="p-4 font-medium text-sm text-slate-600 text-left">
                  <span>{item.cart[0].brand} </span>
                </th>
                <th className="p-4 font-medium text-sm text-slate-600 text-left">
                  <span>${item.shippingCharge + item.cart[0].qty*calculateDiscountPrice(item.cart[0].price, item.cart[0].discountPercentage)} </span>
                </th>
                <th className="p-4 font-medium text-sm text-slate-600 text-left">
                  <span>{item.orderStatus} </span>
                </th>
              </tr>
            );
          })}
        </tbody> </table> </div>
  );
};

export default OrderList