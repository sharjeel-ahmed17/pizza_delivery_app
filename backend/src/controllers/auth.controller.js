import { sendResponse } from "../helpers/sendResponse.js";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import getToken from "../utils/token.js";
import { sendOtpMail } from "../utils/mail.js";


// ================= REGISTER =================
export const register = async (req, res) => {
  try {
    const { fullname, email, password, mobile, role } = req.body;

    // Check required fields
    if (!fullname || !email || !password || !mobile) {
      return sendResponse(res, 400, true, { message: "All fields are required" }, null);
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendResponse(res, 400, true, { message: "User already exists" }, null);
    }

    // Password validation
    if (typeof password !== "string" || password.length < 6) {
      return sendResponse(res, 400, true, { message: "Password must be at least 6 characters" }, null);
    }

    // Mobile validation
    if (typeof mobile !== "string" || mobile.length !== 11) {
      return sendResponse(res, 400, true, { message: "Mobile number must be 11 digits" }, null);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
      mobile,
      role,
    });

    const token = await getToken(user._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return sendResponse(res, 201, false, { message: "User created successfully" }, user);
  } catch (error) {
    console.error(error.message);
    return sendResponse(res, 500, true, { general: error.message }, null);
  }
};


// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }); // ✅ added await
    if (!user) {
      return sendResponse(res, 400, true, { message: "User does not exist" }, null);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendResponse(res, 401, true, { message: "Incorrect password" }, null);
    }

    const token = await getToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // ✅ corrected spelling
    });

    return sendResponse(res, 200, false, { message: "User signed in successfully" }, user);
  } catch (error) {
    console.error(error.message);
    return sendResponse(res, 500, true, { general: error.message }, null);
  }
};

// ================= LOGOUT =================
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
  httpOnly: true,
  secure: false, // set true if using HTTPS
  sameSite: "strict",
});

    return sendResponse(res, 200, false, { message: "Logout successfully" }, null);
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, true, { message: "Signout error" }, null);
  }
};

// ================= SEND_OTP =================

export const sendOTP = async (req , res)=>{
  try {
    const {email} = req.body;
    const user = await User.findOne({email})
    if (!user ){
      return sendResponse(res , 500 , true , {message : "user does not exists"} , null)

    }
    const otp = Math.floor(1000  + Math.random() * 9000).toString()
    user.resetOtp=otp
    user.isOtpExpired=Date.now()+5*60*1000
    user.isOtpVerifeid=false
    await user.save()
    await sendOtpMail(user.email , otp)

    return sendResponse(res , 200 , false , {message : "otp send successfully"} , user )
  } catch (error) {
    return sendResponse(res , 500 , true , {message : ":::send otp error"} , null)
    
  }
}

// ================= VERIFY_OTP =================

export const verfiyOtp = async (req , res)=>{
  try {
    const {email , otp} = req.body;
    const user = await User.findOne({email})
    if(!user || user.resetOtp != otp || user.isOtpExpired < Date.now()){
      return sendResponse(res , 400 , true , {message : "invalid/expired otp"} , null)
    }
    
    user.isOtpVerifeid = true   // ✅ mark OTP verified
    user.resetOtp = undefined   // ✅ clear OTP
    user.isOtpExpired = undefined
    await user.save()

    return sendResponse(res , 200 , false , {message : "otp verify successfully"} , user)
  } catch (error) {
    console.log(error);
    return sendResponse(res , 500 , true , {message : "failed to verify otp"} , null)
  }
}


// ================= RESET_PASSWORD =================
export const resetPassword = async (req , res) => {
  try {
const {email  , newPassword} = req.body;
const user = await User.findOne({email})
if (!user || !user.isOtpVerifeid){
  return sendResponse(res , 400 , false , {message : "otp verification required"} , null)

}
const hashedPassword = await bcrypt.hash(newPassword  , 10 )
user.password=hashedPassword
user.isOtpVerifeid=false
await user.save()
return sendResponse(res , 200 , false , {message : "password reset successfully"} , user)
} catch (error) {
    return sendResponse(res , 500 , true , {message : "password reset error"} , null)

    
  }

  
}

// ================= RESET_PASSWORD =================

export const googleAuth = async (req , res)=>{
  try {
    const dummyPassword = await bcrypt.hash(Math.random().toString(36).slice(-8), 10);
    const {fullname , email , role , mobile} = req.body;
    let user = await User.findOne({email})
    if (!user){
      user = await User.create({
        fullname,
        email,
        mobile,
        role,
        password: dummyPassword, // placeholder
      })
    }
 const token = await getToken(user._id);

    res.cookie("token", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return sendResponse(res, 201, false, { message: "User created successfully", user });


  } catch (error) {
    console.error(error);
return sendResponse(res , 500 , true , { message: error.message }, null);

    
  }
}