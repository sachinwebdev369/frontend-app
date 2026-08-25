import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form' 
import { Link, useNavigate } from 'react-router-dom'
import { backendUrl } from '../../serverURL'


const Signup = () => {
       const { register, handleSubmit, watch, formState: { errors } } = useForm()
          const [loading, setLoading] = useState(false)
          const [customeError, setCustomeError] = useState(false)
        const navigate = useNavigate()


      const onSubmit = async (data) => {  //handle signup form after submit
        try{
        const {name,email, password} = data
       let url = `${backendUrl}/api/v1/user/register`
        const response = await axios.post(url,{name,email,password,},{ withCredentials: true }) 
       if(response.data.success) {
       console.log('result: ',response)
      navigate('/')
      window.reload()
    }}
    catch(err) {console.log(err)}
      }


  return (
         <div className="min-h-screen bg-gray-50 py-10">
      <div className="box mx-auto h-full bg-white max-w-[400px] border border-gray-300/80 rounded-xl shadow-sm p-4">
        <p className="pb-2 text-3xl font-semibold">Creating an account</p>
        <span>Let’s create your account.</span> 
        <form onSubmit={handleSubmit(onSubmit)} className="box mt-6 space-y-4">
          <div>
            <label htmlFor="name">Full Name</label>
            <input type="text" id='name' placeholder="enter your full name" autoComplete="off" className={`${errors.name ? ' border-red-500' : ' border-gray-400'} outline-none border my-1 block w-full rounded-xl  p-3`}
              {...register('name', {
                required: true, minLength: { value: 2, message: "min length atleast 2" }
              })}
            />
            {errors.name && <p className="text-sm font-medium text-red-500/80">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="name">email</label>
            <input type="text" placeholder="enter your email" autoComplete="off" className={`${errors.email ? 'border border-red-500' : 'border border-gray-400'} outline-none my-1 block w-full rounded-xl  p-3`} 
              {...register('email', {required: true,pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                }})}  
            />
            {errors.email && <p className="text-sm font-medium text-red-500/80">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="name">password</label>
            <input type="text" autoComplete="off"
              {...register('password', {
                required: true, pattern: {
                  value: /^.{8,}$/, message: "password must be at least 8 character"
                } })}
              placeholder="enter your password"
              className={`${errors.password ? 'border border-red-500' : 'border border-gray-400'} outline-none my-1 block w-full rounded-xl  p-3`}
            />
            {errors.password && <p className="text-sm font-medium text-red-500/80">{errors.password.message}</p>}
          </div>
          <div>
            <label htmlFor="name">confirm password</label>
            <input type="text" autoComplete="off"
              {...register('cpass', { required: true, validate: (value) => value === watch("password") || "password do not match" })}
              placeholder="enter your password"
              className={`${errors.cpass ? 'border border-red-500' : 'border border-gray-400'} outline-none my-1 block w-full rounded-xl  p-3`}
            />
            {errors.cpass && <p className="text-sm font-medium text-red-500/80">{errors.cpass.message}</p>}
          </div>
 
          {customeError && <p className="text-sm md:text-base font-medium text-red-500/80">you already  have an account with this email. <Link className="text-blue-600 font-medium hover:underline underline-offset-2 cursor-pointer" to="/login">Login now</Link>  </p>}

          <div>
            <button type="submit" disabled={loading} className="w-full rounded-xl disabled:opacity-70 bg-purple-400 p-3 text-white"> {loading ? "loading..." : " Create an Account"}</button>
          </div>
        </form>

        <Link to="/login" className="mt-12 block text-center text-neutral-500">already have account? <a className="text-blue-600 font-medium hover:underline underline-offset-2 cursor-pointer" to="/login">Login</a></Link>

    </div>
    </div>
  )
}

export default Signup
