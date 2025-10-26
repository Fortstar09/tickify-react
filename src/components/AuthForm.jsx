import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Toast from "./Toast";

const AuthForm = ({ type }) => {
  const { signup, login } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // --- Simple client-side validation ---
  const validate = () => {
    const newErrors = {};

    if (type === "sign-up" && formData.fullname.trim().length < 2) {
      newErrors.fullname = "Username must be at least 2 characters";
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Handle form submission ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setMessage("");

    if (type === "sign-up") {
      const result = signup({
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
      });

      setIsLoading(false);

      if (result.success) {
        setMessage("✅ Account created successfully!");
        setTimeout(() => navigate("/signin"), 1200);
      } else {
        setMessage(`❌ ${result.message}`);
      }
    } else {
      const result = login({
        email: formData.email,
        password: formData.password,
      });

      setIsLoading(false);

      if (result.success) {
        setMessage("✅ Login successful!");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setMessage(`❌ ${result.message}`);
      }
    }
  };

  // --- Handle input change ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full max-w-sm flex flex-col gap-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-semibold">
          {type === "sign-in" ? "Welcome Back" : "Create an Account"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {type === "sign-up" && (
          <div>
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="fullname"
              placeholder="Enter your fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>
            )}
          </div>
        )}

        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {isLoading
            ? "Loading..."
            : type === "sign-in"
            ? "Sign In"
            : "Create Account"}
        </button>
      </form>

      <div className="text-center mt-4 text-gray-600">
        {type === "sign-in"
          ? "Don’t have an account? "
          : "Already have an account? "}
        <Link
          to={type === "sign-in" ? "/signup" : "/signin"}
          className="text-blue-600 hover:underline"
        >
          {type === "sign-in" ? "Sign Up" : "Sign In"}
        </Link>
      </div>
      {message && (
        <Toast message={message} onClose={() => setMessage("")} />
      )}
    </div>
  );
};

export default AuthForm;
