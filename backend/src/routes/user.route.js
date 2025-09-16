import express from "express"

import { currentUser } from "../controllers/user.controller.js";
import isAuth from "../middlewares/auth.middleware.js";


const userRoute = express.Router()


userRoute.get("/current" , isAuth, currentUser);



export default userRoute;