import React, { useEffect, useState } from "react";
import { CgAdd } from "react-icons/cg";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../../api/features/product";
import { Link } from "react-router-dom";
import { backendUrl } from "../../../serverURL";
import axios from "axios";

const ProductList = () => {
  const { products, totalProduct } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(1);

  let DTlength = Math.ceil(totalProduct / 20);

  let arrNumb = [];
  if (DTlength >= 1) {
    for (let i = 1; i <= DTlength; i++) {
      arrNumb.push(i);
    }
  } else {
    arrNumb = [1];
  }

  useEffect(() => { // loading product by page no:
    dispatch(getProducts(pageNo));
  }, [pageNo]);

  return (
    <div className="">
      <div className="flex items-center justify-between flex-wrap gap-6 p-6">
        <h3 className="text-2xl text-slate-800 font-bold">Products List</h3>
        <div className="text-base flex items-center gap-2 py-2 px-6 rounded-xl bg-blue-600/90 text-neutral-50"> <i><CgAdd size={20} /></i>{" "}Add Products </div>
      </div>
      <div className="p-6">
        <div className=" bg-white border border-slate-200 rounded-xl">
          {products && <Table products={products} pageNo={pageNo} />}
          <div className="flex items-center gap-6 justify-between p-6 mt-6 border-t">
            <div className=" space-x-6 font-semibold text-slate-400 ">
              {arrNumb?.map((item) => ( <span onClick={() => setPageNo(item)} className={`${ item === pageNo ? "text-slate-800  " : "" } hover:text-slate-800/80  cursor-pointer`}  > {item} </span>))}
            </div>

            <div className="flex items-center gap-2 text-sm">
              <div onClick={() => setPageNo(pageNo - 1)} className="hover:opacity-80 p-2.5 hover:bg-slate-100 cursor-pointer text-neutral-700/80 hover:text-neutral-700 rounded-md " > <FaLessThan /> </div>
              <div onClick={() => setPageNo(pageNo + 1)} className="hover:opacity-80 p-2.5 rounded-md cursor-pointer hover:bg-slate-100 text-neutral-700/80 hover:text-neutral-700 " > <FaGreaterThan /> </div>
            </div>
          </div></div></div></div>
  );
};



const Table = ({ products, pageNo }) => {
  return (
    <div className="overflow-x-auto pb-2 ">
      <table className="min-w-[700px] w-full ">
        <thead>
          <tr className="">
            <th className="p-4  text-sm text-slate-800 text-left"> Product ID</th>
            <th className="p-4  text-sm text-slate-800 text-left"> Name</th>
            <th className="p-4  text-sm text-slate-800 text-left"> Category</th>
            <th className="p-4  text-sm text-slate-800 text-left"> rating</th>
            <th className="p-4  text-sm text-slate-800 text-left"> Price</th>
            <th className="p-4  text-sm text-slate-800 text-left"> Brand</th>
            <th className="p-4  text-sm text-slate-800 text-left"> Stock</th>
            <th className="p-4  text-sm text-slate-800 text-left"> actions</th>
          </tr>
        </thead>
        <tbody>
          {products && products?.map((item, i) => {
              return ( <tr key={i} className=" text-slate-800 hover:bg-gray-50/80 border-b last:border-b-0 border-slate-200/80" >
                  <th className="p-4 font-medium text-sm text-left"> <span> {item._id}</span></th>
                  <th className="p-4 font-normal text-sm text-left"><span>{item.title} </span></th>
                  <th className="p-4 font-normal text-sm text-left"><span>{item.category} </span></th>
                  <th className="p-4 font-normal text-sm text-left"><span>{item.rating} </span></th>
                  <th className="p-4 font-normal text-sm text-left"><span>${item.price} </span></th>
                  <th className="p-4 font-normal text-sm text-left"><span>{item.brand} </span></th>
                  <th className="p-4 font-normal text-sm text-left"><span>{item.stock} </span></th>
                  <th className="p-4 font-normal text-sm text-left relative"><ActionBtnComp id={item._id} pageNo={pageNo} /></th>
                </tr>
              );
            })}
        </tbody>
      </table></div>
  )};




const ActionBtnComp = ({ id, pageNo }) => {
  const [showActionBtn, setShowActionBtn] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      let url = `${backendUrl}/api/v1/product/delete-product/${id}`;
      const response = await axios.delete(url, { withCredentials: true });
      if (response.data.success) dispatch(getProducts(pageNo))
      setShowActionBtn(false);
    } catch (err){ console.log(err);}
  };

  return (
    <div className="min-w-18 flex items-center gap-3 justify-start relative">
      <span onClick={() => setShowActionBtn(!showActionBtn)} className=" block p-2 cursor-pointer"> <FiMoreHorizontal /></span>
      {showActionBtn && ( <div className=" absolute bottom-0 z-88 left-8 rounded bg-slate-300 p-1  cursor-pointer">
          <Link  to={`/admin/update-porduct/:id/${id}`} className="hover:bg-white/40 px-0.5 mb-1">edit</Link>
          <p onClick={handleDelete} className="hover:bg-white/40 px-0.5">delete</p>
        </div>
      )}
    </div>
  )};

export default ProductList;