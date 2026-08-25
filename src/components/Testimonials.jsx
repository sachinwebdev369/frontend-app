import React from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const Testimonials = () => {
  return (
    <div className="py-[80px] px-4 ">
      <div className="container mx-auto">
        <div className="flex justify-between items-end   pb-10">
          <h2 className="text-3xl md:text-5xl heading font-bold uppercase  "> Our happy client</h2>
        </div>

        <div className="flex overflow-auto pb-4">
          <Testimonial />
          <Testimonial />
          <Testimonial />
          <Testimonial />
        </div>
      </div>
    </div>
  );
};

const Testimonial = () => {
  return (
    <div className="mx-1">
      <div class="max-w-[370px] min-w-[250px] border rounded-2xl bg-white p-6 ">
        <div class="mb-1 sm:mb-2">⭐⭐⭐⭐🌟</div>
        <h5 class="mb-0.5 sm:text-xl sm:mb-2 text-base font-semibold text-neutral-800">Sachin kumar</h5>
        <p class="text-sm sm:text-base text-neutral-500">
          "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.”
        </p>
      </div>
    </div>
  );
};

export default Testimonials;
