import React, { useState } from "react";
import "./PaymentPage.css";

const PaymentPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const validateInput = () => {
    const nameRegex = /^[a-zA-Z ]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const canadaPostalCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    const usZipCodeRegex = /^\d{5}(-\d{4})?$/;
    const phoneNumberRegex = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
    const masterCardRegex = /^5[1-5][0-9]{14}$/;
    const visaRegex = /^4[0-9]{15}$/;
    const amexRegex = /^3[47][0-9]{13}$/;

    if (
      !nameRegex.test(firstName) ||
      !nameRegex.test(lastName) ||
      !nameRegex.test(cardName)
    ) {
      alert("Names must not contain special characters or numbers.");
      return false;
    }
    if (country === "Canada" && !canadaPostalCodeRegex.test(postalCode)) {
      alert("Invalid Canadian postal code.");
      return false;
    }
    if (country === "USA" && !usZipCodeRegex.test(postalCode)) {
      alert("Invalid US zip code.");
      return false;
    }
    if (
      (country === "USA" || country === "Canada") &&
      !phoneNumberRegex.test(phoneNumber)
    ) {
      alert("Invalid phone number.");
      return false;
    }
    if (!emailRegex.test(email)) {
      alert("Invalid email address.");
      return false;
    }
    if (
      !masterCardRegex.test(cardNumber) &&
      !visaRegex.test(cardNumber) &&
      !amexRegex.test(cardNumber)
    ) {
      alert("Invalid credit card number.");
      return false;
    }
    if (!expiryDate.match(/^(0[1-9]|1[0-2])\/20(1[6-9]|2[0-3])$/)) {
      alert("Invalid expiry date. Use MM/YYYY format.");
      return false;
    }
    if (
      (amexRegex.test(cardNumber) && cvv.length !== 4) ||
      (!amexRegex.test(cardNumber) && cvv.length !== 3)
    ) {
      alert("Invalid CVV.");
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateInput()) return;

    console.log("Payment Details:", {
      firstName,
      lastName,
      email,
      country,
      postalCode,
      phoneNumber,
      cardNumber,
      cardName,
      expiryDate,
      cvv,
    });
    alert("Payment processing is not implemented.");
  };

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleCardNameChange = (event) => {
    setCardName(event.target.value);
  };

  const handleExpiryDateChange = (event) => {
    setExpiryDate(event.target.value);
  };

  const handleCvvChange = (event) => {
    setCvv(event.target.value);
  };

  return (
    <div className="payment-container">
      <h2>Payment Details</h2>
      <form onSubmit={handleSubmit}>
        {/* Add additional form fields */}
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          >
            <option value="">Select Country</option>
            <option value="Canada">Canada</option>
            <option value="USA">USA</option>
          </select>
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code:</label>
          <input
            type="text"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="cardNumber">Card Number:</label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1111 2222 3333 4444"
            maxLength="19"
            required
          />
        </div>
        <div>
          <label htmlFor="cardName">Cardholder Name:</label>
          <input
            type="text"
            id="cardName"
            value={cardName}
            onChange={handleCardNameChange}
            placeholder="Name on Card"
            required
          />
        </div>
        <div>
          <label htmlFor="expiryDate">Expiry Date:</label>
          <input
            type="text"
            id="expiryDate"
            value={expiryDate}
            onChange={handleExpiryDateChange}
            placeholder="MM/YY"
            maxLength="5"
            required
          />
        </div>
        <div>
          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            value={cvv}
            onChange={handleCvvChange}
            placeholder="CVV"
            maxLength="3"
            required
          />
        </div>
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default PaymentPage;
