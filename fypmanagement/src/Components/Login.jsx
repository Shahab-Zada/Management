import React, { useState } from "react";
import CS from "../Assets/CS.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        const userId = data.studentId || data.teacherId || null;
        if (userId) {
          localStorage.setItem("userId", userId);
        }
        localStorage.setItem("role", data.role);
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", email);

        toast.success("🎉 Login successful!", {
          onClose: () => (window.location.href = "/"),
        });
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (err) {
      toast.error("🚫 Server error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 px-2">
      <ToastContainer position="top-right" autoClose={3000} />

      <div
        className="row w-100 shadow-lg"
        style={{
          maxWidth: "1000px",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        {/* 📸 Image Section */}
        <div className="col-12 col-md-6 p-0">
          <div className="h-100 w-100 d-flex align-items-center justify-content-center bg-light">
            <img
              src={CS}
              alt="Login Illustration"
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

       
        <div className="col-12 col-md-6 p-4 bg-white d-flex flex-column justify-content-center">
          <div className="text-center mb-3">
          
            <h3 className=" fw-bold mb-0 text-primary">
              FYP MANAGEMENT SYSTEM
            </h3>
          </div>

          <h2 className="h6 text-muted mb-3 text-center">Login to your account</h2>

          <form onSubmit={handleLogin}>
            <div className="form-group mb-3">
              <label htmlFor="email" className="fw-semibold">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="form-control rounded-pill shadow-sm"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-4">
              <label htmlFor="password" className="fw-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control rounded-pill shadow-sm"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 rounded-pill fw-bold shadow"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="text-center mt-3">
              <small>
                Don't have an account?{" "}
                <a href="/signup" className="text-decoration-none text-primary">
                  Sign up
                </a>
              </small>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
