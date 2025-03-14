import { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", username);
      navigate("/");
    } else {
      setError("Invalid username or password!");
    }
  };

  // Handle Sign Up
  const handleSignup = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (storedUsers.find((user) => user.username === username)) {
      setError("Username already exists!");
      return;
    }

    storedUsers.push({ username, password });
    localStorage.setItem("users", JSON.stringify(storedUsers));
    localStorage.setItem("loggedInUser", username);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md animate-slideUp">
        <h2 className="text-3xl font-bold text-white text-center">
          {isSignup ? "Create an Account" : "Login"}
        </h2>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form
          onSubmit={isSignup ? handleSignup : handleLogin}
          className="flex flex-col space-y-4 mt-6"
        >
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-800 text-white border border-gray-700 rounded-lg p-3 w-full"
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-800 text-white border border-gray-700 rounded-lg p-3 w-full"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Toggle between login and signup */}
        <p className="text-gray-400 text-center mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-blue-400 font-bold cursor-pointer hover:underline"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login here" : "Sign up here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
