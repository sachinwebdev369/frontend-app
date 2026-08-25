import React, { useEffect, useState } from "react";
import { BiCloset } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { FaFilter, FaGreaterThan } from "react-icons/fa6";
import { LiaGreaterThanSolid } from "react-icons/lia";
import { PiGreaterThan } from "react-icons/pi";
import { RiStarLine, RiStarSFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {fetchProductByQuery, priceHandler, stokeHandler} from "../../api/features/product";

const FilterSidebar = ({ isOpen, setIsOpen }) => {
  const { sortByPrice, sortByStoke } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState({1: false, 2: true, 3: false, 4: false, });
  const [selectedCategories, setSelectedCategories] = useState(["laptops"]);

  console.log(sortByPrice, sortByStoke);

  const filteredCategories = [
    {title: "for Mens", items: ["mens-shirts", "mens-shoes", "mens-watches"]},
    {title: "for Womens", items: ["womens-dresses", "womens-jewellery", "womens-bags", "womens-shoes", "womens-watches", ]},
    {title: "Top Tech", items: ["laptops", "smartphones", "tablets"]},
  ];

  const handleFilterBtnClick = () => { // fetching filter product by sending querys
    dispatch(fetchProductByQuery(selectedCategories.join(",")));
  };

  const handleClearFilter = () => {
    setSelectedCategories([]);
  };

  useEffect(() => {
    dispatch(fetchProductByQuery(selectedCategories.join(",")));
  }, []);



  const handleCheckboxChange = (category) => { // onclick handler for check boxs 
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category],
    );
  };

  return (
    <div
      className={`fixed bottom-0 ${isOpen ? "left-0" : "-left-full"}  duration-75 h-[85vh] md:h-auto w-full md:w-auto z-[50] md:sticky md:bottom-auto md:top-0 md:z-0`}
    >
      {isOpen && (
        <div onClick={() => setIsOpen(false)} className="fixed top-0 left-0 bottom-0 right-0 bg-neutral-900/60 -z-10 md:hidden"></div>
      )}

      <div className="md:w-[260px] lg:w-[280px] w-full bg-gray-50/95 p-4 h-[100%] overflow-y-auto md:min-h-[82vh] roudned  ">
        <div className="flex justify-between items-center pb-4 mb-6 border-b border-b-gray-300/90">
          <p className="text-xl font-bold">Filters</p>
          <div className="text-xl md:hidden cursor-pointer hover:text-red-500 p-1 "  onClick={() => setIsOpen(false)} > <CgClose /> </div>
        </div>

        <div>
          {filteredCategories.map((category, index) => (
            <div key={index} className="pb-4 ">
              <div className="flex mb-2 justify-between items-center cursor-pointer" 
                onClick={() => setActiveCategory({...activeCategory,[index]: !activeCategory[index],})}>
                <h3 className="font-semibold ">{category.title}</h3>
                <span className={`${activeCategory[index] === true ? "rotate-90" : "rotate-0"} delay-150 text-gray-500 duration-200 cursor-pointer text-xs`}> <FaGreaterThan /> </span>
              </div>
              <ul className={`${activeCategory[index] === true ? "h-full" : "h-0"} overflow-hidden space-y-1 transition-all duration-200  `}>
                {category?.items && category.items.map((item, idx) => (
                    <label htmlFor={item} key={idx} className="pl-5 flex items-center gap-2 text-sm text-gray-700" >
                      <input type="checkbox" value={item} id={item} checked={selectedCategories.includes(item)} onChange={() => handleCheckboxChange(item)} />
                      {item.replace("-", " ")}
                    </label>
                  ))}
              </ul>
            </div>
          ))}
        </div>
        <hr className="my-6 border-t border-t-gray-300" />

        <div>
          <div className="flex mb-2 justify-between items-center cursor-pointer" onClick={() => setActiveCategory({ ...activeCategory, [4]: !activeCategory[4] })}>
            <h3 className="font-semibold ">sort by price</h3>
            <span className={`${activeCategory[4] === true ? "rotate-90" : "rotate-0"} delay-150 text-gray-500 duration-200 cursor-pointer text-xs`}> <FaGreaterThan /> </span>
          </div>

          <ul className={`${activeCategory[4] === true ? "h-full" : "h-0"} pl-5 pt-2 overflow-hidden transition-all inline-flex flex-col gap-2 duration-200  `}>
            <li onClick={() => dispatch(priceHandler("Max to Min"))} className={`${sortByPrice === "Max to Min" ? " bg-neutral-700 text-white " : "border text-neutral-700 border-neutral-700"} cursor-pointer px-6 py-0.5 rounded inline-block `} >
              Max to Min
            </li>

            <li onClick={() => dispatch(priceHandler("Min to Max"))} className={`${sortByPrice === "Min to Max" ? " bg-neutral-700 text-white " : "border text-neutral-700 border-neutral-700"} cursor-pointer px-6 py-0.5 rounded inline-block `} >
              Min to Max
            </li>
          </ul>
        </div>
 
        <hr className="my-6 border-t border-t-gray-300" />
        <div className="text-center sticky bottom-0 left-0 right-0 p-4">
          <button onClick={handleFilterBtnClick} className=" rounded-full border bg-neutral-800 hover:opacity-95  px-12 py-1.5 w-full text-neutral-100">Apply</button>
        </div>
        <div>
          <button onClick={handleClearFilter} className="m-4 w-[80%] block mx-auto rounded-full border border-neutral-800 px-12 py-1.5 text-neutral-700">clear filter</button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
