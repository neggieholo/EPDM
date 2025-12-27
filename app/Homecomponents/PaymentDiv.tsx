'use client';
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";


const PaymentDiv: React.FC = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const [isLoading, setIsLoading] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState<number | null>(null);
    const yearlyAmount = paymentAmount || 0;

    useEffect(() => {
        const fetchPaymentAmount = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/initiate-payment/paymentAmount`, {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                // console.log("Fetched payment amount:", data.amount);
                setPaymentAmount(data.amount);
            } catch (error) {
                console.error("Error fetching payment amount:", error);
            }
        };

        fetchPaymentAmount();
    }, []);

    const initiatePayment = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${baseUrl}/api/initiate-payment`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const result = await response.json();

            if (result.paymentLink) {
                await fetch(`${baseUrl}/session_destroy`, {
                    method: 'GET',
                    credentials: 'include',
                });
                window.location.href = result.paymentLink;
            } else {
                toast.error("Payment failed!");
            }
        } catch (err) {
            console.error("Error initiating payment:", err);
            toast.error("An error occurred while initiating the payment. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-accent/10 rounded-xl 
        border border-accent text-center flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold text-red-600">Access Restricted</h2>
            <p>You are not allowed to view projects until you have subscribed.</p>

            {/* Subscription info */}
            <div className="w-full p-4 bg-white border-2 border-blue-600 rounded-lg shadow">
                <h4 className="text-blue-600 font-semibold mb-1">Annual Subscription</h4>
                <p className="text-lg font-bold">${yearlyAmount} / year</p>
            </div>

            <p>Please click below if you want to proceed with the subscription.</p>

            <button
                onClick={initiatePayment}
                disabled={isLoading}
                className="mt-2 px-6 py-2 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-60 flex items-center justify-center"
            >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    "Pay Here"
                )}
            </button>
        </div>
    );
};

export default PaymentDiv;
