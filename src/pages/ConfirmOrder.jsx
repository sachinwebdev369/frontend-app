import React from 'react'
import ConfirmOrderSection from '../components/checkoutProduct/ConfirmOrderSection'
import CheckoutSteps from '../components/checkoutProduct/CheckoutSteps'

const ConfirmOrder = () => {
  return (
    <div>
        <CheckoutSteps  activePage={2}/>
      <ConfirmOrderSection/>
    </div>
  )}

export default ConfirmOrder
