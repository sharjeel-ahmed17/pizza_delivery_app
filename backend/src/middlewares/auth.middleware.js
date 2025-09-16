import { sendResponse } from "../helpers/sendResponse.js";
import jwt from "jsonwebtoken";
const authMiddleware = async (req, res, next) => {
    try {
    const token = req.cookies.token;
    if (!token){
        sendResponse(res, 401, true, "Unauthorized access, please login", null);
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodeToken){
        sendResponse(res, 401, true, "Unauthorized access, please login", null);
    }
    console.log(decodeToken)
    req.userId = decodeToken.userId
    next();
} catch (error) {
        sendResponse(res, 500, true, "somethings went wrong", null);
        
        
    }
}

export default authMiddleware;