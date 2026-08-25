import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import { backendUrl } from "../../serverURL";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [customeError, setCustomeError] = useState(false);
  const {register,handleSubmit,formState: { errors },} = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => { // handle login form after submit
    try {
      let url = `${backendUrl}/api/v1/user/login`;
      const response = await axios.post(url,{...data},{ withCredentials: true },);
      if (response.data.success) {
        console.log("result: ", response);
        navigate("/");
        window.reload()
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="box mx-auto h-full max-w-[400px] bg-white border border-gray-300/80 rounded-xl shadow-sm p-4">
        <p className="pb-2 text-3xl font-bold text-neutral-800">Login to your account</p>
        <span className="text-neutral-600">It’s great to see you again.</span>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <div>
            <label htmlFor="name">email</label>
            <input type="text" placeholder="enter your email" autoComplete="off"  className={`${errors.email ? "border border-red-500" : "border border-gray-400"} outline-none my-1 block w-full rounded-xl  p-3`} 
              {...register("email", {required: true, pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                }, })}
              />
            {errors.email && (<p className="text-sm font-medium text-red-500/80">{errors.email.message}</p>)}
          </div>
          <div>
            <label htmlFor="name">password</label>
            <input type="text" autoComplete="off" placeholder="enter your password" className={`${errors.password ? "border border-red-500" : "border border-gray-400"} outline-none my-1 block w-full rounded-xl  p-3`}
              {...register("password", {
                required: true, pattern: {
                  value: /^.{8,}$/,
                  message: "password must be at least 8 character",
                },})}/>
            {errors.password && (<p className="text-sm font-medium text-red-500/80">{errors.password.message}</p>)}
          </div>
          {customeError && (<p className="text-sm md:text-base font-medium text-red-500/80">There is something wrong with email or password.</p>)}

          <div>
            <button type="submit" disabled={loading} className="w-full rounded-xl disabled:opacity-70 bg-purple-400 p-3 text-white"> {loading ? "loading..." : " Login now"}</button>
          </div>
        </form>

        <p  className="mt-12 block text-center text-neutral-500">Don’t have an account?
          <Link className="text-blue-600 font-medium hover:underline underline-offset-2 cursor-pointer" to="/signup">Signup</Link>
        </p>
      </div></div>
  )};

export default Login;