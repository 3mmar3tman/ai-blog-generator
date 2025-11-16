import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import DashboardLayout from "./layout/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import DashboardComments from "./pages/DashboardComments";
import Home from "./pages/Home";
import AddBlog from "./pages/AddBlog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BlogDetails from "./pages/BlogDetails";

import Navbar from "./components/Navbar";

function AppContent() {
  const location = useLocation();
  const isDashboardPage = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboardPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-blog" element={<AddBlog />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/blog-details/:id" element={<BlogDetails />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-blog" element={<AddBlog />} />
          <Route path="comments" element={<DashboardComments />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <>
      <Router>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "white",
              color: "#0c4a6e",
              border: "1px solid #bae6fd",
              fontWeight: 500,
            },
            success: {
              iconTheme: {
                primary: "#0ea5e9",
                secondary: "#fff",
              },
            },
            error: {
              style: {
                background: "#fee2e2",
                color: "#991b1b",
                border: "1px solid #fca5a5",
              },
            },
          }}
        />
        <AppContent />
      </Router>
    </>
  );
}

export default App;
