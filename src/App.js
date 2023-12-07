import React, { useState } from "react";
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";
import PaymentPage from "./PaymentPage";
import HomePage from "./HomePage";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage
            onLoginClick={() => navigateTo("login")}
            onRegisterClick={() => navigateTo("register")}
          />
        );
      case "register":
        return (
          <RegistrationPage
            onLoginClick={() => navigateTo("login")}
            onRegistrationSuccess={() => navigateTo("bookAppointment")}
            onHomeClick={() => navigateTo("home")} // Pass navigateTo function as a prop
          />
        );
      case "login":
        return <LoginPage onRegisterClick={() => navigateTo("register")} />;
      case "payment":
        return <PaymentPage />;
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
