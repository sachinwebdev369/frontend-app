import axios from "axios";
import React, { useState } from "react";
import { backendUrl } from "../../serverURL";

const ChangePass = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => { // handler for submit form 
    e.preventDefault();
    console.log(oldPassword, newPassword, confirmPassword);
    await axios.put(`${backendUrl}/api/v1/user/update-user-password`, { oldPassword, newPassword, confirmPassword }, {withCredentials: true} )
    .then((res)=> {
    setOldPassword("")
      setNewPassword("")
      setConfirmPassword("")
    }).catch(error => console.log(error) )
  };

  return (
    <div>
      <div class="box mx-auto h-full max-w-[400px] rounded-xl border border-gray-300 p-4 shadow-md">
        <div class="pb-4">
          <p class="text-3xl font-semibold capitalize">Change password</p>
        </div>

        <form class="box mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="oldPassword">Old password</label>
            <input type="text" name="oldPassword" onChange={(e) => setOldPassword(e.target.value)} value={oldPassword} id="fullName" placeholder="enter your full name" autocomplete="off" class="my-1 block w-full rounded-xl border border-gray-500 p-3 outline-none" />
          </div>
          <div class="">
            <label htmlFor="newPassword">New Password</label>
            <input type="text" placeholder="enter your email" onChange={(e) => setNewPassword(e.target.value)} name="newPassword" value={newPassword} autocomplete="off" class="my-1 block w-full rounded-xl border border-gray-400 p-3 outline-none" />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="text" autocomplete="off" value={confirmPassword} name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="enter your password" class="my-1 block w-full rounded-xl border border-gray-400 p-3 outline-none" />
          </div>

          <div>
            <button type="submit" class="w-full cursor-pointer rounded-xl border border-purple-400 bg-purple-400 p-3 text-white shadow" > save </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePass;