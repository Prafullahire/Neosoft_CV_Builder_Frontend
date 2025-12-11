import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form } from "react-bootstrap";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import "../../styles/Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    if (!username.trim()) {
      toast.error("Username is required");
      return false;
    }

    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.error("Please enter a valid email");
      return false;
    }

    if (!password) {
      toast.error("Password is required");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        {
          username: username.trim(),
          email: email.trim(),
          password,
          contactNumber: contactNumber.trim() || undefined,
        },
        config
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/dashboard");
    } catch (error) {
      const err = error.response?.data;
      if (err?.errors?.length > 0) {
        err.errors.forEach((e) => toast.error(e.message));
      } else if (err?.message) {
        toast.error(err.message);
      } else {
        toast.error("Registration failed. Try again!");
      }
    }
  };

  const googleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/google`,
        { tokenId: credential }
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/dashboard");
    } catch (error) {
      toast.error("Google Signup Failed");
    }
  };

  return (
    <div className="auth-main">
      <div className="auth-box">
        <div className="auth-left">
          <div className="image-area">
            <span className="placeholder-img">🖼️</span>
          </div>
        </div>

        <div className="auth-right">
          <h2 className="auth-title mb-2">Create Account</h2>
          <p className="auth-subtitle mb-4">
            Register to continue accessing your dashboard
          </p>

          <Form onSubmit={submitHandler}>
            <div className="input-group-custom mb-3">
              <input
                type="text"
                placeholder="Full Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <i className="input-icon">👤</i>
            </div>

            <div className="input-group-custom mb-3">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <i className="input-icon">📧</i>
            </div>

            <div className="input-group-custom mb-3">
              <input
                type="text"
                placeholder="Contact number (optional)"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
              <i className="input-icon">📱</i>
            </div>

            <div className="input-group-custom mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                className="input-icon"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🔒" : "👁️"}
              </i>
            </div>

            <button type="submit" className="auth-btn">
              Register
            </button>
          </Form>

          <div className="mt-3">
            <GoogleLogin
              onSuccess={googleSuccess}
              onError={() => toast.error("Google sign-in failed")}
              text="signup_with"
            />
          </div>

          <p className="mt-4 register-small-text">
            Already have an account?{" "}
            <Link to="/login" className="forgot">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
