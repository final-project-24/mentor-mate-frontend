import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../../store/booking-context/BookingContext";
import { useLanguageContext } from "../../store/language-context/LanguageContext";
// import terms from "../../assets/data/terms.json";
import "./Terms.css";
import Layout from "../../components/layout/Layout";

const Terms = () => {
  const { termsData } = useLanguageContext(); // Use the language context
  const { bookingId, isAgreed, setIsAgreed } = useBookingContext(); // Use the booking context
  const navigate = useNavigate();

  useEffect(() => {
    setIsAgreed(isAgreed); // Sync the context state with local state
  }, [isAgreed, setIsAgreed]);

  const handleGoBack = () => {
    // Navigate to the payment page instead of the booking page
    // navigate('/payment', { state: { agreed: isChecked } });
    navigate('/booking/' + bookingId);
  };

  return (
    <Layout>
      <div className="terms-container mt-[80px] mb-[200px] h-full">
        <h1 className="terms-title">Terms and Conditions</h1>
        <p className="terms-text">
          By agreeing to these terms, you acknowledge and accept the following conditions:
          <br /><br />
          <strong className="text-accent">1. Cancellation by Mentor:</strong>
          <br />
          If the mentor needs to cancel a scheduled session, you will receive a credit equivalent to the value of the session. This credit can be used to reschedule the session at a time that suits you. The credit will be applied automatically to your account.
          <br /><br />
          <strong className="text-accent">2. Cancellation by Mentee:</strong>
          <br />
          Please note that all payments are non-refundable. If you choose to cancel a session, no refund will be issued due to our non-refundable policy. We encourage you to reschedule if you are unable to attend the scheduled session.
          <br /><br />
          <strong className="text-accent">3. Rescheduling:</strong>
          <br />
          To reschedule a session, please provide at least 24 hours’ notice. For cancellation or rescheduling requests, please contact our support team as soon as possible.
          <br /><br />
          <strong className="text-accent">4. Support:</strong>
          <br />
          For any questions or concerns about your session or our cancellation policy, please reach out to our support team at <a href="mailto:support@example.com">support@example.com</a>.
          <br /><br />
          By agreeing to these terms, you confirm that you have read, understood, and accept these conditions.
        </p>
        <button className="terms-button" onClick={handleGoBack}>Go Back</button>
      </div>
    </Layout>
  );
};

export default Terms;

