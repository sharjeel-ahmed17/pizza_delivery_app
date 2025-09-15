import express from "express"
import {  googleAuth, login, logout, register, resetPassword, sendOTP  , verfiyOtp} from "../controllers/auth.controller.js"


const authRoute = express.Router()

// authRoute.get("/check" , check);
authRoute.post("/register" , register);
authRoute.post("/login" , login);
authRoute.get("/logout" , logout);
authRoute.post("/send-otp" , sendOTP);
authRoute.post("/verify-otp" , verfiyOtp);
authRoute.post("/reset-password" , resetPassword);
authRoute.post("/google-auth" , googleAuth);


export default authRoute;