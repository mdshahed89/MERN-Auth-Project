import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./components/Home"
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"
import User from "./components/User"
import { useSelector } from "react-redux"





function App() {

  const currentUserData = useSelector((state)=> state.user)

  const currentUser = currentUserData.currentUser

  console.log(currentUser);

  // console.log(`isLoggedin: ${isLoggedIn}`);

  return (
    <>
      <header>
        <Header />
      </header>
      <main>

      <Routes>

        <Route path="/" element={<Home />}></Route>
        {
          currentUser.success === false ? 
          <>
          <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
          </> : <Route path="/" element={<Home />}></Route>
        }
        {
          currentUser.success === true ? <Route path="/user" element={<User />} /> : <>
          <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
          </> 
        }

      </Routes>

      </main>
    </>
  )
}

export default App
