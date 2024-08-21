import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../../store/booking-context/BookingContext";
import { useContext } from "react";
import { LanguageContext } from "../../store/language-context/LanguageContext";
// import terms from "../../assets/data/terms.json";
import "./Terms.css";
import Layout from "../../components/layout/Layout";

const Terms = () => {
  const { termsData } = useContext(LanguageContext); // Use the language context
  const { bookingId, isAgreed, setIsAgreed } = useBookingContext(); // Use the booking context
  const [isChecked, setIsChecked] = useState(isAgreed); // Use the isAgreed state from the context
  const navigate = useNavigate();

  useEffect(() => {
    setIsChecked(isAgreed);
  }, [isAgreed]);

  const handleCheckboxChange = () => {
    const newCheckedStatus = !isChecked;
    setIsChecked(newCheckedStatus);
    setIsAgreed(newCheckedStatus);
    if (newCheckedStatus) {
      if (bookingId) {
        navigate(`/booking/${bookingId}`, { state: { agreed: true } });
      } else {
        console.error("Booking ID not found in context");
      }
    }
  };

  const handleGoBack = () => {
    if (bookingId) {
      navigate(`/booking/${bookingId}`, { state: { agreed: isChecked } });
    } else {
      console.error("Booking ID not found in context");
    }
  };

  return (
    <Layout>
      <div className="flex-container">
        <h1>Terms and Conditions</h1>
        <p className="terms">{termsData.terms}</p>
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          I agree to the terms and conditions
        </label>
        <button onClick={handleGoBack}>Go Back</button>
      </div>
    </Layout>
  );
};

export default Terms;
