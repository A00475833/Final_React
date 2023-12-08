import React, { useState, useEffect } from "react";
import "./BookAppointment.css";
import cookie from "js-cookie";

const BookAppointment = () => {
  const [serviceType, setServiceType] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [email, setEmail] = useState(""); // State to store the email
  const [error, setError] = useState("");

  useEffect(() => {
    const userEmail = cookie.get("email"); // Retrieve the email from the cookie
    setEmail(userEmail); // Set the email in the state
  }, []);

  const handleServiceTypeChange = (event) => {
    setServiceType(event.target.value);
  };

  const handleDateChange = (event) => {
    setAppointmentDate(event.target.value);
    setError(""); // Clear error message when date changes
  };

  const handleCheckInTimeChange = (event) => {
    setCheckInTime(event.target.value);
    setError(""); // Clear error message when time changes
  };

  const handleCheckOutTimeChange = (event) => {
    setCheckOutTime(event.target.value);
    setError(""); // Clear error message when time changes
  };

  const validateTimes = () => {
    if (appointmentDate && checkInTime && checkOutTime) {
      const startTime = new Date(appointmentDate + " " + checkInTime);
      const endTime = new Date(appointmentDate + " " + checkOutTime);
      return endTime > startTime;
    }
    return false;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateTimes()) {
      setError("Check-out time must be later than check-in time.");
      return;
    }

    console.log("Booking Details:", {
      serviceType,
      appointmentDate,
      checkInTime,
      checkOutTime,
    });

    // Add logic to send data to your backend or other processing
    setError(""); // Clear any previous error
  };

  return (
    <div className="appointment-container">
      <h2>Book Your Car Service Appointment</h2>
      {email && <p>Logged in as: {email}</p>} {/* Display the email */}
      <form onSubmit={handleSubmit}>
        {/* Form fields and submit button */}
        <label htmlFor="serviceType">Service Type:</label>
        <select
          id="serviceType"
          value={serviceType}
          onChange={handleServiceTypeChange}
          required
        >
          <option value="">Select a Service</option>
          <option value="oil-change">Oil Change</option>
          <option value="tire-rotation">Tire Rotation</option>
          <option value="general-inspection">General Inspection</option>
        </select>

        <label htmlFor="appointmentDate">Date:</label>
        <input
          type="date"
          id="appointmentDate"
          value={appointmentDate}
          onChange={handleDateChange}
          required
        />

        <label htmlFor="checkInTime">Check-In Time:</label>
        <input
          type="time"
          id="checkInTime"
          value={checkInTime}
          onChange={handleCheckInTimeChange}
          required
        />

        <label htmlFor="checkOutTime">Check-Out Time:</label>
        <input
          type="time"
          id="checkOutTime"
          value={checkOutTime}
          onChange={handleCheckOutTimeChange}
          required
        />

        {error && <div className="error-message">{error}</div>}

        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default BookAppointment;
