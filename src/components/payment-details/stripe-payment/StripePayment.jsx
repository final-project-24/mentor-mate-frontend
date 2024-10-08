import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { createStripePaymentIntent, confirmFreeSlotBooking } from "../../../utils/api-connector";
import "./StripePayment.css";

const stripePublicKeyId = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

// Initialize Stripe with public key
const stripePromise = loadStripe(stripePublicKeyId);

const StripePayment = ({ bookingId, isFreeSlot, onPaymentSuccess }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const modalRef = useRef(null);

  useEffect(() => {
    // Fetch client secret from backend if not a free slot
    const fetchClientSecret = async () => {
      if (!isFreeSlot) {
        try {
          const response = await createStripePaymentIntent(bookingId);
          setClientSecret(response.clientSecret);
        } catch (error) {
          console.error("Error fetching client secret:", error);
          setError("An error occurred while initializing the payment.");
        }
      }
    };

    fetchClientSecret();
  }, [bookingId, isFreeSlot]);

  const handlePayment = async () => {
    if (isFreeSlot) {
      // If it's a free slot, confirm booking without payment
      try {
        await confirmFreeSlotBooking(bookingId);
        if (onPaymentSuccess) onPaymentSuccess();
        navigate("/session-preview");
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error confirming free slot booking:", error);
        setError("An error occurred while confirming your booking.");
      }
      return;
    }

    setLoading(true);
    setError(null); // Clear previous errors
    try {
      if (!stripe || !elements || !clientSecret) {
        throw new Error(
          "Stripe or Elements not loaded or clientSecret not available"
        );
      }

      // Create a payment method
      const { error: paymentMethodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardNumberElement),
        });

      if (paymentMethodError) {
        setError(paymentMethodError.message);
        return;
      }

      // Confirm the payment
      const { error: paymentError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

      if (paymentError) {
        setError(paymentError.message);
      } else if (paymentIntent.status === "succeeded") {
        if (onPaymentSuccess) onPaymentSuccess();
        navigate("/session-preview"); // Redirect to the session page after payment success
        window.scrollTo(0, 0); // Scroll to the top of the page
      } else {
        console.log(`Payment status: ${paymentIntent.status}`);
      }
    } catch (error) {
      console.error(
        "Error creating payment method or confirming payment:",
        error
      );

      setError("An error occurred while processing your payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-container-payment" ref={modalRef}>
      <div className="popup-header">
        <button
          className="popup-close-icon"
          onClick={() => console.log("Close popup")}
          aria-label="Close popup"
        >
          &times;
        </button>
      </div>

      <div className="popup-instruction-payment">
        <p>{isFreeSlot ? "No payment is required for this free slot." : "Enter your card details below to complete the payment."}</p>
      </div>

      {!isFreeSlot && (
        <>
          <div className="card-entry">
            <label>Card Number</label>
            <CardNumberElement className="stripe-element" />
          </div>

          <div className="expiry-cvc-entry">
            <div className="card-entry">
              <label>Expiry Date</label>
              <CardExpiryElement className="stripe-element" />
            </div>

            <div className="card-entry">
              <label>CVC</label>
              <CardCvcElement className="stripe-element" />
            </div>
          </div>
        </>
      )}

      <button
        disabled={!stripe || loading || (isFreeSlot && !clientSecret)}
        className="subscribe-button"
        onClick={handlePayment}
      >
        {loading ? "Processing..." : isFreeSlot ? "Confirm Booking" : "Pay Now"}
      </button>

      {error && <div className="payment-error">{error}</div>}
    </div>
  );
};

const StripePaymentWrapper = (props) => (
  <Elements stripe={stripePromise}>
    <StripePayment {...props} />
  </Elements>
);

export default StripePaymentWrapper;

