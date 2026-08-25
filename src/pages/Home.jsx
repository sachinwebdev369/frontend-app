import React from "react";
import ProductContianer from "../components/products/ProductContianer";
import Footer from "../components/layouts/Footer";
import Banner from "../components/banner/Banner";
import Category from "../components/Category";
import Testimonials from "../components/Testimonials";
import { useSelector } from 'react-redux'


const Home = () => {
  const {allProducts, loading} = useSelector(state => state.product) 
  return (
    <div> 
      <Banner />
      {
        allProducts && (
          <>
           <ProductContianer categoryProduct={allProducts?.mensProduct} heading="Products for men" />
           <ProductContianer categoryProduct={allProducts?.womensProduct} heading="Products for womens" />
           <ProductContianer categoryProduct={allProducts?.techProduct} heading="Tech Products" />
           <ProductContianer categoryProduct={allProducts?.otherProduct} heading="our Awesome collections" />
          </>
        )}

      <Category/>
      <Testimonials/>
    </div>
  )};

export default Home;