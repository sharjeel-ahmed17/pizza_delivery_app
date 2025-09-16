import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter.slice.js'
import userSlice from './user.slice.js'
export const store = configureStore({
    reducer : {
        counter : counterReducer,
        user : userSlice
    }
})