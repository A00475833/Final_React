import React, { useState } from "react";
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";
import PaymentPage from "./PaymentPage";
import HomePage from "./HomePage";
import BookAppointment from "./BookAppointment"; // Make sure to import BookAppointment

function App() {
  // Set 'bookAppointment' as the initial page
  const [currentPage, setCurrentPage] = useState("bookAppointment");

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
            onHomeClick={() => navigateTo("home")}
          />
        );
      case "login":
        return <LoginPage onRegisterClick={() => navigateTo("register")} />;
      case "payment":
        return <PaymentPage />;
      case "bookAppointment": // Add this case
        return <BookAppointment />;
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
