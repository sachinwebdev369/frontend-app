import React from 'react'
import PageTracker from '../components/cart/PageTracker'
import AddToCartSection from '../components/cart/AddToCartSection'

const Cart = () => {
  return (
    <div className="container mx-auto max-w-screen-xl pb-10">
        <div className="p-4">
      <PageTracker/>
      <h2 className="mt-2 text-3xl font-bold">Your Cart</h2>
      <AddToCartSection/>
        </div>
    </div>
  )}

export default Cart
