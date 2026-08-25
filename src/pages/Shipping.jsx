import React from 'react'
import CheckoutSteps from '../components/checkoutProduct/CheckoutSteps'
import ShippingForm from '../components/checkoutProduct/ShippingForm'

const Shipping = () => {
  return (
    <div>
      <CheckoutSteps activePage={1}  />
      <ShippingForm/>
    </div>
  )}

export default Shipping
