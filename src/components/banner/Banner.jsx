import React from "react";
import img1 from "../img1.webp";

const Banner = () => {
  return (
    <div className="flex items-center min-h-[50ch] flex-col gap-8 bg-gray-100 sm:flex-row md:px-8 mb-2 ">
      {/* left  banner content */}
      <div className="mx-auto flex-1 p-4 mt-8 lg:mt-0 ">
        <h1 className="text-4xl font-bold md:text-5xl  lg:text-6xl heading">FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
        <p className="mt-3 md:mt-6 text-neutral-500 lg:mt-[36px]">
          Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
        </p>
        <button className="mt-4 md:mt-6 rounded-full border bg-neutral-800 px-12 py-1.5 text-neutral-100 lg:mt-[32px]"> Shop Now</button>
      </div>
      {/* right banner Image */}
      <div className="flex-1 h-full">
        <div className="relative z-20">
          <img src={img1} className="h-full w-full object-cover object-center" alt=""/>
        </div>
      </div>
    </div>
  );
};

export default Banner;
