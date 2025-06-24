import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import { Footer } from './components/Footer'
import { useAppContext } from './context/AppContext'
import { Login } from './components/Login'
import AllProducts from './pages/AllProducts'
import ProductCategory from './pages/ProductCategory'
import { ProductDetails } from './pages/ProductDetails'
import { Cart } from './pages/Cart'
import AddAddress from './pages/AddAddress'
import MyOrders from './pages/MyOrders'
import SellerLogin from './components/seller/SellerLogin'
import { SellerLayout } from './pages/seller/SellerLayout'
import Orders from './pages/seller/Orders'
import AddProduct from "./pages/seller/AddProduct";
import ProductList from './pages/seller/ProductList'
import Loading from './components/Loading'


const App = () => {

  const isSellerpath = useLocation().pathname.includes("seller");
  const { showUserLogin, isSeller } = useAppContext()

  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>

      {isSellerpath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}

      <Toaster />
      <div className={`${isSellerpath ? "" : "px-6 md:px-16 lg:px-2 xl:px-32"}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/products/:category' element={<ProductCategory />}></Route>
          <Route path='/products/:category/:id' element={<ProductDetails />}></Route>
          <Route path='cart' element={<Cart />}></Route>
          <Route path='add-address' element={<AddAddress />}></Route>
          <Route path='my-orders' element={<MyOrders />}></Route>
          <Route path='loader' element={<Loading/>}></Route>
          <Route path='/seller' element={isSeller ? <SellerLayout /> : <SellerLogin />}>
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route path='product-list' element={<ProductList />} />
            <Route path='orders' element={<Orders />} />
          </Route>
        </Routes>
      </div>
      {!isSellerpath && <Footer />}
    </div>
  )
}

export default App