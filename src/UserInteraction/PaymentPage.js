import React, { useState, useEffect } from "react";
import UserNavbar from "../Components/UserNavbar";

export default function PaymentPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const paymentData = [
        {
            orderId: "12345",
            product: "CNC Machine",
            status: "Ready",
            amount: "$2,500",
        },
    ];

    const [isProcessing, setIsProcessing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false); // Confirmation Modal
    const [amountToPay, setAmountToPay] = useState("");

    const handlePayment = () => {
        if (isProcessing) return; // prevent double clicks

        // Show confirmation modal before proceeding with the payment
        setShowConfirmation(true);
        setAmountToPay(paymentData[0].amount); // Pass the amount from paymentData
    };

    const confirmPayment = () => {
        // Hide the confirmation modal and start processing payment
        setShowConfirmation(false);
        setIsProcessing(true);

        setTimeout(() => {
            setIsProcessing(false);
            setShowModal(true); // Show success modal after payment is processed
        }, 2500); // Simulate payment processing
    };

    const cancelPayment = () => {
        setShowConfirmation(false); // Close confirmation modal
    };

    // Close modal on Escape key press for accessibility
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape" && (showModal || showConfirmation)) {
                setShowModal(false);
                setShowConfirmation(false);
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [showModal, showConfirmation]);

    return (
        <div className="min-h-screen bg-blue-50">
            <UserNavbar />

            <main className="pt-24 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto">
                <section className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold text-blue-900">Proceed to Payment</h1>
                    <p className="mt-3 text-gray-700 max-w-md mx-auto">
                        Please review your order details below and complete your payment.
                    </p>
                </section>

                <section className="bg-white rounded-lg shadow-lg p-8">
                    {/* Notification Banner */}
                    <div className="bg-green-100 text-green-900 rounded-md p-5 mb-8 flex items-center space-x-3">
                        <svg
                            className="w-7 h-7 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path d="M9 12l2 2 4-4" />
                            <circle cx="12" cy="12" r="10" />
                        </svg>
                        <div>
                            <h2 className="font-semibold text-lg">Your product is ready!</h2>
                            <p className="text-sm">Please review and proceed with the payment.</p>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gray-50 border border-gray-200 rounded-md p-6 mb-10">
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                            <span role="img" aria-label="Receipt">
                                🧾
                            </span>
                            Order Summary
                        </h2>

                        {paymentData.map(({ orderId, product, status, amount }, i) => (
                            <div key={i} className="space-y-3 text-gray-800 text-lg">
                                <p>
                                    <strong>Order ID:</strong> <span className="font-mono">{orderId}</span>
                                </p>
                                <p>
                                    <strong>Product:</strong> {product}
                                </p>
                                <p>
                                    <strong>Status:</strong>{" "}
                                    <span
                                        className={`font-semibold ${status.toLowerCase() === "ready" ? "text-green-600" : "text-yellow-600"}`}
                                    >
                                        {status}
                                    </span>
                                </p>
                                <p>
                                    <strong>Amount Due:</strong>{" "}
                                    <span className="text-blue-700 font-bold">{amount}</span>
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Payment Button and animation */}
                    <div className="text-center">
                        <button
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className={`relative inline-flex items-center justify-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300
                ${isProcessing ? "cursor-not-allowed opacity-70 hover:bg-blue-600" : "hover:bg-blue-700"}`}
                            aria-label="Pay Now"
                        >
                            {/* Show spinner if processing */}
                            {isProcessing && (
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    ></path>
                                </svg>
                            )}
                            {isProcessing ? "Processing..." : "Pay Now"}
                        </button>
                    </div>

                    {/* Info text */}
                    <p className="mt-8 text-center text-sm text-gray-500">
                        ℹ️ This is a simulation. No real transaction will occur.
                    </p>
                </section>
            </main>

            {/* Confirmation Modal */}
            {showConfirmation && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-50"
                        onClick={cancelPayment}
                        aria-hidden="true"
                    ></div>

                    {/* Modal content */}
                    <div
                        className="fixed inset-0 flex items-center justify-center z-50 p-4"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="confirmation-modal-title"
                    >
                        <div
                            className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 text-center transform transition-transform animate-zoomIn"
                            style={{ boxSizing: "border-box" }}
                            onClick={(e) => e.stopPropagation()} // Prevent close on modal content click
                        >
                            <h3
                                id="confirmation-modal-title"
                                className="text-2xl font-bold text-blue-700 mb-4"
                            >
                                <span role="img" aria-label="Dollar Sign">
                                    
                                </span>{" "}
                                Confirm Payment
                            </h3>
                            <p className="mb-6 text-gray-700">
                                Are you sure you want to pay <span className="font-bold">{amountToPay}</span> for this order?
                            </p>
                            <div className="flex justify-around">
                                <button
                                    onClick={confirmPayment}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-300"
                                >
                                    Confirm
                                </button>
                                <button
                                    onClick={cancelPayment}
                                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Success Modal */}
            {showModal && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-50"
                        onClick={() => setShowModal(false)}
                        aria-hidden="true"
                    ></div>

                    {/* Modal content */}
                    <div
                        className="fixed inset-0 flex items-center justify-center z-50 p-4"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                    >
                        <div
                            className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 text-center transform transition-transform animate-zoomIn"
                            style={{ boxSizing: "border-box" }}
                            onClick={(e) => e.stopPropagation()} // Prevent close on modal content click
                        >
                            <h3
                                id="modal-title"
                                className="text-2xl font-bold text-green-700 mb-4 flex items-center justify-center gap-2"
                            >
                                <span role="img" aria-label="Check">
                                    ✅
                                </span>
                                Payment Successful
                            </h3>
                            <p className="mb-6 text-gray-700">
                                Thank you for your purchase! Your payment has been processed successfully.
                            </p>
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Modal zoom-in animation */}
            <style>{`
            @keyframes zoomIn {
              0% {
                opacity: 0;
                transform: scale(0.8);
              }
              100% {
                opacity: 1;
                transform: scale(1);
              }
            }
            .animate-zoomIn {
              animation: zoomIn 0.35s ease forwards;
            }
          `}</style>
        </div>
    );
}
