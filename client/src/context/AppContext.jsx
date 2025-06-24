import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from '../asset/assets'
import toast from "react-hot-toast";
import axios from 'axios';

axios.defaults.withCredentials = true; //taki cookies bhi aa sake
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [product, setProduct] = useState([])

    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState({})

    // Fetch Seller Status 
    const fetchSeller = async () => {
        try {
            const { data } = await axios.get('/api/seller/is-auth');

            if (data.success) {
                setSeller(true)
            } else {
                setSeller(false)
            }
        } catch (error) {
            setSeller(false)
        }
    }

    // Fetch User Auth Status, User Data and Cart Items

    const fetchUser = async () => {
        try {
            const { data } = await axios.post('api/user/is-auth');
            if (data.success) {
                setUser(data.user)
                setCartItems(data.user.cartItems)
            }
        } catch (error) {
            setUser(null)
        }
    }


    // Fetch All Products 
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/product/list')
            if (data.success) { setProduct(data.products) } else { toast.error(data.message) }
        } catch (error) { toast.error(error.message) }
    }

    //add products to cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to Cart")
    }

    //update cart item quantity
    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData)
        toast.success("Cart Updated")
    }

    //remove product from cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }
        toast.success("Removed from Cart");
        setCartItems(cartData)
    }

    //get Cart Item couunt
    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            const count = Number(cartItems[item]);
            if (!isNaN(count)) {
                totalCount += count;
            }
        }
        return totalCount;
    }

    //get cart total Amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let iteminfo = product.find((product) => product._id === items)
            totalAmount += iteminfo.offerPrice * cartItems[items];
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    useEffect(() => {
        fetchUser()
        fetchSeller()
        fetchProducts()
    }, [])

    //update database cart items
    useEffect(() => {
        async function updateCart() {
            try {
                const { data } = await axios.post('/api/cart/update', { cartItems })
                if (!data.success) {
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
            if (user) { updateCartItem() }
        }
        updateCart();
    }, [cartItems])

    const value = { navigate, user, setUser, setSeller, isSeller, showUserLogin, setShowUserLogin, product, currency, updateCartItem, removeFromCart, cartItems, addToCart, searchQuery, setSearchQuery, getCartAmount, getCartCount, axios, fetchProducts ,setCartItems};


    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};


export const useAppContext = () => {
    return useContext(AppContext);
}