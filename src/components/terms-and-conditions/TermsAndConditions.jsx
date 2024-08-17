import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useBookingContext } from "../../store/booking-context/BookingContext";
import "./TermsAndConditions.css";

const TermsAndConditions = ({ onAgree }) => {
  const { bookingId, isAgreed, setIsAgreed } = useBookingContext(); // Use the booking context
  const [isChecked, setIsChecked] = useState(isAgreed); // Use the isAgreed state from the context
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.agreed) {
      setIsChecked(true);
      setIsAgreed(true);
      onAgree(true);
    }
    // }, [location.state, onAgree, setIsAgreed]);
  }, []); // u can't uncheck the checkbox if you use the above line

  const handleCheckboxChange = () => {
    const newCheckedStatus = !isChecked;
    setIsChecked(newCheckedStatus);
    setIsAgreed(newCheckedStatus);
    onAgree(newCheckedStatus);
  };

  const handleReadTerms = () => {
    if (bookingId) {
      navigate(`/terms?id=${bookingId}`);
    } else {
      console.error("Booking ID not found in context");
    }
  };

  return (
    <div className="terms-container">
      <button onClick={handleReadTerms}>Read the terms and conditions</button>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        I agree to the terms and conditions
      </label>
    </div>
  );
};

export default TermsAndConditions;
