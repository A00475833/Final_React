import React, { useState } from "react";
import "./RegistrationPage.css";
import cookie from "js-cookie";

const registrationpage_url ='https://localhost:7278/api/Registration';  //stores the registration api url from .net core app

const RegistrationPage = ({
  onLoginClick,
  onRegistrationSuccess,
  onHomeClick,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNoError, setPhoneNoError] = useState("");

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePhoneNoChange = (event) => {
    const newPhoneNo = event.target.value;
    setPhoneNo(newPhoneNo);
    validatePhoneNo(newPhoneNo);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
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

  const validatePhoneNo = (phoneNo) => {
    const phoneNoRegex = /^[0-9]+$/;
    setPhoneNoError(
      phoneNoRegex.test(phoneNo) ? "" : "Phone number must be numeric"
    );
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
    validateEmail(email);
    validatePhoneNo(phoneNo);
    validatePassword(password);
    validateConfirmPassword(confirmPassword);

    if (
      firstName &&
      lastName &&
      phoneNo &&
      userName &&
      address &&
      email &&
      password &&
      confirmPassword &&
      !phoneNoError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError
    ) {
      console.log("User Registered:", {
        email,
        password,
        confirmPassword,
      });
      const userData = {
        FirstName: firstName,
        LastName: lastName,
        UserName: userName,
        Email: email,
        PhoneNo: phoneNo,
        Address: address,
        Password: password,
      };
      fetch(registrationpage_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          cookie.set("email", email);
          onRegistrationSuccess();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.log("Validation errors");
      alert("Please Enter Correct Value!");
    }
  };

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit}>
        <h2>Register for Car Services</h2>
        <div>
          <label htmlFor="first-name">First Name:</label>
          <input
            type="text"
            id="first-name"
            value={firstName}
            onChange={handleFirstNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="last-name">Last Name:</label>
          <input
            type="text"
            id="last-name"
            value={lastName}
            onChange={handleLastNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="user-name">User Name:</label>
          <input
            type="text"
            id="user-name"
            value={userName}
            onChange={handleUserNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone-no">Phone No:</label>
          <input
            type="text"
            id="phone-no"
            value={phoneNo}
            onChange={handlePhoneNoChange}
            required
          />
          {phoneNoError && <div className="error">{phoneNoError}</div>}
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={handleAddressChange}
            required
          />
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
          <button onClick={onHomeClick} className="back-to-home-button">
            Back to Home
          </button>{" "}
          {/* New Back to Home button */}
        </p>
      </form>
    </div>
  );
};

export default RegistrationPage;
