import { Alert, AlertTitle, Skeleton } from '@mui/material'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PaymentForm from './PaymentForm';
import { createStripePaymentSecret } from '../../store/actions';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripePayment = () => {
  const dispatch = useDispatch();
  const { clientSecret } = useSelector((state) => state.auth);
  const { orderId, orderTotal } = useSelector((state) => state.orders);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  const stripeClientSecret = clientSecret?.clientSecret;

  useEffect(() => {
    if (!stripeClientSecret && orderId && orderTotal) {
      dispatch(createStripePaymentSecret(orderTotal, orderId));
    }
  }, [stripeClientSecret, orderId, orderTotal]);

  if (isLoading) {
    return (
      <div className='max-w-lg mx-auto'>
        <Skeleton />
      </div>
    )
  }

  return (
    <>
      {stripeClientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret: stripeClientSecret }}>
          <PaymentForm clientSecret={stripeClientSecret} totalPrice={orderTotal} />
        </Elements>
      )}
    </>
  )
}

export default StripePayment