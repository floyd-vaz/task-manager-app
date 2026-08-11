import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import API_URL from "../api";

const LogoMark = () => (
  <svg
    className="fx-logo-mark"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect x="4" y="4" width="56" height="56" rx="14" stroke="currentColor" strokeWidth="2" opacity="0.35" />
    <path
      d="M18 22h28M32 22v28"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <circle cx="32" cy="22" r="4" fill="#2dd4bf" />
    <path
      d="M20 38h10M34 46h14"
      stroke="#2dd4bf"
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.9"
    />
  </svg>
);

const RegisterPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, form);
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="futuristic-bg flex items-center justify-center">
      <div className="futuristic-shell">
        <form className="futuristic-card" onSubmit={handleSubmit}>
          <div className="fx-logo">
            <LogoMark />
            <div className="fx-logo-wordmark">
              Task<span>Manager</span>
            </div>
          </div>

          <h2 className="fx-heading">Create Account</h2>

          {error && <p className="fx-error">{error}</p>}

          <div className="fx-field">
            <label htmlFor="register-name">Name</label>
            <input
              id="register-name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="glowing-input"
              placeholder="Your name"
              required
              autoComplete="name"
            />
          </div>

          <div className="fx-field">
            <label htmlFor="register-email">Email</label>
            <input
              id="register-email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="glowing-input"
              placeholder="you@email.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="fx-field">
            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="glowing-input"
              placeholder="••••••••"
              required
              autoComplete="new-password"
            />
          </div>

          <button type="submit" disabled={loading} className="futuristic-button">
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="fx-footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
