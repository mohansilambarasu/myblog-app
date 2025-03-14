import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { usePost } from "../context/BlogContext";
import { FaHome, FaPlus, FaUser, FaSignOutAlt } from "react-icons/fa"; // ✅ Added Icons
import defaultAvatar from "../assets/default-avatar.jpg";

const Profile = () => {
  const navigate = useNavigate();
  const { posts, setPosts } = usePost();
  const [username, setUsername] = useState(
    localStorage.getItem("loggedInUser") || ""
  );
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profilePic, setProfilePic] = useState(defaultAvatar);

  useEffect(() => {
    // ✅ Fetch the correct profile picture for the logged-in user
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.username === username);
    if (user && user.profilePic) {
      setProfilePic(user.profilePic);
    }
  }, [username]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  const handleUpdateUsername = () => {
    if (!newUsername.trim()) return alert("Username cannot be empty!");

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex((user) => user.username === username);

    if (userIndex !== -1) {
      users[userIndex].username = newUsername;
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("loggedInUser", newUsername);

      // Update posts with new username
      const updatedPosts = posts.map((post) =>
        post.author === username ? { ...post, author: newUsername } : post
      );
      setPosts(updatedPosts);

      alert("Username updated successfully!");
      setUsername(newUsername);
      setNewUsername("");
    }
  };

  const handleUpdatePassword = () => {
    if (!newPassword.trim()) return alert("Password cannot be empty!");

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex((user) => user.username === username);

    if (userIndex !== -1) {
      users[userIndex].password = newPassword;
      localStorage.setItem("users", JSON.stringify(users));

      alert("Password updated successfully!");
      setNewPassword("");
    }
  };

  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const userIndex = users.findIndex((user) => user.username === username);

        if (userIndex !== -1) {
          users[userIndex].profilePic = reader.result;
          localStorage.setItem("users", JSON.stringify(users));
          setProfilePic(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProfilePic = () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex((user) => user.username === username);

    if (userIndex !== -1) {
      users[userIndex].profilePic = defaultAvatar; // ✅ Set to default avatar
      localStorage.setItem("users", JSON.stringify(users));
      setProfilePic(defaultAvatar);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-24 flex justify-center">
      <div className="max-w-4xl max-h-max w-full bg-gray-900 rounded-lg p-8 shadow-lg animate-slideIn">
        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center">
          <label htmlFor="profile-pic-upload" className="cursor-pointer">
            <img
              src={profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-gray-600 shadow-lg hover:opacity-80 transition"
            />
          </label>
          <input
            type="file"
            id="profile-pic-upload"
            accept="image/*"
            onChange={handleProfilePicUpload}
            className="hidden"
          />

          {profilePic !== defaultAvatar && (
            <button
              onClick={handleRemoveProfilePic}
              className="mt-3 text-red-500 hover:text-red-700 text-sm font-semibold"
            >
              Remove Profile Picture
            </button>
          )}

          <h3 className="text-2xl font-semibold mt-3">{username}</h3>
        </div>

        {/* Update Username */}
        <div className="mt-8 flex flex-col">
          <h3 className="text-lg font-bold text-gray-300 self-start">
            Update Username
          </h3>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="New Username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="bg-gray-800 text-white border border-gray-700 rounded-lg p-3 mt-2 w-full"
            />
            <button
              onClick={handleUpdateUsername}
              className="max-w-max bg-blue-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition mt-3 w-full"
            >
              Update Username
            </button>
          </div>
        </div>

        {/* Update Password */}
        <div className="mt-8 flex flex-col">
          <h3 className="text-lg font-bold text-gray-300 self-start">
            Update Password
          </h3>
          <div className="flex gap-4">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-gray-800 text-white border border-gray-700 rounded-lg p-3 mt-2 w-full"
            />
            <button
              onClick={handleUpdatePassword}
              className="max-w-max bg-green-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-green-700 transition mt-3 w-full"
            >
              Update Password
            </button>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 flex items-center space-x-2 text-red-500 hover:text-red-600 transition text-lg"
        >
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
