import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import { PostProvider } from "./context/BlogContext";

const PrivateRoute = ({ element }) => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  return loggedInUser ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <PostProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          <Route
            path="/create-post"
            element={<PrivateRoute element={<CreatePost />} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute element={<Profile />} />}
          />
        </Routes>
      </BrowserRouter>
    </PostProvider>
  );
}

export default App;
