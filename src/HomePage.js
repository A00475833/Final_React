import React from "react";
import "./HomePage.css";

const HomePage = ({ onLoginClick, onRegisterClick }) => {
  return (
    <div className="container">
      <h1 className="my-4 text-center">Welcome to Car Service System</h1>

      {}
      <div className="text-center my-4">
        <button className="btn btn-primary mx-2" onClick={onLoginClick}>
          Login
        </button>
        <button className="btn btn-secondary mx-2" onClick={onRegisterClick}>
          Register
        </button>
      </div>

      {}
      <div className="row">
        <div className="col-lg-6">
          <h2>Our Services</h2>
          <p>Describe the services offered by your Car Service System here.</p>
        </div>
        <div className="col-lg-6">
          <h2>Contact Us</h2>
          <p>Provide contact details or a contact form here.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
