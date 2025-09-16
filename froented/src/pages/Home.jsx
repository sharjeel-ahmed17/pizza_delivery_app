
import { useSelector } from "react-redux";
import UserDashboard from "../components/dashboard/user/UserDashboard";
import OwnerDashboard from "../components/dashboard/owner/OwnerDashboard";
import DeliveryBoyDashboard from "../components/dashboard/deliveryBoy/DeliveryBoyDashboard";

const Home = () => {
  const {userData} = useSelector((state) => state.user)
  // console.log(userData.data.user.role)
  // debug concept
  return (
  <div>
    {userData.data.user.role == "user" && <UserDashboard />}
    {userData.data.user.role == "owner" && <OwnerDashboard />}
    {userData.data.user.role == "deliveryBoy" && <DeliveryBoyDashboard />}
  </div>
)};

export default Home;
