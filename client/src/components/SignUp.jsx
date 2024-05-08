import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

function SignUp() {

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

        const res = await axios.post("http://localhost:8000/api/auth/signup", formData).catch((err) => {
            console.log(err);
        })

        const data = await res.data;

        if(data.success === true) {
            navigate("/signin")
        }

    }

  return (
    <div className=' h-[90vh] flex items-center justify-center flex-col gap-8 '>
        <h2 className=' text-[3rem] font-semibold '>Sign Up</h2>
        <form onSubmit={handleSubmit} className=' flex flex-col gap-4 w-[30%] '>
            <input onChange={handleChange} type="text" name="" id="name" placeholder='Name' className=' py-2 w-full px-3 border outline-none ' />
            <input onChange={handleChange} type="email" name="" id="email" placeholder='Email' className=' py-2 w-full px-3 border outline-none ' />
            <input onChange={handleChange} type="password" name="" id="password" placeholder='Password' className=' py-2 w-full px-3 border outline-none ' />
            <button className=' w-full py-2 bg-[#000] text-[#fff] font-semibold text-[1.2rem] '>Sign up</button>
        </form>
        <h3 className=' text-left '>Already have an account ? <Link to={"/signin"} className=' underline '>Sign In</Link></h3>
    </div>
  )
}

export default SignUp