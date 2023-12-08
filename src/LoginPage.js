import React, { useState } from "react";
import "./LoginPage.css";
import axios from "axios";
import cookie from "js-cookie";
import "./App";

function LoginPage({ onRegisterClick, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const validateEmail = (email) => {
    if (!email) {
      setEmailError("Email is required");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(emailRegex.test(email) ? "" : "Invalid email format");
    }
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError("Password is required");
    } else {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      setPasswordError(
        passwordRegex.test(password)
          ? ""
          : "Password must be at least 8 characters long, contain a number, a lowercase and an uppercase letter."
      );
    }
  };
  const login = async (email, password) => {
    try {
      const response = await axios.post("", {
        email,
        password,
      });
      if (response.data.success) {
        console.log("Success");
        cookie.set("email", email);
        onLoginSuccess();
      } else {
        console.log("Incorrect");
      }
    } catch (error) {
      console.error("Error during API call", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    validateEmail(email);
    validatePassword(password);

    if (email && password && !emailError && !passwordError) {
      console.log("Email:", email, "Password:", password);
      await login(email, password);
      // Handle the login logic here
    } else {
      console.log("Validation errors");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login for Car Services</h2>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {emailError && <div className="error">{emailError}</div>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {passwordError && <div className="error">{passwordError}</div>}
        </div>
        <button type="submit">Login</button>
        <p>
          Don't have an account?{" "}
          <button type="button" onClick={onRegisterClick}>
            Register here
          </button>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
