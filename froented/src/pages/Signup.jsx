import React, { useState } from "react";
import { FiEye, FiEyeOff, FiUserPlus } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { ClipLoader } from "react-spinners"
import { useDispatch } from "react-redux";
import useGetCurrentUser from "../hooks/useGetCurrentUser";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    mobile: "",
    role: "user",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      console.log("Form submitted:", formData);

      const result = await axios.post(
        `${serverUrl}/api/auth/register`,
        formData,
        { withCredentials: true }
      );

      // console.log("Server response:", result.data);

      // Reset form after success
      setFormData({
        fullname: "",
        email: "",
        password: "",
        mobile: "",
        role: "user",
      });
      dispatch(useGetCurrentUser(result.data))
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

  const handleGoogleSignup = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      if (!formData.mobile) {
        return setErr("Please enter mobile number")
      }
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider); // ✅ await here
      const user = result.user;

      // console.log("Google user:", user.displayName, user.email );

      const { data } = await axios.post(`${serverUrl}/api/auth/google-auth`, {
        fullname: user.displayName,
        email: user.email,
        role: formData.role,
        mobile: formData.mobile,
      }, { withCredentials: true })
      // console.log("Server response:", data);
      dispatch(useGetCurrentUser(data))
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
          Create a new account to get started
        </p>

        {/* Signup Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

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
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium mb-1">Mobile</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Role as Buttons */}
          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <div className="flex space-x-2">
              {["user", "owner", "deliveryBoy"].map((role) => (
                <button
                  type="button"
                  key={role}

                  onClick={() => handleRoleChange(role)}
                  className={`px-4 py-2 rounded-lg border border-gray-300 transition ${formData.role === role
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                  {role === "deliveryBoy"
                    ? "Delivery Boy"
                    : role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
            disabled={loading}
          >
            {
              loading ? <ClipLoader color="white" size={20} /> : <>
                <FiUserPlus size={18} />
                Sign Up
              </>
            }

          </button>
          {err && <p className="text-red-500 text-sm mt-2 text-center">*{err}</p>}

        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Signup */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
          disabled={loading}
        >
          {
              loading ? <ClipLoader color="white" size={20} /> : <>
                <FcGoogle size={18} />
                Sign Up
              </>
            }
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
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

export default Signup;
