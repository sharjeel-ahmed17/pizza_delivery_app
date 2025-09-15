import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { serverUrl } from "../App";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1=send otp, 2=verify otp, 3=reset password
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  // Step 1 → Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true }
      );
      console.log("OTP Response:", result.data);
      setErr("")
      setLoading(false)
      setStep(2);
    } catch (error) {
      const backend = error.response?.data;

      if (backend?.errors) {
        // show backend validation error
        setErr(backend.errors.message || backend.errors.general);
      } else {
        // fallback
        setErr(error.message);
      }
      setLoading(false)
      console.error(error);
      alert("Failed to send OTP");
    }
  };

  // Step 2 → Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );
      console.log("Verify OTP Response:", result.data);
      setErr("")
      setLoading(false)
      setStep(3);
    } catch (error) {
      const backend = error.response?.data;

      if (backend?.errors) {
        // show backend validation error
        setErr(backend.errors.message || backend.errors.general);
      } else {
        // fallback
        setErr(error.message);
      }
      setLoading(false)
      console.error(error);
      alert("Invalid or expired OTP");
    }
  };

  // Step 3 → Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { email, newPassword },
        { withCredentials: true }
      );
      console.log("Reset Response:", result.data);
      alert("Password reset successfully!");
      setErr("")
      setLoading(false)
      navigate("/login");
    } catch (error) {
      const backend = error.response?.data;

      if (backend?.errors) {
        // show backend validation error
        setErr(backend.errors.message || backend.errors.general);
      } else {
        // fallback
        setErr(error.message);
      }
      setLoading(false)
      console.error(error);
      alert("Failed to reset password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        {/* Logo + Heading */}
        <h1 className="text-3xl font-extrabold text-blue-600 text-center">
          vingo
        </h1>
        <p className="text-gray-500 text-center mt-2 mb-6">
          {step === 1 && "Enter your email address to receive an OTP."}
          {step === 2 && "Enter the OTP sent to your email."}
          {step === 3 && "Enter your new password below."}
        </p>

        {/* Step 1 → Email */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
            {err && <p className="text-red-500 text-sm mt-2 text-center">{err}</p>}
          </form>
        )}

        {/* Step 2 → Verify OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">OTP</label>
              <input
                type="text"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            {err && <p className="text-red-500 text-sm mt-2 text-center">{err}</p>}
              
            
          </form>
        )}

        {/* Step 3 → Reset Password */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords ? "text" : "password"}
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(!showPasswords)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPasswords ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                type={showPasswords ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
              
            {err && <p className="text-red-500 text-sm mt-2 text-center">{err}</p>}
            </button>
          </form>
        )}

        {/* Back to Login */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
