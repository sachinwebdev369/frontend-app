import React from "react";
import Product from "./Product";

const ProductContianer = ({ heading, categoryProduct }) => {
  console.log(categoryProduct);
  return (
    <div className="products container  py-[64px] mx-auto z-[999] px-4">
      <h2 className="text-3xl md:text-5xl font-bold text-center">{heading}</h2>

      <div className=" pt-[52px] pb-[26px] flex overflow-auto gap-6">
        {categoryProduct &&
          categoryProduct.map((item) => <Product item={item} />)}
      </div>
    </div>
  );
};

export default ProductContianer;
