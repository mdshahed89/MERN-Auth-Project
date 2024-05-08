import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
axios.defaults.withCredentials = true


let firstReq = false

function User() {
  const dispatch = useDispatch()
  
  const [user, setUser] = useState()

  const refresh = async () => {
    const res = await axios.get("http://localhost:8000/api/auth/refresh", {
      withCredentials: true
    }).catch((err)=> {
      console.log(err);
    })

    const data = await res.data;
    // console.log(data);
    return data;
  }

  const sendReq = async () => {
    const res = await axios.get("http://localhost:8000/api/auth/user", {
      withCredentials: true
    }).catch((err)=> {
      console.log(err);
    })

    const data = await res.data;
    // if(data.success){
    //   dispatch(authActions.signIn())
    // }
    // console.log(data);
    return data;
  }

  
  // console.log(firstReq);
  useEffect( ()=> {
    if(firstReq === false){
      sendReq().then((data) => setUser(data.user) )
      firstReq = true;
    }
    const interval = setInterval(()=> {
      refresh().then((data) => setUser(data.user) )
    }, 1000*60 * 60 * 24 * 6)

    return ()=> clearInterval(interval)

    // console.log(user);

  }, [])

  return (
    <div className=' flex flex-col items-center justify-center h-[90vh] '>
        <h1 className=' text-[5rem] font-bold '>WELCOME</h1>
        <h3 className=' text-[3rem] font-semibold '>Now you are a user</h3>
        <h2>Name: {user?.name}</h2>
    </div>
  )
}

export default User