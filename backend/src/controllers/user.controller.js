import { sendResponse } from "../helpers/sendResponse.js";
import User from "../models/user.model.js";

export const currentUser = async (req , res) => {
    try {
        const userId = req.userId;
        if(!userId){
            sendResponse(res, 401, true, "userId is not defined", null);
        }
        const user = await User.findById(userId)
        if (!user){
            sendResponse(res, 404, true, "user not found", null);
        }
        sendResponse(res, 200, false, null, {user});
    } catch (error) {
        sendResponse(res, 500, true, {message : "get current user error"}, error.message );
        
    }
}