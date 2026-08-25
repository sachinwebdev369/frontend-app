import React, { useState } from 'react'
import FilterSidebar from '../components/products/FilterSidebar'
import FilterProductsSection from '../components/products/FilterProductsSection'

const FilterProducts = () => {
      const [isOpen, setIsOpen] = useState(false);


  return (
      <div className="flex flex-col md:flex-row relative">
      <FilterSidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
      <FilterProductsSection isOpen={isOpen} setIsOpen={setIsOpen}/>
    </div>
  )
}

export default FilterProducts
