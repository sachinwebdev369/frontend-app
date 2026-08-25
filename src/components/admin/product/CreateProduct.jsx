import React, { useState, useEffect } from "react";
import { BiImageAdd, BiSave } from "react-icons/bi";
import { MdDrafts } from "react-icons/md";
import KeywordsInput from "./KeywordsInput";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { backendUrl } from "../../../serverUrl";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { getSingleProduct } from "../../../api/features/product";


const CreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [customeError, setCustomeError] = useState(false);
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const {id} = useParams("id")
  const {singleProduct} = useSelector(state => state.product)
  const dispatch = useDispatch()
  

  // if id is definde then default values is going to assign
  const {register,handleSubmit,watch,formState: { errors },} = useForm({
     defaultValues: {
      title: singleProduct.title || "",
       description:  singleProduct.description || "",
       price:  singleProduct.price || "",
       discountPercentage:  singleProduct.discountPercentage || "",
       stock:  singleProduct.stock || "",
       brand:  singleProduct.brand || "",
       images:  singleProduct.images || "",
       category:  singleProduct.category || "",
       tags: singleProduct.tags || ""
      }});


  const imageChangeHandler = (e) => { // uploading photos
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) setImages((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async (data) => { // handler for submit form
    try {
      if(id) { // if id present then update product details
      let url = `${backendUrl}/api/v1/product/update-product-admin/${id}`;
      const response = await axios.post(url,{...data,tags,images,},{ withCredentials: true },);
      }
 else { // create new product
      let url = `${backendUrl}/api/v1/product/create-product`;
      const response = await axios.post(url,{...data,tags,images,},{ withCredentials: true },);
}

      console.log("result: ", response);
    } catch (err) {console.log(err)}
  };



  useEffect(()=> { // load single product details
    if(id) dispatch(getSingleProduct(id))
  }, [])



  return (
    <div className="  p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-6">
        <h3 className="text-2xl text-slate-800 font-bold">Products List</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div className="p-6 bg-white rounded-2xl">
                <h3 className="text-lg font-bold text-slate-800 mb-6">General Information</h3>
                <div className="space-y-6">
                  <div className="flex flex-col gap-1 ">
                    <label htmlFor="pName" className="text-base text-slate-700 font-medium" > Product Name</label>
                    <input type="text" name="pName" id="pName"                       className="bg-slate-50 border border-neutral-200 outline-none  p-2 md:p-2.5 rounded-lg" {...register("title", {required: true,minLength: {value: 2,message: "minmum two characters is required",},})}
                    />
                    {errors.title && (<p className="text-sm font-medium text-red-500/80">{errors.title.message}</p>)}
                  </div>
                  <div className="flex flex-col gap-1 ">
                    <label htmlFor="pdec" className="text-base text-slate-700 font-medium" >Product details</label>
                    <textarea name="" rows={4} id="pdec"{...register("description", {required: true,minLength: {value: 2,message: "minmum two characters is required",},})} className="bg-slate-50 border border-neutral-200 outline-none  p-2 md:p-2.5 rounded-lg"></textarea>
                    {errors.description && (<p className="text-sm font-medium text-red-500/80">{errors.description.message}</p>)}
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white rounded-2xl">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Product Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1 ">
                    <label htmlFor="pName" className="text-base text-slate-700 font-medium" >Base Pricing</label>
                    <input type="text" name="" id="pName" {...register("price", { required: true,minLength: {value: 1,message: "minmum one characters is required",},})}className="bg-slate-50 border border-neutral-200 outline-none  p-2 md:p-2.5 rounded-lg"/>
                    {errors.price && (<p className="text-sm font-medium text-red-500/80">{errors.price.message}</p>)}
                  </div>
                  <div className="flex flex-col gap-1 ">
                    <label htmlFor="pName" className="text-base text-slate-700 font-medium" >Discount Percentage</label>
                    <input type="text" name="" id="pName" {...register("discountPercentage", {required: true,minLength: {value: 1,message: "minmum one characters is required",},})} className="bg-slate-50 border border-neutral-200 outline-none  p-2 md:p-2.5 rounded-lg"/>
                    {errors.discountPercentage && (<p className="text-sm font-medium text-red-500/80">{errors.discountPercentage.message}</p>)}
                  </div>
                  <div className="flex flex-col gap-1 ">
                    <label htmlFor="pName" className="text-base text-slate-700   font-medium">Stock</label>
                    <input type="text" name=""id="pName" {...register("stock", { required: true,minLength: {value: 1,message: "minmum one characters is required",},})}className="bg-slate-50 border border-neutral-200 outline-none  p-2 md:p-2.5 rounded-lg"/>
                    {errors.stock && (<p className="text-sm font-medium text-red-500/80">{errors.stock.message}</p>)}
                  </div>
                  <div className="flex flex-col gap-1 ">
                    <label htmlFor="bname" className="text-base text-slate-700 font-medium" >Brand Name</label>
                    <input type="text" name="" id="bname" {...register("brand", {required: true,})} className="bg-slate-50 border border-neutral-200 outline-none  p-2 md:p-2.5 rounded-lg"/>
                    {errors.brand && (<p className="text-sm font-medium text-red-500/80">{errors.brand.message}</p>)}
                  </div>
                </div></div></div></div>

          <div className="space-y-6">
            <div className="p-6 bg-white rounded-2xl">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Upload Images</h3>
              <div className="">
                <div className="flex overflow-auto items-center">
                  <input type="file" id="image" className="hidden" onChange={imageChangeHandler} />
                  <label htmlFor="image" className="cursor-pointer">
                    <div className="w-[250px]  p-2 h-[200px] border  border-dashed border-slate-300 rounded-xl  bg-slate-50/80 flex items-center justify-center gap-3 flex-col">
                      <BiImageAdd className="text-4xl text-slate-600" />
                      <p className="text-sm text-slate-400 font-medium text-center">Drop your image here, or select{" "}
                        <span className="text-blue-500 hover:opacity-80 cursor-pointer">Click to browser</span>
                      </p>
                    </div>
                  </label>

                  {images.map((image, index) => (<div className="w-[250px] min-w-[250px] p-2 h-[200px] border  border-slate-300 rounded-xl  bg-slate-50/80 flex items-center justify-center gap-3 flex-col">
                      <img key={index} src={image} alt="" className="w-full h-full object-cover" />
                    </div> ))}
                </div>
              </div></div>
            <div className="p-6 bg-white rounded-2xl">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Product Category and Keywords</h3>
              <div className="space-y-6">
                <div className="flex flex-col gap-1 ">
                  <label htmlFor="role" className="text-base text-slate-700 font-medium">Product Category</label>
                  <select name="" id="role" {...register("category", { required: true,})}className="bg-slate-50 border border-neutral-200 outline-none  p-2 md:p-2.5 rounded-lg " >

          {          ["laptops","smartphones","lighting","motorcycle","sunglasses","automotive",
"fragrances","furniture","groceries","home-decoration","skincare","tops","men's clothing","mens-shirts","mens-shoes","mens-watches","women's clothing","womens-bags","womens-dresses","womens-jewellery","womens-shoes","womens-watches"].map((item,i) => <option value={item} key={i} >{item}</option>)
}
                  </select>
                </div>

                <div className="flex flex-col gap-0 ">
                  <label htmlFor="role" className="text-base text-slate-700 font-medium" >Add Product's Keywords</label>
                  <KeywordsInput setTags={setTags} />
                </div>
                <div>
                  <button className="text-base flex items-center gap-3 border border-blue-700/80 py-2 px-6 rounded-xl bg-blue-700/80 text-white w-full justify-center" type="submit"> <i> <BiSave /></i> {id? "update product" : "save Product "}</button>
                </div>
              </div>
              </div></div></div></form></div>
  )};

export default CreateProduct;