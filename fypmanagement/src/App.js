import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "./Components/Nav";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Students from "./Components/Students";
import Faculty from "./Components/Faculty";
import Coursera from './Components/Coursera.jsx';
import Fypcategories from "./Components/Fypcategories.jsx";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

import Proposal from "./Components/Proposal.jsx";
import Admin from "./Components/Admin.jsx";

// Function to get authentication data from localStorage
const getAuth = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  console.log(token,role);
  return { token, role };
};

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, role } = getAuth();

  if (!token) {
    return <Navigate to="/login" replace />; // Redirect if user is not logged in
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/cd " replace />; // Redirect if user role is not allowed
  }

  return children; // Render the requested page
};


function App() {
  return (
    <>
      <Nav />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Routes */}
        <Route
          path="/faculty"
          element={
            <ProtectedRoute allowedRoles={["admin", "faculty"]}>
              <Faculty />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students"
          element={
            <ProtectedRoute allowedRoles={[ "student"]}>
              <Students />
            </ProtectedRoute>
          }
        />

<Route
          path="/proposal"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Proposal />
            </ProtectedRoute>
          }
        />
<Route
          path="/coursera"
          element={
            <ProtectedRoute allowedRoles={["admin", "faculty","student"]}>
              <Coursera />
            </ProtectedRoute>
          }
          />
          <Route
          path="/fypcategories"
          element={
            <ProtectedRoute allowedRoles={["admin", "faculty","student"]}>
              <Fypcategories />
            </ProtectedRoute>
          }
          />

<Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Admin />
            </ProtectedRoute>
          }
          />


        {/* Catch-All Route: Redirect unknown paths to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    
    </>
  );
}

export default App;
