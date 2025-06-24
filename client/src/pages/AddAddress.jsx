import React, { useEffect, useState } from 'react'
import { assets } from '../asset/assets'
import {useAppContext} from '../context/AppContext'
import toast from 'react-hot-toast'

//input field component
const InputField = ({ type, placeholder, onChange, name, address, }) => {
    return (<input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline outline-none text-gray-500 focus:border-primary transition' type={type} placeholder={placeholder} onChange={onChange} name={name} value={address[name]} required />)
}


const AddAddress = () => {

    const { axios, user, navigate } = useAppContext()

    const [address, setAddress] = useState({
        firstName: '', lastName: '', email: '', street: '', city: '', state: '', zipcode: '', country: '', phone: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setAddress((prevAddress) => ({
            ...prevAddress, [name]: value,
        }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/address/add', { address });

            if (data.success) {
                toast.success(data.message); navigate('/cart')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect  (() => {
        if (!user) {
            navigate('/')
        }
    }, [user,navigate])


    return (
        <div className='mt-16 pb-16'>
            <p className='text-2x1 md:text-3x1 text-gray-500'>Add Shipping<span className='font-sembold text-primary'> Address</span></p>
            <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
                <div className='flex-1 max-w-md'>
                    <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>
                        <div className='grid grid-cols-2 gap-4'>
                            <InputField type="text" name="firstName" placeholder="First Name" onChange={handleChange} address={address} />
                            <InputField type="text" name="lastName" placeholder="Last Name" onChange={handleChange} address={address} />
                        </div>
                        <InputField type="text" name="email" placeholder="Email" onChange={handleChange} address={address} />
                        <InputField type="text" name="street" placeholder="Street" onChange={handleChange} address={address} />
                        <div className='grid grid-cols-2 gap-4'>
                            <InputField type="text" name="city" placeholder="city" onChange={handleChange} address={address} />
                            <InputField type="text" name="state" placeholder="State" onChange={handleChange} address={address} />
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <InputField type="number" name="zipcode" placeholder="Zipcode" onChange={handleChange} address={address} />
                            <InputField type="text" name="country" placeholder="Country" onChange={handleChange} address={address} />
                        </div>

                        <InputField type="text" name="phone" placeholder="Phone" onChange={handleChange} address={address} />

                        <button className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase'>
                            Save Address
                        </button>
                    </form>
                </div>
                <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_iamge} />
            </div>
        </div>
    )
}

export default AddAddress