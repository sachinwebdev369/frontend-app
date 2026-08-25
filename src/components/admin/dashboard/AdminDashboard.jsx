import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiUsers } from "react-icons/hi";
import { BsHandbag } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";
import { allOrderAdmin } from "../../../api/features/order";
import { getAllusers } from "../../../api/features/user";
import ChartSection from "./ChartSection";
import { OrderTable } from "../orders/OrderList";

const AdminDashboard = () => {
  const { allProducts } = useSelector((state) => state.product);
  const { allOrders } = useSelector((state) => state.order);
  const { users, usersLength } = useSelector((state) => state.user);
  const [totalProduct, setTotalProduct] = useState(0);
  const [dataSet, setDataSet] = useState(null);
  const dispatch = useDispatch();

  const ctgData = [
    { label: "for mens", dataLength: allProducts?.mensProduct?.length },
    { label: "for womens", dataLength: allProducts?.womensProduct?.length + 2 },
    { label: "tech", dataLength: allProducts?.techProduct?.length },
    {label: "our collection",dataLength: allProducts?.otherProduct?.length - 3,},
  ];

  useEffect(() => {
    setDataSet([  // storing user, product and orders length
      {icon: <HiUsers />,iconColor: "bg-blue-500",text: "Total Users",lengths: usersLength,},
      {icon: <BsHandbag />,iconColor: "bg-yellow-600",text: "Total Products",lengths: totalProduct,},
      {icon: <FiShoppingBag />,iconColor: "bg-red-700/80",text: "Total Orders",lengths: allOrders?.length,},
      ]);
  }, [users, allOrders]);

  useEffect(() => {
    dispatch(allOrderAdmin());
    dispatch(getAllusers(1));
  }, []);

  useEffect(() => {
    if (allProducts) {
      const allproductLength = allProducts?.mensProduct?.length + allProducts?.womensProduct?.length + allProducts?.techProduct?.length +allProducts?.otherProduct?.length; 
      setTotalProduct(allproductLength);
    }
  }, [allProducts]);

  return (
    <div className="p-6  space-y-6">
      {allOrders && users && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataSet?.map((data) => {
              return (
                <div className="bg-white/80 border border-slate-200/50  hover:shadow-xl hover:shadow-slate-200/20  p-6 rounded-2xl flex col-span-1 gap-3 ">
                  <span className={` text-2xl w-10 h-10  rounded-lg text-white flex items-center group-hover:scale-110 transition-all duration-300 justify-center ${data.iconColor}`} > {data.icon} </span>
                  <div>
                    <p className="text-slate-600 font-semibold"> {data.text} </p>
                    <p className="text-3xl mt-1 text-slate-800  font-bold">{data.lengths} </p>
                  </div>
                </div>
              ) })}
          </div>

          <div className="mb-12">
            <ChartSection allProduct={ctgData} usersLength={usersLength} orderLength={allOrders.length}/>
          </div>
          <div className="mb-12 bg-white/80 border border-slate-200/50  hover:shadow-xl hover:shadow-slate-200/20  p-6 rounded-2xl"> <OrderTable allOrders={allOrders} pageNo={1} /> </div>
        </>)}
    </div>
  )};

export default AdminDashboard;