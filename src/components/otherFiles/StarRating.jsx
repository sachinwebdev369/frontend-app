import React from 'react'
import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import { RiStarLine } from "react-icons/ri";

const StarRating = ({rating = 0}) => {
const fullStars = Math.floor(rating);
const hasHalfStar = rating % 1 !== 0;
const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

let ratingStars = [];

// Full Stars
ratingStars.push(
  ...Array.from({ length: fullStars }, (_, index) => (
    <IoIosStar key={`full-${index}`} className="text-yellow-500 text-2xl md:text-3xl" /> ))
);

// Half Star
if (hasHalfStar) {
  ratingStars.push( <IoIosStarHalf key="half" className="text-yellow-500 text-2xl md:text-3xl" />);
}

// Empty Stars
ratingStars.push( ...Array.from({ length: emptyStars }, (_, index) => (
    <RiStarLine key={`empty-${index}`} className="text-yellow-500 text-2xl md:text-3xl"/>)) );

return (
    <div className='flex gap-0.5 mt-2'> {ratingStars} </div>
  )
}

export default StarRating