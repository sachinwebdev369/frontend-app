import { CgAdd } from "react-icons/cg";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllusers } from "../../../api/features/user";
import { Link } from "react-router-dom";
import { backendUrl } from "../../../serverUrl";
import axios from "axios";

const UsersList = () => {
  const { users, usersLength } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(1);

  let DTlength = usersLength && Math.ceil(usersLength / 10);
  console.log(users, usersLength);

  let arrNumb = [];
  if (DTlength >= 1) {
    for (let i = 1; i <= DTlength; i++) {
      arrNumb.push(i);
    }
  } else {
    arrNumb = [1];
  }

  useEffect(() => {
    dispatch(getAllusers(pageNo));
  }, [pageNo]);

  return (
    <div className="">
      <div className="flex items-center justify-between flex-wrap gap-6 p-6">
        <h3 className="text-xl text-slate-800 font-semibold">Users List</h3>
        <div className="text-base flex items-center gap-3 border border-neutral-400 py-2 px-6 rounded-xl bg-blue-300"> <i> <CgAdd /> </i>{" "} Add user </div>
      </div>
      <div className="p-6">
        <div className=" bg-white rounded-xl">
          {users && <Table users={users} pageNo={pageNo} />}
          <div className="flex items-center gap-6 justify-between p-6">
            <div className=" space-x-6 font-semibold text-slate-400">
              {arrNumb?.map((item) => ( <span onClick={() => setPageNo(item)} className={`${ item === pageNo ? "text-slate-800 " : "" } hover:text-slate-800/80  cursor-pointer`}> {item}</span>))}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <button onClick={() => setPageNo(pageNo - 1)} disabled={pageNo === 1} className="hover:opacity-80 p-2.5 hover:bg-slate-100 cursor-pointer text-neutral-700/80 hover:text-neutral-700 rounded-md disabled:opacity-40" > <FaLessThan /> </button>
              <button disabled={DTlength === pageNo} onClick={() => setPageNo(pageNo + 1)} className="hover:opacity-80 p-2.5 rounded-md cursor-pointer hover:bg-slate-100 text-neutral-700/80 hover:text-neutral-700 disabled:opacity-40" > <FaGreaterThan /></button>
            </div>
          </div></div></div></div>
  );
};





const Table = ({ users, pageNo }) => {
  return (
    <div className="overflow-x-auto pb-2 ">
      <table className="min-w-[700px] w-full ">
        <thead>
          <tr className="">
            <th className="p-4  text-sm text-slate-800 text-left">User ID</th>
            <th className="p-4  text-sm text-slate-800 text-left">Name</th>
            <th className="p-4  text-sm text-slate-800 text-left">Email</th>
            <th className="p-4  text-sm text-slate-800 text-left">Role</th>
            <th className="p-4  text-sm text-slate-800 text-left">action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => {
            return (
              <tr className="border-b last:border-0 border-slate-200 hover:bg-slate-50">
                <th className="p-4 font-medium text-sm  text-slate-600 text-left"><span >{item._id}</span></th>
                <th className="p-4 font-medium text-sm text-slate-600 text-left"><span>{item.name} </span> </th>
                <th className="p-4 font-medium text-sm text-slate-600 text-left"><span>{item.email} </span> </th>
                <th className="p-4 font-medium text-sm text-slate-600 text-left"><span>{item.role} </span> </th>
                <th className="p-4 font-medium text-sm text-slate-600 text-left"><ActionBtnComp id={item._id}  pageNo={pageNo} /></th>
              </tr>
            ) 
            })}
        </tbody>
      </table></div>
  );
};





const ActionBtnComp = ({ id, pageNo }) => {
  const [showActionBtn, setShowActionBtn] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = async () => { // handler for delete single user data
    try {
      let url = `${backendUrl}/api/v1/user/delete-user/${id}`;
      const response = await axios.delete(url, { withCredentials: true });
      if (response.data.success) {
        dispatch(getAllusers(pageNo));
      }
      setShowActionBtn(false);
    } catch (err) {console.log(err)}
  };

  return (
    <div className="min-w-18 flex items-center gap-3 justify-start relative">
      <span onClick={() => setShowActionBtn(!showActionBtn)} className=" block p-2 cursor-pointer" > <FiMoreHorizontal /></span>
      {showActionBtn && ( <div className=" absolute bottom-0 z-88 left-8 rounded bg-slate-300 p-1  cursor-pointer">
          <Link to={`/admin/update-user/${id}`} className="hover:bg-white/40 px-0.5 mb-1" > view</Link>
          <p onClick={handleDelete} className="hover:bg-white/40 px-0.5"> delete</p>
        </div>
      )}
    </div>
  );
};

export default UsersList;
