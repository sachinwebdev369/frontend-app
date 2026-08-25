import React from 'react'
import Payment from '../components/checkoutProduct/Payment'
import CheckoutSteps from '../components/checkoutProduct/CheckoutSteps'

const OrderPayment = () => {
  return (
    <div>
      <CheckoutSteps  activePage={3} />
      <Payment/>
    </div>
  )}

export default OrderPayment
