import React, { useState } from "react";
import { SiPaytm } from "react-icons/si";
import { GiTakeMyMoney } from "react-icons/gi";
import axios from "axios";
import { backendUrl } from "../../serverUrl";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [pay, setPay] = useState("cash on delevery");
  const [selectBox, setSelectBox] = useState(2);
  const [data, setData] = useState([]); 
  const navigate = useNavigate();

  const ptm = () => {
    setPay("paid");
    setSelectBox(1);
  };

  const noptm = () => {
    setPay("Pay on delevery");
    setSelectBox(2);
  };
  const handleOrder = async () => { // for handle order
    const finalProcess = { userData: data.shippingAddress, cart: data.cart, payment: pay,};
    const response = await axios.post(`${backendUrl}/api/v1/order/create-order`,{...finalProcess,},{withCredentials: true});

    if (response.data.success) console.log(response);
    navigate("/order/orderSuccess");
  };

  useState(() => {
    let localData = JSON.parse(localStorage.getItem("latestOrder")); // for get data from localstorage
    setData(localData);
  }, []);

  return (
    <div className="mt-14 flex items-center flex-col gap-12 justify-center ">
      <h3 className="text-2xl font-semibold text-neutral-800/90 sm:text-3xl">Card Info</h3>
      <div className=" space-y-3 w-full max-w-xs">    
        <div>
          <div onClick={ptm} className={`border border-gray-300 text-neutral-700 p-3 flex items-center bg-gray-200 opacity-80`} >
            <span className="pe-5 text-xl md:text-2xl"> <SiPaytm /> </span>
            <span className="text-sm font-semibold ">pay through Paytm</span>
          </div>
          <p className="text-xs text-neutral-500 mt-px">paytm is currently not working. please process through cod.</p>
        </div>
        <div onClick={noptm} className={`border p-3 text-neutral-700  hover:bg-orange-500/80 rounded-sm cursor-pointer mt-5 flex items-center ${selectBox === 2 ? "bg-orange-500 text-white " : ""}`} >
          <span className="pe-5"> <GiTakeMyMoney /></span>
          <span className="text-sm font-semibold  ">cash on develery</span>
        </div>
        <div className=" flex items-center justify-center ">
          <button onClick={handleOrder} disabled={selectBox === 0 ? true : false} className="mt-10 disabled:opacity-40 w-full bg-black text-white px-6 py-2 rounded-full  text-center cursor-pointer hover:opacity-95"> pay {selectBox === 2 && " on develery" } ${data.totalMoneyShipping}</button>
        </div>
      </div>
    </div>
  )};

export default Payment;