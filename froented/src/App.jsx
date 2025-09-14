import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Signup from './pages/signup'
import Signin from './pages/signin'
import Home from './pages/Home'
import ResetPassword from './pages/ResetPassword'
import ForgotPassword from './pages/ForgotPassword'
import Login from './pages/signin'
export const serverUrl = "http://localhost:5000"
const App = () => {
  return (
    <Routes>
<Route path='/register' element={<Signup/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/' element={<Home/>}/>
<Route path='/forgot-password' element={<ForgotPassword/>}/>
<Route path='/reset-password' element={<ResetPassword/>}/>


    </Routes>
  )
}

export default App