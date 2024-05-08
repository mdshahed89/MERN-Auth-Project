import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice.js'

function SignIn() {

    // const isLoggedIn = useSelector((state) => state.isLoggedIn)
    const dispatch = useDispatch()
    // const currentUser = useSelector((state) => state.currentUser)

    const [formData, setFormData] = useState({})

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    // console.log(formData);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await axios.post("http://localhost:8000/api/auth/signin", formData).catch((err) => {
            console.log(err);
        })

        const data = await res.data;
        console.log(data);
        if(data.success === true) {
            dispatch(signInSuccess(data))
            navigate("/user")

        }

    }

  return (
    <div className=' h-[90vh] flex items-center justify-center flex-col gap-8 '>
        <h2 className=' text-[3rem] font-semibold '>Sign In</h2>
        <form onSubmit={handleSubmit} className=' flex flex-col gap-4 w-[30%] '>
            <input onChange={handleChange} type="email" name="" id="email" placeholder='Email' className=' py-2 w-full px-3 border outline-none ' />
            <input onChange={handleChange} type="password" name="" id="password" placeholder='Password' className=' py-2 w-full px-3 border outline-none ' />
            <button className=' w-full py-2 bg-[#000] text-[#fff] font-semibold text-[1.2rem] '>Sign In</button>
        </form>
        <h3 className=' text-left '>Don't have an account ? <Link to={"/signup"} className=' underline '>Sign In</Link></h3>
    </div>
  )
}

export default SignIn