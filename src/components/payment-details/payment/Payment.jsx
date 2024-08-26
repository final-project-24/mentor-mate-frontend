import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useAuthContext } from "../../store/authentication-context/AuthenticationContext";
import {
  createStripePaymentIntent,
  createPayPalOrder,
} from "../../../utils/api-connector"; // addedd
import "./Payment.css";
import StripePayment from "../stripe-payment/StripePayment";
import PayPalPayment from "../paypal-payment/PayPalPayment";

// comentedd
// const Payment = ({ amount, offerDetails = {}, menteeData = {} }) => {
// addedd
// const Payment = ({ bookingId }) => {
const Payment = ({ bookingId, menteeData, amount, offerDetails }) => {
  console.log("bookingId:", bookingId); // addedd
  console.log("amount:", amount); // addedd
  console.log("offerDetails:", offerDetails); // addedd
  // console.log("menteeData:", menteeData); // addedd
  // const { user, loading: authLoading } = useAuthContext();
  const [isAgreed, setIsAgreed] = useState(false);
  const [stripePending, setStripePending] = useState(false);
  const [paypalPending, setPayPalPending] = useState(false);
  const navigate = useNavigate();

  // comentedd
  const { title = "No Title", description = "No Description" } = offerDetails;
  // const { menteeName = "Mentee", menteeEmail = "" } = menteeData;

  const handleCheckboxChange = (event) => {
    setIsAgreed(event.target.checked);
  };

  const handlePaymentSuccess = () => {
    // console.log("Payment successful for:", menteeName, menteeEmail); // comentedd
    console.log("Payment successful for booking ID:", bookingId); // addedd
    navigate("/session-page"); // Redirect to the session page after payment success
  };

  const handlePaymentError = () => {
    console.error("Payment failed.");
  };

  // const handleStripePaymentStart = () => {
  //   setStripePending(true);
  // }; // comentedd
  const handleStripePaymentStart = async () => {
    setStripePending(true);
    try {
      const { clientSecret } = await createStripePaymentIntent(bookingId);
      // Pass clientSecret to StripePayment component
    } catch (error) {
      handlePaymentError();
    } finally {
      setStripePending(false);
    }
  }; // addedd

  // const handlePayPalPaymentStart = () => {
  //   setPayPalPending(true);
  // }; // comentedd

  const handlePayPalPaymentStart = async () => {
    setPayPalPending(true);
    try {
      const { orderId } = await createPayPalOrder(bookingId);
      // Pass orderId to PayPalPayment component
    } catch (error) {
      handlePaymentError();
    } finally {
      setPayPalPending(false);
    }
  }; // addedd

  // const handleStripePaymentEnd = () => {
  //   setStripePending(false);
  // }; // comenteddd

  // const handlePayPalPaymentEnd = () => {
  //   setPayPalPending(false);
  // }; // comenteddd

  return (
    <div className="payment-container">
      {(stripePending || paypalPending) && (
        <p className="processing-message">Processing payment...</p>
      )}

      <h2 className="payment-title">Payment Details</h2>

      {/* Payment Offer Details */}
      <div className="offer-details">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="offer-price">
          <span>Amount: </span>
          <strong>${(amount / 100).toFixed(2)}</strong>
        </div>
      </div>

      {/* Mentee Information */}
      <div className="mentee-details">
        <h4>Mentee Information</h4>
        {/* <p>Name: {menteeName}</p> */}
        <p>Name: </p>
        {/* <p>Email: {menteeEmail}</p> */}
        <p>Email: </p>
      </div>

      {/* Instructions and Terms and Conditions Link */}
      <div className="terms-conditions-section">
        <p className="instructions">
          Before proceeding with the payment, please review and accept our{" "}
          <Link to="/terms" className="terms-link">
            Terms and Conditions
          </Link>
          .
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

          {/* Stripe Payment Integration */}
          <div className="stripe-payment-section">
            <h4>Pay with Stripe</h4>
            {stripePending ? (
              <p>Processing Stripe payment...</p>
            ) : (
              // <StripePayment
              //   amount={amount}
              //   onPaymentStart={handleStripePaymentStart}
              //   onPaymentSuccess={() => {
              //     handlePaymentSuccess();
              //     handleStripePaymentEnd();
              //   }}
              //   onPaymentError={() => {
              //     handlePaymentError();
              //     handleStripePaymentEnd();
              //   }}
              // /> // comenteddd

              <StripePayment
                bookingId={bookingId}
                amount={amount}
                onPaymentStart={handleStripePaymentStart}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
              /> // addeddd
            )}
          </div>

          {/* PayPal Payment Integration */}
          <div className="paypal-payment-section">
            <h4>Pay with PayPal</h4>
            {paypalPending ? (
              <p>Processing PayPal payment...</p>
            ) : (
              // <PayPalPayment
              //   amount={amount}
              //   onPaymentStart={handlePayPalPaymentStart}
              //   onPaymentSuccess={() => {
              //     handlePaymentSuccess();
              //     handlePayPalPaymentEnd();
              //   }}
              //   onPaymentError={() => {
              //     handlePaymentError();
              //     handlePayPalPaymentEnd();
              //   }}
              // /> // comenteddd
              <PayPalPayment
                bookingId={bookingId}
                amount={amount}
                onPaymentStart={handlePayPalPaymentStart}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
              /> // addeddd
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
