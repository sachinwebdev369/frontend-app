import React, {useEffect} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { backendUrl } from "../../../serverURL";
import { viewSingleUser } from "../../../api/features/user";

const AddUser = () => {
  const {id} = useParams("id")
  const {singleUserDetail} = useSelector(state => state.user)
  const dispatch = useDispatch()
  
  // if id is definde then default values is going to assign
  const {register,handleSubmit,watch,formState: { errors },} = useForm({
    defaultValues:{
name: singleUserDetail.name || "",
email: singleUserDetail.email || "",
phoneNumber: singleUserDetail.phoneNumber || "",
address: singleUserDetail.address || "",
role: singleUserDetail.role || "",
ConfirmPassword: singleUserDetail.ConfirmPassword || "",
password: singleUserDetail.password || "",
    }
  });


  const onSubmit = async (data) => { // form handler for add user
    const { ConfirmPassword, ...restData } = data;
if(id){ // if id present then update user details
      let url = `${backendUrl}/api/v1/user/update-user-admin/${id}`;
    const response = await axios.post( url,{...data,},{ withCredentials: true },);
} else { // create new user
    let url = `${backendUrl}/api/v1/user/create-user`;
    const response = await axios.post( url,{...data,},{ withCredentials: true },);
}

    console.log("result: ", response);
  };



  useEffect(()=> { // load single product details
    if(id) dispatch(viewSingleUser(id))
  }, [])


  return (
    <div className="p-6  space-y-6 min-h-screen">
      <div className="  p-6 rounded-xl">
        <h3 className="text-2xl text-slate-800  font-bold">Add Users</h3>
      </div>
      <div className=" bg-white p-6 rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-base text-slate-700 font-bold">General Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="flex flex-col gap-1 ">
              <label htmlFor="fname" className="text-sm text-slate-500 font-medium ">Name</label>
              <input type="text" id="fname" className="bg-slate-50 border-neutral-200 border outline-none p-2 md:p-2.5 rounded-lg" {...register("name", { required: true, minLength: { value: 2, message: "min length atleast 2" },})}/>
              {errors.name && ( <p className="text-sm font-medium text-red-500/80">{errors.name.message}</p>)}
            </div>
            <div className="flex flex-col gap-1 ">
              <label htmlFor="fname" className="text-sm text-slate-500   font-medium">Email Address</label>
              <input type="text" id="fname" className="bg-slate-50 border border-neutral-200 outline-none  p-2 md:p-2.5 rounded-lg" {...register("email", { required: true,pattern: {value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,message: "Invalid email address",},})}/>
              {errors.email && (<p className="text-sm font-medium text-red-500/80">{errors.email.message}</p>)}
            </div>
            <div className="flex flex-col gap-1 ">
              <label htmlFor="fname" className="text-sm text-slate-500  font-medium">Phone</label>
              <input type="text" id="fname" className="bg-slate-50 border border-neutral-200 outline-none  p-2 md:p-2.5 rounded-lg" {...register("phoneNumber", { required: true, maxLength: { value: 10, message: "maximum 10 digit only" },})}/>
              {errors.phoneNumber && (<p className="text-sm font-medium text-red-500/80">{errors.phoneNumber.message}</p>)}
            </div>
            <div className="flex flex-col gap-1 ">
              <label htmlFor="fname" className="text-sm text-slate-500 font-medium ">Address</label>
              <input type="text" id="fname" className="bg-slate-50 border-neutral-200 border outline-none p-2 md:p-2.5 rounded-lg" {...register("address", { required: true,minLength: { value: 2, message: "min length atleast 2" },
                })}/>
              {errors.address && (<p className="text-sm font-medium text-red-500/80">{errors.address.message}</p>)}
            </div></div>

          <h3 className="text-base  text-slate-700 font-bold mt-6">Security & Roles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="flex flex-col gap-1 ">
              <label htmlFor="fname" className="text-sm text-slate-500  font-medium">Password</label>
              <input type="text" id="fname" className="bg-slate-50 border-neutral-200 border outline-none  p-2 md:p-2.5 rounded-lg" {...register("password", { required: true, minLength: { value: 2, message: "min length atleast 2" },
                })} />
                {errors.password && ( <p className="text-sm font-medium text-red-500/80">{errors.password.message}</p>)}
            </div>
            <div className="flex flex-col gap-1 ">
              <label htmlFor="fname" className="text-sm text-slate-500  font-medium">Confirm Password</label>
              <input type="text" id="fname" className="bg-slate-50 border border-neutral-200 outline-none  p-2 md:p-2.5 rounded-lg" {...register("ConfirmPassword", { required: true, validate: (value) =>value === watch("password") || "password do not match", })}/>
              {errors.ConfirmPassword && ( <p className="text-sm font-medium text-red-500/80">{errors.ConfirmPassword.message}</p>)}
            </div>
            <div className="flex flex-col gap-1 ">
              <label htmlFor="role" className="text-sm text-slate-500 font-medium">User Role</label>
                <select name=""  id="role" {...register("role", { required: true, })} className="bg-slate-50 border border-neutral-200 outline-none  p-2 md:p-2.5 rounded-lg" >
                <option value="user">user</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className="md:col-span-2 flex items-center justify-center gap-3 flex-col md:flex-row flex-wrap">
              <button type="submit" className="bg-blue-700/90 text-white flex-1 p-2.5 rounded-xl w-full md:w-auto" > Add User </button>
              <button className="border border-neutral-400 flex-1 p-2.5 rounded-xl  w-full md:w-auto"> Cancel</button>
            </div>
          </div></form></div></div>
  )};

export default AddUser;
