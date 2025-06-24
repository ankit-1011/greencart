import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { ProductCard } from '../components/ProductCard'

const AllProducts = () => {

    const { product, searchQuery } = useAppContext()
    const [filteredProducts, setFilteredProducts] = React.useState([])

    useEffect(() => {
        if (searchQuery.length > 0) {
            setFilteredProducts(product.filter(
                product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
            ))}
        else {
            setFilteredProducts(product)
        }

    }, [product, searchQuery])

    return (
        <div className='mt-16 flex flex-col'>
            <div className='flex flex-col items-end w-max'> 
                <p className='text-2x1 font-medium uppercase'>All  products</p>
                <div className='w-16 h-0.5 bg-primary rounded-full'></div>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
                {filteredProducts.filter((product) => product.inStock).map((product, index) => (<ProductCard key={index} product={product} />))}
            </div>
        </div>
    )
}

export default AllProducts