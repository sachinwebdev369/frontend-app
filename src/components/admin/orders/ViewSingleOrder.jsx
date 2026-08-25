import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { singleOrder, updateOrder } from "../../../api/features/order";
import { calculateDiscountPrice } from "../../products/Product";

const ViewSingleOrder = () => {
  const [orderStatus, setOrderStatus] = useState("process");
  const { singleOrderInfo, loading } = useSelector((state) => state.order);
  const { id } = useParams();
  const dispatch = useDispatch();

  // hanlder for update order status
  const handleOrderStatus = () => dispatch(updateOrder({ orderStatus, id }));

  useEffect(() => { dispatch(singleOrder(id)); }, []); // loding single order details

  return (
    <div className="  p-6 space-y-6">
      <h3 className="text-2xl text-slate-800 font-bold"> Products List</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6 lg:col-span-2">
          <div>
            <div className="p-6 bg-white rounded-2xl">
              <h4 className="text-lg text-slate-700 font-bold mb-6">Shipping Info</h4>

              <div className="space-y-1.5">
                <div>
                  <span className="font-bold text-slate-700 "> Name:{" "}</span>{" "}
                  <span className="text-slate-700 "> {singleOrderInfo?.userData?.name}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 "> Phone:{" "}</span>{" "}
                  <span className="text-slate-700 "> {singleOrderInfo?.userData?.phoneNumber}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 "> email:{" "}</span>{" "}
                  <span className="text-slate-700 "> {singleOrderInfo?.userData?.email}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 "> Address:{" "}</span>{" "}
                  <span className="text-slate-700 "> {singleOrderInfo?.userData?.address}</span>
                </div>
              </div>

              <h4 className="text-lg text-slate-700 font-bold mb-6 mt-10">Payment Details</h4>
              <div className="space-y-1.5">
                <div>
                  <span className="font-bold text-slate-700">Payment Status:{" "}</span>{" "}
                  <span className="text-green-700">{singleOrderInfo?.payment}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700">Amount:{" "}</span>{" "}
                  <span className="text-slate-700">${" "}
                    {singleOrderInfo.cart && (singleOrderInfo.shippingCharge +singleOrderInfo.cart[0].qty *calculateDiscountPrice(singleOrderInfo.cart[0].price,singleOrderInfo.cart[0].discountPercentage,))}{" "}
                  </span>
                </div> </div>

              <h4 className="text-lg text-slate-700font-bold mb-6 mt-10"> Order Status</h4>

              <div className="space-y-1.5">
                <div>
                  <span className="font-bold text-slate-700"> Order Status:{" "}</span>{" "}
                  <span className="text-slate-700">{singleOrderInfo.orderStatus}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700">No. of items:{" "}</span>{" "}
                  <span className="text-slate-700">{singleOrderInfo.cart && singleOrderInfo.cart[0].qty}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 bg-white rounded-2xl">
            <h4 className="text-lg text-slate-700 font-bold mb-6">Shipping Info</h4>
            <div className="overflow-x-auto ">{singleOrderInfo?.cart && (<OrderProduct item={singleOrderInfo?.cart[0]} />)}</div>
          </div>
        </div>
        <div>
          <div className="p-6 bg-white rounded-2xl">
            <h4 className="text-lg text-slate-700 font-bold mb-6">Handle Order Status</h4>
            <div className="flex flex-col gap-1 ">
              <label htmlFor="role" className="text-base text-slate-700 font-medium "> Order Status</label>
              <select name="" id="role" value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)} className="bg-slate-50 border border-neutral-200 outline-none p-2 md:p-2.5 rounded-lg">
                <option value="process">process</option>
                <option value="Shipping">Shipping</option>
                <option value="delivered">delivered</option>
              </select>
            </div>

            <button onClick={handleOrderStatus} className="text-base py-2.5 mt-6 w-full  px-6 rounded-xl bg-blue-700/80 text-white"> save Product</button>
          </div></div></div></div>
  );
};


const OrderProduct = ({ item }) => {
  const { _id: id, images, brand, title, price, qty } = item;

  return (
    <div className="flex flex-row px-1 py-2 my-2  bg-gray-100/60 text-gray-700 gap-3 relative" key={id}>
      <div className="h-[100px] w-[100px] rounded-lg bg-gray-200 sm:h-[125px] sm:w-[125px]">
        <img src={images[0]}  className="h-full w-full object-cover" alt="idno"/>
      </div>
      <div className=" px-2  w-full relative  ">
        <div className="mb-5 pr-12">
          <p className="font-bold sm:text-xl mb-2"> {title}</p>
          <p>brand: {brand}</p>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <div className="text-base font-bold text-neutral-800/90 flex items-start gap-2 flex-wrap"> ${parseFloat(price).toFixed(2)} X {qty} ={" "}
            <span className="text-lg text-orange-700/80"> $ {parseFloat(price * qty).toFixed(2)}{" "}</span>
          </div>
        </div></div></div>
  )};

export default ViewSingleOrder;