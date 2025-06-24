import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast';

const SellerLogin = () => {

    const { isseller, setSeller, navigate, axios } = useAppContext()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();
            const { data } = await axios.post('/api/seller/login', { email, password })

            if (data.success) {
                setSeller(true)
                navigate('/seller')

            } else {
                toast.error(data.message)
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (isseller) {
            navigate("/seller")
        }
    }, [isseller])

    return !isseller && (
        <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center text-sm text-gray-600'>

            <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-1g shadow-xl border border-gray-200'> <p className='text-2x1 font-medium m-auto'><span className="text-primary">Seller</ span> Login</p>
                <div className="w-full ">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" value={email} placeholder="enter you email" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" required />
                </div>
                <div className="w-full">
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="enter your password" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"  required />
                </div>
                <button className='bg-primary text-white w-full py-2 rounded-md cursor-pointer'>Login</button>
            </div>
        </form>
    )
}

export default SellerLogin