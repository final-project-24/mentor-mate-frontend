import React, { useState } from "react";
import { useAuthContext } from "../../../store/authentication-context/AuthenticationContext";
import StripePayment from "../stripe-payment/StripePayment";
import PayPalPayment from "../paypal-payment/PayPalPayment";
import "./Payment.css";

const Payment = ({ bookingId, amount, offerDetails }) => {
  const { user } = useAuthContext();
  const [isAgreed, setIsAgreed] = useState(false);
  const [stripePending, setStripePending] = useState(false);
  const [paypalPending, setPayPalPending] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsAgreed(event.target.checked);
  };

  const handlePaymentSuccess = () => {
    console.log("Payment successful for booking ID:", bookingId);
    // Optionally update booking status on success
    // Example: updateBookingStatus(bookingId, true);
  };

  const handlePaymentError = () => {
    console.error("Payment failed.");
  };

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="payment-container">
      <h2 className="payment-title">Payment Details</h2>

      {/* Payment Offer Details */}
      <div className="offer-details">
        <h3>{offerDetails?.title || "No Title"}</h3>
        <p>{offerDetails?.description || "No Description"}</p>
        <div className="offer-price">
          <span>Amount: $45 </span>
          {/* <strong>${(amount / 100).toFixed(2)}</strong> */}
        </div>
      </div>

      {/* Mentee Information */}
      <div className="mentee-details">
        <h4>Mentee Information</h4>
        <p>Name: {user.userName || "No Name"}</p>
        <p>Email: {user.email || "No Email"}</p>
      </div>

      {/* Terms and Conditions */}
      <div className="terms-conditions-section">
        <p className="instructions">
          Before proceeding with the payment, please review and accept our{" "}
          <a href="/terms" className="terms-link">Terms and Conditions</a>.
        </p>
        <label className="terms-checkbox">
          <input
            type="checkbox"
            checked={isAgreed}
            onChange={handleCheckboxChange}
          />
          I agree to the Terms and Conditions
        </label>
      </div>

      {/* Conditionally Render Payment Options */}
      {isAgreed && (
        <div className="payment-methods-section">
          <h3 className="payment-methods-title">Select Your Payment Method</h3>
          <div className="stripe-payment-section">
            <h4>Pay with Stripe</h4>
            {stripePending ? (
              <p>Processing Stripe payment...</p>
            ) : (
              <StripePayment
                bookingId={bookingId}
                amount={amount}
                onPaymentStart={() => setStripePending(true)}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
              />
            )}
          </div>

          <div className="paypal-payment-section">
            <h4>Pay with PayPal</h4>
            {paypalPending ? (
              <p>Processing PayPal payment...</p>
            ) : (
              <PayPalPayment
                bookingId={bookingId}
                amount={amount}
                onPaymentStart={() => setPayPalPending(true)}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
