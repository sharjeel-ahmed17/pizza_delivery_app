import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter.slice.js'

export default configureStore({
    reducer : {
        counter : counterReducer,
    }
})