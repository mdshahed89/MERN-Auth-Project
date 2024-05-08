import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signOutUserSuccess } from '../redux/user/userSlice'


axios.defaults.withCredentials = true

function Header() {
  const navigate = useNavigate()

  // const isLoggedIn = useSelector((state)=> state.isLoggedIn)
  const dispatch = useDispatch()
  const currentUserData = useSelector((state)=> state.user)

  const currentUser = currentUserData.currentUser

  const handleSignOut = async () => {
    const res = await axios.post("http://localhost:8000/api/auth/signout", null, {
      withCredentials: true
    }).catch((err) => {
      console.log(`signout api error: ${err}`);
    })

    const data = await res.data;
    console.log(`logout response: ${data}`);

    if(data.success === true){
      // dispatch()
      dispatch(signOutUserSuccess(data))
      navigate("/signin")
    }

  }

  return (
    <div className=' flex items-center justify-between px-[5%] bg-[#484848] text-[#fff] '>
        <h3 className=' text-[1.5rem] font-semibold '>Logo</h3>
        <ul className=' flex items-center gap-5 text-[1.2rem] font-semibold '>
            <Link to={"/"} className=' py-5 '>Home</Link>
            <Link className=' py-5 '>About</Link>
            <Link className=' py-5 '>Portfolio</Link>
            <Link className=' py-5 '>Blogs</Link>
            <Link className=' py-5 '>Contact</Link>
        </ul>
        <div className=' flex gap-5 '>
            {
              currentUser.success === false ? (<>
              <Link to={"/signup"} className=' px-8 py-2 bg-[#fff] text-[#000] font-medium '>Sign Up</Link>
            <Link to={"/signin"} className=' px-8 py-2 bg-[#fff] text-[#000] font-medium '>Sign In</Link>
            </> ) : null
            }
            {
              currentUser.success === true ? <Link onClick={handleSignOut} className=' px-8 py-2 bg-[#fff] text-[#000] font-medium '>Sign Out</Link> : null
            }
        </div>
    </div>
  )
}

export default Header