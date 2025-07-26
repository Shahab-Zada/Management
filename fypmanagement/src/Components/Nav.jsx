import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import DPT from "../Assets/Dptlogo.png";

export default function Nav() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    setIsAuthenticated(!!token);
    setRole(userRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("teacherId");
    localStorage.removeItem("name");
    localStorage.removeItem("groupId");
    setIsAuthenticated(false);
    setRole(null);
    navigate("/");
  };

  const closeMenu = () => setIsOpen(false);

  // Define role-based links
  const studentLinks = [
    { to: "/", label: "Home" },
     { to: "/students", label: "Marks" },
    { to: "/proposal", label: "Proposal" },
    { to: "/fypcategories", label: "FYP Categories" },
    { to: "/coursera", label: "Coursera Courses" },
    
  ];

  const facultyLinks = [
    { to: "/", label: "Home" },
    { to: "/faculty", label: "Faculty" },
    { to: "/coursera", label: "Coursera Courses" },
  ];

  const adminLinks = [
    { to: "/", label: "Home" },
     { to: "/faculty", label: "Faculty" },
      { to: "/coursera", label: "Coursera Courses" },
    { to: "/admin", label: "Admin" },
   
  ];

  let navLinks = [];

  if (isAuthenticated) {
    if (role === "student") {
      navLinks = studentLinks;
    } else if (role === "faculty") {
      navLinks = facultyLinks;
    } else if (role === "admin") {
      navLinks = adminLinks;
    }
  }

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top py-2 custom-navbar">
      <div className="container">
        <NavLink className="navbar-brand d-flex align-items-center" to="/" onClick={closeMenu}>
          <img src={DPT} alt="Logo" className="logo-img w-100" />
        </NavLink>

        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">

            {/* Only show nav links if logged in */}
            {isAuthenticated &&
              navLinks.map((link, index) => (
                <li className="nav-item" key={index}>
                  <NavLink
                    className="nav-link nav-link-animated"
                    to={link.to}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}

            {/* Authentication buttons */}
            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-primary ms-3 rounded-pill"
                    onClick={() => {
                      closeMenu();
                      navigate("/signup");
                    }}
                  >
                    Signup
                  </button>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-primary ms-3 rounded-pill"
                    onClick={() => {
                      closeMenu();
                      navigate("/login");
                    }}
                  >
                    Login
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  className="btn btn-danger ms-2 rounded-pill"
                  onClick={() => {
                    closeMenu();
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* styles */}
      <style>{`
        .logo-img {
          width: 100px;
          height: 50px;
          transition: transform 0.3s ease;
        }

        .logo-img:hover {
          transform: scale(1.1);
        }

        .nav-link-animated {
          position: relative;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .nav-link-animated::after {
          content: '';
          position: absolute;
          width: 0%;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: #000;
          transition: width 0.3s ease-in-out;
        }

        .nav-link-animated:hover::after {
          width: 100%;
        }

        .nav-link-animated:hover {
          color: #007bff;
        }

        .custom-navbar {
          transition: all 0.4s ease;
        }

        @media (max-width: 991px) {
          .navbar-collapse {
            transition: all 0.4s ease-in-out;
          }
        }
      `}</style>
    </nav>
  );
}
