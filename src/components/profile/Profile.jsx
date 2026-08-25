import img1 from "../img1.webp";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateUserInformation } from "../../api/features/user";
import { backendUrl } from "../../serverURL";
import axios from "axios";
import { AiOutlineCamera } from "react-icons/ai";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.user);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
  const [address, setAddress] = useState(user?.address);
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {   // for submit form
    e.preventDefault();
    dispatch(updateUserInformation({ name, email, phoneNumber, password, address }),);
  };

  const logoutHandler = async () => { // for logout
    const response = await axios.delete(`${backendUrl}/api/v1/user/logout`, { withCredentials: true, });
    if (response) navigate("/");
  };

  useEffect(() => {
    if (user) { // if user is true, then fill default values
      setName(user?.name);
      setEmail(user?.email);
      setPhoneNumber(user?.phoneNumber);
      setAddress(user?.address);
    }
  }, [user]);

  return (
    <div className="">
      <div>
        <div class="box mx-auto h-full max-w-[400px] rounded-xl border border-gray-300 p-4 shadow-md">
          <div class="pb-6">
            <p class=" text-3xl font-semibold capitalize"> personal information </p>
          </div>

          <form onSubmit={handleSubmit} class="box mt-10 space-y-4">
            <div>
              <label htmlFor="fullName">Full Name </label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="fullName" name="fullName" placeholder="enter your full name" autocomplete="off" class="my-1 block w-full rounded-xl border border-gray-500 p-3 outline-none"/>
            </div>
            <div class="">
              <label className="text-neutral-500" htmlFor="email"> email </label>
              <input type="text" disabled={true} placeholder="enter your email" value={email} autocomplete="off" name="email" class="my-1  block w-full rounded-xl border border-gray-400 p-3 outline-none bg-gray-200 text-gray-600" />
            </div>
            <div>
              <label htmlFor="phoneNo">phone no.</label>
              <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} autocomplete="off" name="phoneNo" placeholder="enter your phone no." class="my-1 block w-full rounded-xl border border-gray-400 p-3 outline-none" />
            </div>
            <div>
              <label htmlFor="address">address</label>
              <input type="text" autocomplete="off" value={address} onChange={(e) => setAddress(e.target.value)}  name="address" placeholder="enter your address" class="my-1 block w-full rounded-xl border border-gray-400 p-3 outline-none" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="text" autocomplete="off" value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="enter your password" class="my-1 block w-full rounded-xl border border-gray-400 p-3 outline-none" />
              <p className="text-sm text-neutral-800 font-medium"> fill the password for update your information </p>
            </div>

            <div>
              <button type="submit" onClick={handleSubmit} disabled={loading} class="mt-4 w-full cursor-pointer bg-purple-400 disabled:opacity-60 rounded-xl border border-purple-400 p-3 text-white shadow" > {loading ? "loading..." : "save"} </button>
            </div>
          </form>

          <div className="flex justify-center items-center my-8">
            <span className="bg-neutral-300 h-[1px] w-full block"></span>{" "}
            <span className="px-2">or</span>{" "}
            <span className="bg-neutral-300 h-[1px] w-full block"></span>
          </div>

          <div className="">
            <button onClick={logoutHandler} className="bg-gray-50 p-4 w-full rounded-xl border border-gray-400 mb-4" > Log out </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;