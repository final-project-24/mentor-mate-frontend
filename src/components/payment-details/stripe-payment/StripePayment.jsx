import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import axios from "axios";
import {
  createStripePaymentIntent,
  updatePaymentStatus,
} from "../../../utils/api-connector";
import "./StripePayment.css";

const stripePublicKeyId = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
console.log("Stripe Public Key:", stripePublicKeyId);

// Initialize Stripe with public key
const stripePromise = loadStripe(stripePublicKeyId);

const StripePayment = ({
  bookingId,
  amount,
  onPaymentStart,
  onPaymentSuccess,
  onPaymentEnd,
  // menteeData,
}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [pending, setPending] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    // setPending(true);

    if (onPaymentStart) onPaymentStart();

    try {
      // Call backend to create a PaymentIntent
      const response = await createStripePaymentIntent(bookingId); // Use the imported function
      const { clientSecret } = response;
      // const response = await axios.post("/api/payment/create-payment-intent", {
      //   amount,
      // });
      // const { clientSecret } = response.data;

      // Retrieve the CardElement addeddd
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        throw new Error("CardElement not found");
      }

      // Use Stripe.js to confirm the payment
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            // card: elements.getElement(CardElement),
            card: cardElement, // addeddd
          },
        });

      if (stripeError) {
        setError(stripeError.message);
        return;
      }

      // Update payment status in the backend addeddd
      const updatedPayment = await updatePaymentStatus(paymentIntent.id);
      console.log("Updated payment status:", updatedPayment);

      if (paymentIntent.status === "succeeded") {
        // Notify parent component of successful payment
        if (onPaymentSuccess) onPaymentSuccess();
        console.log("Payment succeeded, navigating to /session");
        navigate("/session"); // Redirect to the session page after payment successsss
      } else {
        console.log(`Payment status: ${paymentIntent.status}`);
      }
    } catch (error) {
      console.error("Error processing payment:", error); // this is the error
      setError("An error occurred while processing your payment.");
    } finally {
      setLoading(false);
      // setPending(false);
      if (onPaymentEnd) onPaymentEnd();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h6>You can enter here your credit card details</h6>
      <CardElement />
      {/* <button type="submit" disabled={loading || pending || !stripe}> */}
      <button type="submit" disabled={loading || !stripe}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
      {error && <div className="payment-error">{error}</div>}
    </form>
  );
};

const StripePaymentWrapper = (props) => (
  <Elements stripe={stripePromise}>
    <StripePayment {...props} />
  </Elements>
);

export default StripePaymentWrapper;
