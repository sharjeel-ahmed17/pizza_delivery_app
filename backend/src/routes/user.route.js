import express from "express"

import { currentUser } from "../controllers/user.controller.js";


const userRoute = express.Router()


userRoute.get("/current" , currentUser);



export default userRoute;