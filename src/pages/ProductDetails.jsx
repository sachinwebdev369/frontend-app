import React, { useEffect } from 'react'
import PageTracker from '../components/products/PageTracker'
import SingleProductDetails from '../components/products/SingleProductDetails'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct } from '../api/features/product';

const ProductDetails = () => {
  const {id} = useParams();
  const dispatch = useDispatch()
  const {singleProduct} = useSelector(state => state.product)

useEffect(()=> {
  window.scrollTo(0,0)
  dispatch(getSingleProduct(id))
}, [id])

  return (
    <div className="container mx-auto p-4 mb-24">
      <PageTracker/>
     {singleProduct && <SingleProductDetails product={singleProduct}/>}
    </div>
  )}

export default ProductDetails
