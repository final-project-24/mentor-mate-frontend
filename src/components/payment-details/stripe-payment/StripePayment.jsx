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
import { createStripePaymentIntent } from "../../../utils/api-connector";
import "./StripePayment.css"; 

const stripePublicKeyId = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

// Initialize Stripe with public key
const stripePromise = loadStripe(stripePublicKeyId);

const StripePayment = ({ bookingId, onPaymentSuccess }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const modalRef = useRef(null);

  useEffect(() => {
    // Fetch client secret from backend
    const fetchClientSecret = async () => {
      try {
        const response = await createStripePaymentIntent(bookingId);
        setClientSecret(response.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
        setError("An error occurred while initializing the payment.");
      }
    };

    fetchClientSecret();
  }, [bookingId]);

  const createSubscription = async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      if (!stripe || !elements || !clientSecret) {
        throw new Error("Stripe or Elements not loaded or clientSecret not available");
      }

      // Create a payment method
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: "Your Name", // Update as necessary
        },
      });

      if (paymentMethodError) {
        setError(paymentMethodError.message);
        return;
      }

      // Confirm the payment
      const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: paymentMethod.id,
        }
      );

      if (paymentError) {
        setError(paymentError.message);
      } else if (paymentIntent.status === "succeeded") {
        if (onPaymentSuccess) onPaymentSuccess();
        navigate("/session"); // Redirect to the session page after payment success
      } else {
        console.log(`Payment status: ${paymentIntent.status}`);
      }
    } catch (error) {
      console.error("Error creating payment method or confirming payment:", error);
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
        {/* <h2>Subscribe to Our Service</h2> */}
        <p>Enter your card details below to complete the payment.</p>
      </div>

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

      <button
        disabled={!stripe || loading || !clientSecret}
        className="subscribe-button"
        onClick={createSubscription}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>

      <div className="powered-by-stripe">
        <img src="/path/to/stripe/logo" alt="Powered by Stripe" />
      </div>

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
