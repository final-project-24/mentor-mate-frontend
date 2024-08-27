import React, { useState } from 'react';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import './StripePayment.css'; 

const stripePublicKeyId = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
console.log("Stripe Public Key:", stripePublicKeyId);

// Initialize Stripe with public key
const stripePromise = loadStripe(stripePublicKeyId);

const StripePayment = ({ amount, onPaymentStart, onPaymentSuccess, onPaymentEnd, menteeData }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setPending(true);

    if (onPaymentStart) onPaymentStart();

    try {
      // Call backend to create a PaymentIntent
      const response = await axios.post('/payment/stripe/create-payment-intent', { amount });
      console.log('Payment Intent created:', response.data); // Log payment intent creation
      const { clientSecret } = response.data;

      // Use Stripe.js to confirm the payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (stripeError) {
        setError(stripeError.message);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        // Notify parent component of successful payment
        if (onPaymentSuccess) onPaymentSuccess();
      } else {
        console.log(`Payment status: ${paymentIntent.status}`);
      }
    } catch (error) {
      console.error('Error processing payment:', error.response ? error.response.data : error.message);
      setError('An error occurred while processing your payment.');
    } finally {
      setLoading(false);
      setPending(false);
      if (onPaymentEnd) onPaymentEnd();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h6>You can enter here your credit card details</h6>
      <CardElement />
      <button type="submit" disabled={loading || pending || !stripe}>
        {loading ? 'Processing...' : 'Pay Now'}
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
