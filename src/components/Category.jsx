import React from "react";
import img1 from "./img1.webp";

const Category = () => {
  return (
    <div className="container mx-auto  p-4">
      <div class=" bg-gray-200 p-4 md:p-10  mx-auto rounded-[24px] ">
        <h2 className="text-3xl md:text-5xl heading font-bold text-center py-8"> Browse by best style </h2>

        <div class="grid grid-cols-1 min-h-[200px] sm:grid-cols-5 gap-4">
          <div class="relative h-[160px] overflow-hidden rounded-2xl bg-white">
            <h2 class="ps-6 pt-4 text-xl font-semibold">Fashion</h2>
            <div class="absolute -top-10 -right-[160px] w-[360px] object-cover">
              <img src={img1} class="w-full object-cover" />
            </div>
          </div>

          <div class="relative sm:col-span-3  h-[160px] overflow-hidden rounded-2xl bg-white">
            <h2 class="ps-6 pt-4 text-xl font-semibold">Fashion</h2>
            <div class="absolute -top-10 sm:-top-16  w-[360px] sm:w-[400px] -right-[140px]">
              <img src={img1} class="w-full object-cover" />
            </div>
          </div>

          <div class="relative sm:col-span-3  h-[160px] overflow-hidden rounded-2xl bg-white">
            <h2 class="ps-6 pt-4 text-xl font-semibold">Fashion</h2>
            <div class="absolute -top-10 sm:-top-16 w-[360px] sm:w-[400px] -right-[140px]">
              <img src={img1} class="w-full object-cover" />
            </div>
          </div>

          <div class="relative h-[160px] overflow-hidden rounded-2xl bg-white">
            <h2 class="ps-6 pt-4 text-xl font-semibold">Fashion</h2>
            <div class="absolute -top-10 -right-[160px] w-[360px] object-cover">
              <img src={img1} class="w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
