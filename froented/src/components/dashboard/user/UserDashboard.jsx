// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { serverUrl } from "../../../App";




// const UserDashboard = () => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//   setLoading(true);
//   try {
//     const res = await axios.get(
//       `${serverUrl}/api/auth/logout`,
//       {},
//       { withCredentials: true }
//     );

//     console.log("Logout success:", res.data);
//     alert(res.data?.message || "Logged out successfully");

//     navigate("/login");
//   } catch (error) {
//     console.error("Logout error:", error.response?.data || error.message);
//     alert(error.response?.data?.message || "Logout failed"); // ✅ fixed
//   } finally {
//     setLoading(false);
//   }
// };
//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Hero Section */}
//       <section className="bg-amber-200 w-full flex justify-between items-center p-6 shadow-md">

        
//         <h1 className="text-2xl font-bold">Welcome, Sharjeel 👋</h1>

//         <button
//           onClick={handleLogout}
//           disabled={loading}
//           className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition disabled:opacity-50"
//         >
//           {loading ? "Logging out..." : "Logout"}
//         </button>
//       </section>

//       {/* Main Content */}
//       <main className="flex-grow flex items-center justify-center">
//         <p className="text-gray-700 text-lg">
//           You are logged in to <span className="font-bold text-blue-600">Vingo</span> 🚀
//         </p>
//       </main>
//     </div>
//   );
// };

// export default UserDashboard;


import React from 'react'

const UserDashboard = () => {
  return (
    <div className='bg-red-600'>UserDashboard</div>
  )
}

export default UserDashboard