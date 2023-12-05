import React, { useState } from "react";
import "./BookAppointment.css";

const BookAppointment = ({ user }) => {
  const [serviceType, setServiceType] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const handleServiceTypeChange = (event) => {
    setServiceType(event.target.value);
  };

  const handleDateChange = (event) => {
    setAppointmentDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setAppointmentTime(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Booking Details:", {
      serviceType,
      appointmentDate,
      appointmentTime,
    });
  };

  return (
    <div className="appointment-container">
      <h2>Book Your Car Service Appointment</h2>
      <form onSubmit={handleSubmit}>
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

        <label htmlFor="appointmentTime">Time:</label>
        <input
          type="time"
          id="appointmentTime"
          value={appointmentTime}
          onChange={handleTimeChange}
          required
        />

        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default BookAppointment;
