import {Navigate, Route, Routes} from 'react-router-dom'
import Signup from './pages/Signup'
import Home from './pages/Home'
import ForgotPassword from './pages/ForgotPassword'
import Login from './pages/signin'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import { useSelector } from 'react-redux'
export const serverUrl = "http://localhost:5000"
const App = () => {
  useGetCurrentUser();
  const {userData} = useSelector(state=>state.user)
  console.log("userData from app.jsx",userData)
  return (
    <Routes>
<Route path='/register' element={!userData?<Signup/> : <Navigate to={"/"}/>}/>
<Route path='/login' element={!userData?<Login/>: <Navigate to={"/"}/>}/>
<Route path='/forgot-password' element={!userData?<ForgotPassword/>: <Navigate to={"/"}/>}/>
<Route path='/' element={userData?<Home/> : <Navigate to={"/login"}/>}/>
 </Routes>
  )
}

export default App