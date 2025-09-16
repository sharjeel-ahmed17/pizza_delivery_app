import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function() {
    return !this.googleId;   }
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "owner", "deliveryBoy"], 
      default: "user",
    },
    resetOtp : {
      type : String
    },
    isOtpVerifeid : {
      type : Boolean,
      default : false
    },
    isOtpExpired : {
      type : Date,
    },
    provider: {
  type: String,
  enum: ["local", "google"],
  default: "local"
}


  },
  {
    timestamps: true, 
  }
);

const User = mongoose.model("User", userSchema);

export default User;
