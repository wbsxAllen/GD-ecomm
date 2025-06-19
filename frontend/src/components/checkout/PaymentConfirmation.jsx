import React, { useEffect, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { stripePaymentConfirmation } from '../../store/actions';
import toast from 'react-hot-toast';

const PaymentConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);

    const paymentIntent = searchParams.get("payment_intent");
    const clientSecret = searchParams.get("payment_intent_client_secret");
    const redirectStatus = searchParams.get("redirect_status");
    const selectedUserCheckoutAddress = localStorage.getItem("CHECKOUT_ADDRESS")
        ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
        : null;

    useEffect(() => {
        const confirmPayment = async () => {
            if (paymentIntent && clientSecret && redirectStatus === "succeeded") {
                try {
                    const sendData = {
                        paymentIntentId: paymentIntent,
                        status: redirectStatus,
                        message: "Payment successful"
                    };
                    
                    await dispatch(stripePaymentConfirmation(
                        sendData,
                        setErrorMessage,
                        setLoading,
                        toast,
                        () => {
                            setIsSuccess(true);
                            // Callback after success, redirect to orders list after 3 seconds
                            setTimeout(() => {
                                navigate('/profile/orders');
                            }, 3000);
                        }
                    ));
                } catch (error) {
                    setErrorMessage("Payment confirmation failed. Please contact support.");
                    setLoading(false);
                }
            } else {
                setErrorMessage("Invalid payment confirmation data");
                setLoading(false);
            }
        };

        confirmPayment();
    }, [paymentIntent, clientSecret, redirectStatus, dispatch, navigate]);

    if (loading && !isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (errorMessage && !isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="p-8 rounded-lg shadow-lg text-center max-w-md mx-auto border border-red-200">
                    <div className="text-red-500 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Error</h2>
                    <p className="text-gray-600 mb-6">{errorMessage}</p>
                    <button
                        onClick={() => navigate('/cart')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Return to Cart
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-8 rounded-lg shadow-lg text-center max-w-md mx-auto border border-gray-200">
                <div className="text-green-500 mb-4 flex justify-center">    
                    <FaCheckCircle size={64} />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
                <p className="text-gray-600 mb-6">
                    Thank you for your purchase! Your payment was successful, and we're
                    processing your order. You will be redirected to your orders page shortly.
                </p>
            </div>
        </div>
    );
}

export default PaymentConfirmation;