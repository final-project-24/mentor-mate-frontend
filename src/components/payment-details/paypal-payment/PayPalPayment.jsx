import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
console.log("Paypal Client ID:", paypalClientId);

const PayPalPayment = ({ amount, onPaymentStart, onPaymentSuccess, onPaymentError }) => {
  useEffect(() => {
    const loadPayPalScript = () => {
      const scriptId = 'paypal-sdk-script';

      // Check if the PayPal script is already loaded
      if (document.getElementById(scriptId)) {
        return;
      }

      // Create a new script element
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}`;
      script.async = true;

      // Append the script to the document body
      document.body.appendChild(script);

      // Handle the script loading
      script.onload = () => {
        if (window.paypal) {
          window.paypal.Buttons({
            createOrder: (data, actions) => {
              onPaymentStart(); // Trigger payment start callback
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    currency_code: 'USD',
                    value: (amount / 100).toFixed(2)
                  }
                }]
              });
            },
            onApprove: async (data, actions) => {
              try {
                const order = await actions.order.capture();
                console.log('Order successful:', order);
                onPaymentSuccess(); // Trigger payment success callback
              } catch (error) {
                console.error('Error capturing order:', error);
                onPaymentError(); // Trigger payment error callback
              }
            },
            onError: (error) => {
              console.error('PayPal error:', error);
              onPaymentError(); // Trigger payment error callback
            }
          }).render('#paypal-button-container'); // Render PayPal button
        }
      };

      // Handle script loading error
      script.onerror = () => {
        console.error('Failed to load PayPal script');
      };
    };

    loadPayPalScript();

    return () => {
      // Cleanup function to remove the PayPal script if the component unmounts
      const script = document.getElementById('paypal-sdk-script');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [amount, onPaymentStart, onPaymentSuccess, onPaymentError]);

  return (
    <div className="paypal-payment-section">
      <p>
        To pay via PayPal, please use the button below. You will be able to complete your payment securely.
      </p>
      <div id="paypal-button-container"></div>
    </div>
  );
};

PayPalPayment.propTypes = {
  amount: PropTypes.number.isRequired,
  onPaymentStart: PropTypes.func.isRequired,
  onPaymentSuccess: PropTypes.func.isRequired,
  onPaymentError: PropTypes.func.isRequired,
};

export default PayPalPayment;
