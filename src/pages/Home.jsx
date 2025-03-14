import { usePost } from "../context/BlogContext";
import { useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaComment,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import defaultAvatar from "../assets/default-avatar.jpg";

const Home = () => {
  const { posts, toggleLike, addComment, deleteComment, editPost, deletePost } =
    usePost();
  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [openCommentIndex, setOpenCommentIndex] = useState(null);
  const [commentText, setCommentText] = useState("");
  const loggedInUser = localStorage.getItem("loggedInUser");

  const handleEdit = (index, title, desc) => {
    setEditIndex(index);
    setEditTitle(title);
    setEditDesc(desc);
  };

  const handleSave = (index) => {
    if (!editTitle.trim() || !editDesc.trim()) return;
    editPost(index, loggedInUser, editTitle, editDesc);
    setEditIndex(null);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-24 flex justify-center">
      <div className="max-w-4xl w-full">
        {posts.length === 0 ? (
          <p className="text-gray-400 text-center mt-10 text-lg">
            No posts yet. Click "Create Post" to add one!
          </p>
        ) : (
          <div className="space-y-6">
            {posts.map((post, index) => {
              const storedUsers =
                JSON.parse(localStorage.getItem("users")) || [];
              const user = storedUsers.find(
                (user) => user.username === post.author
              );
              const profilePic = user?.profilePic || defaultAvatar;
              const isOwner = loggedInUser === post.author;

              const likedByUser = post.likes?.includes(loggedInUser);
              const totalLikes = post.likes?.length || 0;
              const totalComments = post.comments?.length || 0;

              return (
                <div
                  key={index}
                  className="bg-gray-900 rounded-xl shadow-lg overflow-hidden"
                >
                  {/* Header - Profile & Actions */}
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={profilePic}
                        alt="User Profile"
                        className="w-10 h-10 rounded-full border border-gray-600"
                      />
                      <div>
                        <p className="text-sm font-semibold">{post.author}</p>
                        <p className="text-xs text-gray-400">
                          {post.timestamp}
                        </p>
                      </div>
                    </div>

                    {/* Owner-Only Actions */}
                    {isOwner && (
                      <div className="flex space-x-3">
                        <button
                          onClick={() =>
                            handleEdit(index, post.BlogTitle, post.BlogDesc)
                          }
                          className="text-gray-400 hover:text-gray-200 transition"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          onClick={() => deletePost(index, loggedInUser)}
                          className="text-gray-400 hover:text-red-400 transition"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Post Content */}
                  <div className="p-4">
                    {editIndex === index ? (
                      // Edit Mode
                      <div className="flex flex-col space-y-2">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="bg-gray-800 text-white border border-gray-700 rounded-lg p-2 w-full"
                        />
                        <textarea
                          value={editDesc}
                          onChange={(e) => setEditDesc(e.target.value)}
                          className="bg-gray-800 text-white border border-gray-700 rounded-lg p-4 w-full h-40 resize-none"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSave(index)}
                            className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditIndex(null)}
                            className="bg-gray-500 px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      // Normal View Mode
                      <>
                        <h2 className="text-xl font-semibold">
                          {post.BlogTitle}
                        </h2>
                        <p className="text-gray-300 mt-2">{post.BlogDesc}</p>
                      </>
                    )}
                  </div>

                  {/* Like & Comment Icons */}
                  <div className="flex items-center space-x-6 p-4 border-t border-gray-700">
                    {/* Like Button */}
                    <button
                      onClick={() => toggleLike(index, loggedInUser)}
                      className="flex items-center space-x-1 text-gray-400 hover:text-red-500 transition"
                    >
                      {likedByUser ? (
                        <FaHeart size={18} className="text-red-500" />
                      ) : (
                        <FaRegHeart size={18} />
                      )}
                      <span>{totalLikes}</span>
                    </button>

                    {/* Comment Button */}
                    <button
                      onClick={() =>
                        setOpenCommentIndex(
                          openCommentIndex === index ? null : index
                        )
                      }
                      className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition"
                    >
                      <FaComment size={18} />
                      <span>{totalComments}</span>
                    </button>
                  </div>

                  {/* Comment Section */}
                  {openCommentIndex === index && (
                    <div className="p-4 border-t border-gray-700 bg-gray-800">
                      <div className="flex items-center space-x-3">
                        <input
                          type="text"
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Add a comment..."
                          className="bg-gray-700 text-white border border-gray-600 rounded-lg p-2 w-full"
                        />
                        <button
                          onClick={() => {
                            if (commentText.trim()) {
                              addComment(index, loggedInUser, commentText);
                              setCommentText(""); // Clear input
                            }
                          }}
                          className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                          Post
                        </button>
                      </div>

                      {/* Display Comments */}
                      <div className="mt-4 space-y-2">
                        {post.comments?.map((comment, cIndex) => (
                          <div
                            key={cIndex}
                            className="flex justify-between items-center"
                          >
                            <p className="text-gray-300">
                              <b>{comment.username}</b>: {comment.text}
                              <span className="text-gray-400 text-sm ml-2">
                                ({comment.timestamp})
                              </span>
                            </p>
                            {comment.username === loggedInUser && (
                              <button
                                onClick={() =>
                                  deleteComment(index, cIndex, loggedInUser)
                                }
                                className="text-red-400 hover:text-red-600"
                              >
                                <FaTrash />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
