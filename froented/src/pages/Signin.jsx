import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff, FiUserPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ClipLoader } from "react-spinners";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/login`,
        formData,
        { withCredentials: true }
      );
      console.log("Login Success:", res.data);

      alert(res.data.data?.message || "Logged in successfully!");
      setErr("");
      setLoading(false);
      navigate("/"); // ✅ redirect after login
    } catch (error) {
      const backend = error.response?.data;

      if (backend?.errors) {
        // show backend validation error
        setErr(backend.errors.message || backend.errors.general);
      } else {
        // fallback
        setErr(error.message);
      }
    } finally {
      setLoading(false);
    }
  };



    const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
    
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider); // ✅ await here
      const user = result.user;

      // console.log("Google user:", user.displayName, user.email );

      const { data } = await axios.post(`${serverUrl}/api/auth/google-auth`, {
        
        email: user.email,
        
        
      }, { withCredentials: true })
      // console.log("Server response:", data);
      setErr("")
      setLoading(false)
    } catch (error) {
      const backend = error.response?.data;

      if (backend?.errors) {
        // show backend validation error
        setErr(backend.errors.message || backend.errors.general);
      } else {
        // fallback
        setErr(error.message);
      }
      setLoading(false);
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
          Sign in to continue to your account
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Password with Show/Hide */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            <div className="text-right mt-1">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {loading ? <ClipLoader color="white" size={20} /> : <>
                            <FiUserPlus size={18} />
                            Sign In
                          </>}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Sign In */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
          disabled={loading}
        >
          {
              loading ? <ClipLoader color="white" size={20} /> : <>
                <FcGoogle size={18} />
                Sign in with Google
              </>
          }
         
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
