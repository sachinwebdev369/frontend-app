import React from 'react'
import {FaFilter} from 'react-icons/fa'
import Product from './Product';
import { useSelector } from 'react-redux'


const FilterProductsSection = ({ isOpen, setIsOpen }) => {
  const {queryProduct, loading} = useSelector(state => state.product)

  return (
     <section className="md:w-3/4 w-full p-4 mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl md:text-xl font-bold mb-4">Products</h2>
            <div className="md:hidden flex items-center justify-center gap-2 w-8 h-8 rounded-full cursor-pointer bg-neutral-200 hover:bg-neutral-100 duration-200"  onClick={() => setIsOpen(!isOpen)} > <FaFilter /> </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {queryProduct ? queryProduct.map((item) => <Product key={item} item={item} />) : (
              <div className="flex items-center col-span-1 sm:col-span-2 lg:col-span-3 justify-center min-h-[500px] w-full text-2xl md:text-3xl font-bold text-gray-500">
                No products found
              </div>
            )}
          </div>
        </section>
  )
}

export default FilterProductsSection
