import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import "../../styles/LoginUI.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    if(!email || !password) return toast.error("All fields are required");
    if (!email) return toast.error("Email is required");
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!reg.test(email)) return toast.error("Enter a valid email");
    if (!password) return toast.error("Password is required");
    if (password.length < 6)
      return toast.error("Password must be 6+ characters");
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Login failed";
      toast.error(msg);
    }
  };

  const googleSuccess = async (res) => {
    try {
      const { credential } = res;

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/google`,
        { tokenId: credential },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/dashboard");
    } catch {
      toast.error("Google Login Failed");
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
          <h2 className="auth-title">Login Account</h2>
          <p className="auth-subtitle">
            Welcome back! Please enter your details.
          </p>

          <Form onSubmit={submitHandler} className="mt-3">

            <div className="input-group-custom mb-3">
              <Form.Control
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="input-icon">📧</span>
            </div>

            <div className="input-group-custom mb-2">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="input-icon"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                🔒
              </span>
            </div>

            {/* <div className="text-end mb-3">
              <Link className="forgot">Forget Password?</Link>
            </div> */}

            <Button className="auth-btn" type="submit">
              Login Account
            </Button>

            <div className="text-center mt-3">or</div>

            <div className="d-flex justify-content-center mt-2">
              <GoogleLogin onSuccess={googleSuccess} onError={() => {}} />
            </div>

            <div className="text-center mt-4">
              <p className="mb-2">Don't have an account?</p>
              <Link to="/register" className="auth-outline-btn">
                Create Account
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
