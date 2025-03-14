import { useNavigate } from "react-router";
import { FaHome, FaPlus, FaUser, FaSignOutAlt } from "react-icons/fa"; // ✅ Added Icons
import { ImBlog } from "react-icons/im";

const Navbar = () => {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("loggedInUser");

  return (
    <nav className="bg-gray-900 text-white fixed top-0 w-full px-6 py-4 shadow-md animate-slideDown">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1
          className="text-2xl font-bold cursor-pointer hover:text-blue-400 transition flex items-center"
          onClick={() => navigate("/")}
        >
          <span className="pr-2">
            <ImBlog />
          </span>
          BlogSphere
        </h1>

        {/* Buttons */}
        {loggedInUser && (
          <div className="flex space-x-6">
            <button
              onClick={() => navigate("/create-post")}
              className="flex items-center space-x-2 hover:text-blue-400 transition"
            >
              <FaPlus /> <span>Create</span>
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center space-x-2 hover:text-blue-400 transition"
            >
              <FaUser /> <span>Profile</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
