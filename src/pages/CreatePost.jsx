import { useState } from "react";
import { usePost } from "../context/BlogContext";
import { useNavigate } from "react-router";
import { FaPen } from "react-icons/fa"; // ✅ Icon for heading

const CreatePost = () => {
  const [BlogTitle, SetBlogTitle] = useState("");
  const [BlogDesc, SetBlogDesc] = useState("");
  const [error, setError] = useState("");
  const { setPosts } = usePost();
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("loggedInUser");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!BlogTitle.trim() || !BlogDesc.trim()) {
      setError("Title and description are required.");
      return;
    }

    const newPost = {
      BlogTitle,
      BlogDesc,
      author: loggedInUser, // ✅ Automatically use logged-in user
      timestamp: new Date().toLocaleString(),
      edited: false,
    };

    setPosts((prevPosts) => [...prevPosts, newPost]);
    navigate("/");
    SetBlogTitle("");
    SetBlogDesc("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center p-6 pt-24">
      <div className="max-w-4xl max-h-max w-full bg-gray-900 rounded-lg p-8 shadow-lg animate-fadeIn">
        <div className="flex items-center space-x-2 mb-6">
          <FaPen size={22} className="text-blue-400" />
          <h2 className="text-3xl font-bold">Create a Blog Post</h2>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <input
            type="text"
            placeholder="Enter Blog Title"
            value={BlogTitle}
            onChange={(e) => SetBlogTitle(e.target.value)}
            className="bg-gray-800 text-white border border-gray-700 rounded-lg p-4 w-full focus:ring-2 focus:ring-blue-400 transition"
          />

          <textarea
            placeholder="Enter Blog Description"
            value={BlogDesc}
            onChange={(e) => SetBlogDesc(e.target.value)}
            className="bg-gray-800 text-white border border-gray-700 rounded-lg p-4 w-full h-75 resize-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition"
          >
            Publish Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
