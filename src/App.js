import React, { useState, useEffect } from "react";
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";
import PaymentPage from "./PaymentPage";
import HomePage from "./HomePage";
import cookie from "js-cookie";
import BookAppointment from "./BookAppointment";

function App() {
  //Navi
  const [currentPage, setCurrentPage] = useState("home");

  const checkLoggedIn = () => {
    return cookie.get("email") ? true : false;
  };

  const navigateTo = (page) => {
    if (checkLoggedIn() && (page === "login" || page === "register")) {
      setCurrentPage("bookAppointment");
    } else if (!checkLoggedIn() && page !== "login" && page !== "register") {
      setCurrentPage("home");
    } else {
      setCurrentPage(page);
    }
  };

  const onLoginSuccess = () => {
    setCurrentPage("bookAppointment");
  };

  useEffect(() => {
    if (checkLoggedIn()) {
      setCurrentPage("bookAppointment");
    }
  }, []);

  const renderPage = () => {
    if (checkLoggedIn()) {
      switch (currentPage) {
        case "bookAppointment":
          return <BookAppointment />;
        case "payment":
          return <PaymentPage />;

        default:
          return <BookAppointment />;
      }
    } else {
      switch (currentPage) {
        case "home":
          return (
            <HomePage
              onLoginClick={() => navigateTo("login")}
              onRegisterClick={() => navigateTo("register")}
            />
          );
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
            />
          );
        default:
          return (
            <HomePage
              onLoginClick={() => navigateTo("login")}
              onRegisterClick={() => navigateTo("register")}
            />
          );
      }
    }
  };

  return <div className="App">{renderPage()}</div>;
}

export default App;
