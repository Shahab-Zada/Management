import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CS from "../Assets/CS.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submissionData = new FormData();
      submissionData.append("name", formData.name);
      submissionData.append("email", formData.email);
      submissionData.append("password", formData.password);
      submissionData.append("role", formData.role);
      if (formData.file) {
        submissionData.append("file", formData.file);
      }

      const response = await fetch("https://management-production-4dab.up.railway.app/api/auth/register", {
        method: "POST",
        body: submissionData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong!");
      }

      toast.success("🎉 Registration successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 px-2">
      <ToastContainer position="top-right" autoClose={2000} />

      <div
        className="row w-100 shadow-lg"
        style={{
          maxWidth: "1000px",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        {/* Image section */}
        <div className="col-12 col-md-6 p-0">
          <div className="h-100 w-100 d-flex align-items-center justify-content-center bg-light">
            <img
              src={CS}
              alt="Sign Up Illustration"
              className="img-fluid"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                minHeight: "250px",
              }}
            />
          </div>
        </div>

        {/* Form section */}
        <div className="col-12 col-md-6 p-4 bg-white d-flex flex-column justify-content-center">
          <div className="text-center mb-3">
         
            <h1 className="h5 fw-bold mb-0 text-primary">
              FYP MANAGEMENT SYSTEM
            </h1>
          </div>

          <h2 className="h6 text-muted mb-3 text-center">Create an Account</h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-group mb-2">
              <label className="fw-semibold">Full Name</label>
              <input
                type="text"
                className="form-control rounded-pill shadow-sm"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group mb-2">
              <label className="fw-semibold">Email Address</label>
              <input
                type="email"
                className="form-control rounded-pill shadow-sm"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group mb-2">
              <label className="fw-semibold">Password</label>
              <input
                type="password"
                className="form-control rounded-pill shadow-sm"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter password"
              />
            </div>

            <div className="form-group mb-2">
              <label className="fw-semibold">Role</label>
              <select
                className="form-control rounded-pill shadow-sm"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select role
                </option>
                <option value="admin">Admin</option>
                <option value="faculty">Faculty</option>
                <option value="student">Student</option>
              </select>
            </div>

            <div className="form-group mb-3">
              <label className="fw-semibold">Upload File</label>
              <input
                type="file"
                className="form-control rounded-pill shadow-sm"
                name="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 rounded-pill fw-bold shadow"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>

            <div className="text-center mt-2">
              <small>
                Already have an account?{" "}
                <NavLink
                  to="/login"
                  className="text-decoration-none text-primary"
                >
                  Login
                </NavLink>
              </small>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
