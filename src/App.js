import React, { useState, useEffect } from "react";
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";
import PaymentPage from "./PaymentPage";
import HomePage from "./HomePage";
import cookie from "js-cookie";
import BookAppointment from "./BookAppointment";
import ConfirmedPage from "./ConfirmPage";


function App() {
  const [currentPage, setCurrentPage] = useState("bookAppointment");

  const checkLoggedIn = () => {
    return cookie.get("email") ? true : false;
  };

  const onLogout = () => {
    cookie.remove("email"); // Clear the cookie on logout
    setCurrentPage("home"); // Navigate to home after logout
  };

  const onHomeClick = () => {
    setCurrentPage("home"); // Navigate to the home page
  };

  const navigateTo = (page) => {
    setCurrentPage(page); // Allow direct navigation to any page
  };

  const onLoginSuccess = () => {
    setCurrentPage("bookAppointment");
  };

  useEffect(() => {
    // On initial load, navigate to the appropriate page based on login status
    setCurrentPage(checkLoggedIn() ? "bookAppointment" : "home");
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "bookAppointment":
        return <BookAppointment onLogout={onLogout} />;
      case "payment":
        return <PaymentPage />;
      case "login":
        return (
          <LoginPage
            onRegisterClick={() => navigateTo("register")}
            onLoginSuccess={onLoginSuccess}
          />
        );
      case "register":
        return (
          <RegistrationPage
            onLoginClick={() => navigateTo("login")}
            onRegistrationSuccess={onLoginSuccess}
            onHomeClick={onHomeClick}
          />
        );
      case "home":
      default:
        return (
          <HomePage
            onLoginClick={() => navigateTo("login")}
            onRegisterClick={() => navigateTo("register")}
          />
        );
    }
  };

  return <div className="App">{renderPage()}</div>;
}

export default App;
