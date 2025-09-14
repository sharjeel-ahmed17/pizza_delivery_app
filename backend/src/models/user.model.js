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
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "owner", "deliveryBoy"], // restricts values
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
      // default : false
    }

  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

const User = mongoose.model("User", userSchema);

export default User;
