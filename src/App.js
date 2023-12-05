import React, { useState } from "react";
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";
import BookAppointment from "./BookAppointment";
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
      case "login":
        return <LoginPage onRegisterClick={() => navigateTo("register")} />;
      case "register":
        return <RegistrationPage onLoginClick={() => navigateTo("login")} />;
      case "bookAppointment":
        return <BookAppointment onPaymentClick={() => navigateTo("payment")} />;
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

  return (
    <div className="App">
      {renderPage()}
      {/* Navigation buttons */}
      {currentPage !== "home" && (
        <button onClick={() => navigateTo("home")}>Back to Home</button>
      )}
      {currentPage !== "payment" && currentPage !== "home" && (
        <p>
          {currentPage === "bookAppointment"
            ? "Ready to proceed to payment? "
            : "Want to book a car service appointment? "}
          <button
            onClick={() =>
              navigateTo(
                currentPage === "bookAppointment"
                  ? "payment"
                  : "bookAppointment"
              )
            }
          >
            {currentPage === "bookAppointment"
              ? "Proceed to Payment"
              : "Book Appointment"}
          </button>
        </p>
      )}
    </div>
  );
}

export default App;
