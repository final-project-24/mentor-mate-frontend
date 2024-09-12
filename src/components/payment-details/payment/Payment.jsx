import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { useAuthContext } from "../../../store/authentication-context/AuthenticationContext";
import StripePayment from "../stripe-payment/StripePayment";
import "./Payment.css";

const Payment = ({ bookingId, offerDetails }) => {
  const { user } = useAuthContext();
  const [isAgreed, setIsAgreed] = useState(false);
  const [stripePending, setStripePending] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // State to store payment status
  const [redirect, setRedirect] = useState(false); // State to control redirect timing
  const [isFreeSlot, setIsFreeSlot] = useState(false); // State to manage free slot condition
  const navigate = useNavigate();

  // Destructure offerDetails
  const {
    title = "No Title",
    description = "No Description",
    start,
    end,
    price,
    selectedSkill = [],
  } = offerDetails || {};

  // Format the amount
  const amount = isFreeSlot ? 0 : price * 100; // Convert dollars to cents

  const handleCheckboxChange = (event) => {
    setIsAgreed(event.target.checked);
  };

  const handleFreeSlotClick = () => {
    setIsFreeSlot(!isFreeSlot); // Toggle the free slot condition
  };

  useEffect(() => {
    if (redirect) {
      // Perform the redirect after delay
      const timer = setTimeout(() => {
        navigate("/dashboard/session"); // Redirect to session page
      }, 6000);

      return () => clearTimeout(timer); // Cleanup on component unmount
    }
  }, [redirect, navigate]);

  const handlePaymentCompletion = (status) => {
    console.log("Payment status:", status);
    setPaymentStatus(status); // Set payment status ("success" or "error")
    setStripePending(false); // Stop showing the loading state
    if (status === "success") {
      setRedirect(true); // Trigger redirect if successful
    }
  };

  const handlePaymentSuccess = () => {
    console.log("Payment successful for booking ID:", bookingId);
    handlePaymentCompletion("success");
  };

  const handlePaymentError = () => {
    console.error("Payment failed.");
    handlePaymentCompletion("error");
  };

  return (
    <div className="payment-container mb-[100px]">
      {stripePending}

      {/* Debugging: Render paymentStatus directly */}
      {/* {paymentStatus === "success" && (
        <p className="status-message success">
          Payment was successful! Redirecting to your session page...
        </p>
      )}

      {paymentStatus === "error" && (
        <p className="status-message error">
          Payment failed. Please try again or contact support.
        </p>
      )} */}

      {!paymentStatus && !stripePending && (
        <>
          <h2 className="payment-title mt-5">Payment Details</h2>

          <div className="offer-details">
            <h3>{title}</h3>
            <div className="offer-price">
              <span>Amount: </span>
              <strong>${(amount / 100).toFixed(2)}</strong>
            </div>
            <div className="offer-start-end">
              <p>Start: {new Date(start).toLocaleString()}</p>
              <p>End: {new Date(end).toLocaleString()}</p>
            </div>
            <div className="offer-selected-skill">
              <p>Selected Skill: {selectedSkill[0].protoSkillTitle}</p>
              <p>Description: {selectedSkill[0].protoSkillDescription}</p>
            </div>
          </div>

          <div className="mentee-details">
            <h4>Mentee Information</h4>
            <p>Name: {user.userName}</p>
            <p>Email: {user.email}</p>
          </div>

          {!isFreeSlot && (
            <div className="terms-conditions-section">
              <p className="instructions">
                Before proceeding with the payment, please review and accept our{" "}
                <Link to="/terms#top" className="terms-link">
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
          )}

          {isAgreed && (
            <div className="payment-methods-section">
              <h3 className="payment-methods-title">
                Select Your Payment Method
              </h3>
              <h6>IMPORTANT: If you have a free spot token, please scroll down the page and click the appropriate button to select your free slot.</h6><br />
              

              {/* Stripe Payment Integration */}
              <div className="stripe-payment-section">
                <h4>Pay with Stripe</h4>
                <h5>
                  If your payment is successful, you'll be redirected to your
                  session page. There, you'll find a link to join your meeting
                  with the mentor!
                </h5>
                <StripePayment
                  bookingId={bookingId}
                  amount={amount}
                  isFreeSlot={isFreeSlot}
                  onPaymentStart={() => setStripePending(true)}
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={handlePaymentError}
                  onPaymentEnd={() => setStripePending(false)}
                />
              </div>
              <div className="free-slot-section">
            <p className="instructions">
              This is a free slot. Click below to proceed without payment.
            </p>
            <button
              className={`free-slot-button ${isFreeSlot ? 'selected' : ''}`}
              onClick={handleFreeSlotClick}
            >
              {isFreeSlot ? 'Free Slot Selected' : 'Select Free Slot'}
            </button>
          </div>
            </div>
            
          )}
        </>
      )}
    </div>
  );
};

export default Payment;


