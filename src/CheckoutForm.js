import React from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
      alert("Unsuccessful Transaction")
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      alert("Successful Transaction")
    }
  };

  return (
    <form onSubmit={handleSubmit} >
      <CardElement />
      <button className="bg-blue-500 hover:bg-green-500 p-3 mt-5 rounded-md hover:text-white"type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;