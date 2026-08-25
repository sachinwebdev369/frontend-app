import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ShippingForm = () => {
  const userData = useSelector((state) => state?.user?.user);

  const {register, handleSubmit, formState: { errors }} = useForm({ defaultValues: { address: userData?.address, phoneNumber: userData?.phoneNumber, email: userData?.email, name: userData?.name, }});

  const navigate = useNavigate();

  const onSubmit = async (data) => { // handler for after submit form
    const shippingData = {
      shippingAddress: data,
    };
    localStorage.setItem("latestOrder", JSON.stringify(shippingData));
    navigate("/order/confirmOrder");
  };

  return (
    <div className="min-h-screen   mt-12">
      <div className="box mx-auto h-full max-w-[400px] border border-gray-300 rounded-xl shadow-sm p-4">
        <p className="pb-2 text-3xl font-semibold">Shipping Details</p>
        <div className="mt-10 w-full ">
          <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4">
            <div>
              <label htmlFor="fullName">Your name</label>
              <input type="text" id="fullName" placeholder="your Name" autoComplete="off"className={`${errors.name ? " border-red-500" : " border-gray-400"} outline-none border my-1 block w-full rounded-xl  p-3`} {...register("name", { required: true, minLength: { value: 2, message: "min length atleast 2" }, })} />
              {errors.name && (<p className="text-sm font-medium text-red-500/80">{errors.name.message}</p>)}
            </div>
            <div>
              <label htmlFor="address">address</label>
              <input type="text" id="address" placeholder="your address" autoComplete="off" className={`${errors.address ? " border-red-500" : " border-gray-400"} outline-none border my-1 block w-full rounded-xl  p-3`} {...register("address", { required: true,
                  minLength: { value: 2, message: "min length atleast 2" },})} />
              {errors.address && (<p className="text-sm font-medium text-red-500/80"> {errors.address.message} </p> )}
            </div>
            <div>
              <label htmlFor="phoneNumber">phoneNumber</label>
              <input type="text" id="phoneNumber" placeholder="your phone Number"                 autoComplete="off" className={`${errors.phoneNumber ? " border-red-500" : " border-gray-400"} outline-none border my-1 block w-full rounded-xl  p-3`} {...register("phoneNumber", { required: true, maxLength: { value: 10, message: "maximum 10 number only" },})} />
              {errors.phoneNumber && (<p className="text-sm font-medium text-red-500/80">{errors.phoneNumber.message}</p>)}
            </div>
            <div>
              <label htmlFor="fullName">your active emial</label>
              <input type="text" id="email" placeholder="email"
                autoComplete="off"
                className={`${errors.email ? " border-red-500" : " border-gray-400"} outline-none border my-1 block w-full rounded-xl  p-3`} {...register("email", { required: true,minLength: { value: 2, message: "min length atleast 2" },})}/>
              {errors.email && (<p className="text-sm font-medium text-red-500/80">{errors.email.message}</p>)}
            </div>

            <div>
              <button type="submit" className="w-full rounded-xl disabled:opacity-70 bg-purple-400 p-3 text-white" > continue</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )}

export default ShippingForm;