import { useDispatch } from "react-redux";
import { logOutUser } from "../store/actions";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen, FaAddressBook } from "react-icons/fa";
import { Link } from "react-router-dom";

const cardStyle = "flex items-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition w-full sm:w-[350px] mb-6";
const iconStyle = "text-4xl text-blue-500 mr-6";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOutUser(navigate));
  };

  return (
    <div className="min-h-[70vh] bg-gray-100 py-10 px-4">
      <h2 className="text-3xl font-bold mb-8">Your Account</h2>
      <div className="flex flex-wrap gap-8">
        <Link to="/profile/orders" className={cardStyle}>
          <FaBoxOpen className={iconStyle} />
          <div>
            <div className="font-bold text-lg">Your Orders</div>
            <div className="text-gray-600 text-sm">Track, return, cancel an order, download invoice or buy again</div>
          </div>
        </Link>
        <Link to="/profile/addresses" className={cardStyle}>
          <FaAddressBook className={iconStyle} />
          <div>
            <div className="font-bold text-lg">Your Addresses</div>
            <div className="text-gray-600 text-sm">Edit, add, or remove addresses</div>
          </div>
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="mt-8 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile; 