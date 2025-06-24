import React from 'react'
import { ProductCard } from './ProductCard'
import { useAppContext } from '../context/AppContext'

const BestSeller = () => {

  const { product } = useAppContext()

  return (
    <div className='mt-16'>
      <p className='text-2x1 md:text-3x1 font-medium'>Best Seller</p>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-8 lg:gap-10 mt-6'>
        {product.filter((product) => product.inStock).slice(0, 5).map((product, index) => (<ProductCard key={index} product={product} />))}
      </div>

    </div>
  )
}

export default BestSeller;