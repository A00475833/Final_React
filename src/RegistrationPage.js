import React, { useState } from "react";
import "./RegistrationPage.css";

const RegistrationPage = ({ onLoginClick }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    validateName(newName);
  };

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

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    validateConfirmPassword(newConfirmPassword);
  };

  const validateName = (name) => {
    setNameError(name ? "" : "Name is required");
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

  const validateConfirmPassword = (confirmPassword) => {
    setConfirmPasswordError(
      confirmPassword === password ? "" : "Passwords do not match"
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateName(name);
    validateEmail(email);
    validatePassword(password);
    validateConfirmPassword(confirmPassword);

    if (
      name &&
      email &&
      password &&
      confirmPassword &&
      !nameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError
    ) {
      console.log("User Registered:", {
        name,
        email,
        password,
        confirmPassword,
      });
    } else {
      console.log("Validation errors");
    }
  };

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit}>
        <h2>Register for Car Services</h2>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
          {nameError && <div className="error">{nameError}</div>}
        </div>
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
        <div>
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          {confirmPasswordError && (
            <div className="error">{confirmPasswordError}</div>
          )}
        </div>
        <button type="submit">Register</button> {}
        <p>
          Already have an account?{" "}
          <button type="button" onClick={onLoginClick}>
            Login here
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegistrationPage;
