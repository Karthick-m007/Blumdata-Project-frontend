import React, { useState, useEffect } from "react";
import UserNavbar from "../Components/UserNavbar";
import CustomAlert from "../Components/CustomAlert "; // Import CustomAlert

export default function PaymentPage() {
    const [paymentData, setPaymentData] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [amountToPay, setAmountToPay] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(null); // Track selected order

    const url = process.env.REACT_APP_BACKEND_URL;

    // Fetch payment data from backend
    useEffect(() => {
        const fetchPaymentData = async () => {
            try {
                const response = await fetch(`${url}quotations`, { credentials: "include" });
                const data = await response.json();
                if (data.success) {
                    setPaymentData(data.quotations);
                } else {
                    setErrorMessage(data.message || "Failed to load payment data");
                }
            } catch (err) {
                setErrorMessage("Error fetching payment data");
                console.error(err);
            }
        };

        fetchPaymentData();
        window.scrollTo(0, 0);
    }, []);

    // Handle payment initiation
    const handlePayment = (order) => {
        if (isProcessing) return; // Prevent multiple clicks

        setSelectedOrder(order);
        setAmountToPay(order.total);
        setShowConfirmation(true);
    };

    // Confirm payment and update backend
    const confirmPayment = async () => {
        setShowConfirmation(false);
        setIsProcessing(true);

        try {
            const paymentDataToUpdate = selectedOrder;
            const response = await fetch(`${url}update-payment-status/${paymentDataToUpdate._id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ paymentStatus: "Paid" }),
            });

            const data = await response.json();
            if (data.success) {
                setPaymentData((prevData) =>
                    prevData.map((quote) =>
                        quote._id === paymentDataToUpdate._id ? { ...quote, paymentStatus: "Paid" } : quote
                    )
                );
                setIsProcessing(false);
                setShowModal(true);
            } else {
                setErrorMessage(data.message || "Payment update failed");
            }
        } catch (error) {
            setErrorMessage("Error processing payment. Please try again.");
            console.error(error);
        }
    };

    // Cancel payment process
    const cancelPayment = () => {
        setShowConfirmation(false);
    };

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
                    {/* Custom Error Notification */}
                    {errorMessage && (
                        <CustomAlert type="error" message={errorMessage} onClose={() => setErrorMessage("")} />
                    )}

                    {/* Pending Orders Section */}
                    <div className="mb-10">
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                            <span role="img" aria-label="Pending">
                                ⏳
                            </span>
                            Pending Orders
                        </h2>

                        {paymentData.filter(order => order.paymentStatus === "Pending").length === 0 ? (
                            <p className="text-gray-500">No pending orders found.</p>
                        ) : (
                            paymentData
                                .filter(order => order.paymentStatus === "Pending")
                                .map(({ requestQuote_id, product, status, total, paymentStatus, _id }) => (
                                    <div key={_id} className="space-y-3 text-gray-800 text-lg border-b pb-6 mb-6">
                                        <p>
                                            <strong>Order ID:</strong> <span className="font-mono">{requestQuote_id}</span>
                                        </p>
                                        <p>
                                            <strong>Product:</strong> {product}
                                        </p>
                                        <p>
                                            <strong>Status:</strong>{" "}
                                            <span className={`font-semibold ${status.toLowerCase() === "approved" ? "text-green-600" : "text-red-600"}`}>
                                                {status}
                                            </span>
                                        </p>
                                        <p>
                                            <strong>Amount Due:</strong> <span className="text-blue-700 font-bold">{total}</span>
                                        </p>
                                        <p>
                                            <strong>Payment Status:</strong>{" "}
                                            <span className={`font-semibold ${paymentStatus.toLowerCase() === "paid" ? "text-green-600" : "text-red-600"}`}>
                                                {paymentStatus}
                                            </span>
                                        </p>

                                        {/* Pay Now Button */}
                                        <div className="text-center">
                                            <button
                                                onClick={() => handlePayment({ _id, total, requestQuote_id, product, status, paymentStatus })}
                                                disabled={isProcessing}
                                                className={`relative inline-flex items-center justify-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300
                                                ${isProcessing ? "cursor-not-allowed opacity-70 hover:bg-blue-600" : "hover:bg-blue-700"}`}
                                            >
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
                                    </div>
                                ))
                        )}
                    </div>

                    {/* Paid Orders Section */}
                    <div className="mb-10">
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                            <span role="img" aria-label="Paid">
                                ✅
                            </span>
                            Paid Orders
                        </h2>

                        {paymentData.filter(order => order.paymentStatus === "Paid").length === 0 ? (
                            <p className="text-gray-500">No paid orders found.</p>
                        ) : (
                            paymentData
                                .filter(order => order.paymentStatus === "Paid")
                                .map(({ requestQuote_id, product, status, total, paymentStatus, _id }) => (
                                    <div key={_id} className="space-y-3 text-gray-800 text-lg border-b pb-6 mb-6">
                                        <p>
                                            <strong>Order ID:</strong> <span className="font-mono">{requestQuote_id}</span>
                                        </p>
                                        <p>
                                            <strong>Product:</strong> {product}
                                        </p>
                                        <p>
                                            <strong>Status:</strong>{" "}
                                            <span className={`font-semibold ${status.toLowerCase() === "approved" ? "text-green-600" : "text-red-600"}`}>
                                                {status}
                                            </span>
                                        </p>
                                        <p>
                                            <strong>Amount Paid:</strong> <span className="text-blue-700 font-bold">{total}</span>
                                        </p>
                                        <p>
                                            <strong>Payment Status:</strong>{" "}
                                            <span className={`font-semibold ${paymentStatus.toLowerCase() === "paid" ? "text-green-600" : "text-red-600"}`}>
                                                {paymentStatus}
                                            </span>
                                        </p>
                                    </div>
                                ))
                        )}
                    </div>
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
                            onClick={(e) => e.stopPropagation()} // Prevent close on modal content click
                        >
                            <h3 id="confirmation-modal-title" className="text-2xl font-bold text-blue-700 mb-4">
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
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-50"
                        onClick={() => setShowModal(false)}
                        aria-hidden="true"
                    ></div>

                    <div
                        className="fixed inset-0 flex items-center justify-center z-50 p-4"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                    >
                        <div
                            className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 text-center transform transition-transform animate-zoomIn"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 id="modal-title" className="text-2xl font-bold text-green-700 mb-4">
                                ✅ Payment Successful
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

            {/* Zoom-in Animation */}
            <style>{`
                @keyframes zoomIn {
                    0% { opacity: 0; transform: scale(0.8); }
                    100% { opacity: 1; transform: scale(1); }
                }
                .animate-zoomIn {
                    animation: zoomIn 0.35s ease forwards;
                }
            `}</style>
        </div>
    );
}
