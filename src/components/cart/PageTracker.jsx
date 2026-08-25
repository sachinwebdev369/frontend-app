import React from 'react'
import { Link } from 'react-router-dom'

const PageTracker = () => {
  return (
       <p className="mt-3 text-neutral-600 font-medium ">
            <Link to="/" className="">Home</Link>
            <span>&gt;</span>
            <span className="text-neutral-800">Cart</span>
          </p>
 
  )
}

export default PageTracker
