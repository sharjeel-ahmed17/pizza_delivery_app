import React from 'react'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import axios from 'axios'
import { setUserData } from '../redux/user.slice'
import { useDispatch } from 'react-redux'

const useGetCurrentUser = () => {
  const dispatch = useDispatch();
   useEffect(() => {
    const fetchCurrentUser = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/user/current`, {
                withCredentials: true,
            });
            dispatch(setUserData(result.data))
        } catch (error) {
            console.log("get current user error", error)
            
        }
    }
    fetchCurrentUser();
   }, [])
  
}

export default useGetCurrentUser