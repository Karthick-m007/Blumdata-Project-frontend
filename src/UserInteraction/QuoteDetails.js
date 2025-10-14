import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Components/UserNavbar';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? 'Invalid Date' : date.toLocaleDateString();
};

const CheckIcon = () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const CurrentStepIcon = () => (
    <div className="w-8 h-8 rounded-full border-2 border-blue-600 flex items-center justify-center bg-blue-600">
        <div className="w-4 h-4 bg-white rounded-full" />
    </div>
);

const UpcomingStepIcon = () => (
    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-400" />
);

const CompletedStepIcon = () => (
    <div className="w-8 h-8 rounded-full border-2 border-green-600 flex items-center justify-center bg-green-600">
        <CheckIcon />
    </div>
);

export default function QuoteDetails() {
    const url = process.env.REACT_APP_BACKEND_URL;
    const { id } = useParams();
    const navigate = useNavigate();
    const [quote, setQuote] = useState(null);
    const [error, setError] = useState('');
    const [trackingStatus, setTrackingStatus] = useState('');
    const [paymentStatus, setPaymentStatus] = useState(''); // For storing payment status

    const fetchQuote = async () => {
        try {
            const response = await fetch(`${url}requestquote-getitems/${id}`, {
                method: 'GET',
                credentials: 'include',
            });

            const data = await response.json();
            if (data.success) {
                setQuote(data.product);
                setTrackingStatus(data.product.trackingStatus);
                setPaymentStatus(data.product.paymentStatus); // Set payment status
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Error fetching quote details');
        }
    };

    useEffect(() => {
        fetchQuote();
    }, [id]);

    const renderStages = () => {
        if (!quote || !quote.stages) return null;

        const stages = quote.stages;
        const currentStageIndex = stages.indexOf(trackingStatus);

        return stages.map((stage, index) => {
            const isCompleted = index < currentStageIndex;
            const isCurrent = index === currentStageIndex;
            const isUpcoming = index > currentStageIndex;

            return (
                <div key={index} className="flex items-center space-x-2">
                    {isCompleted ? (
                        <CompletedStepIcon />
                    ) : isCurrent ? (
                        <CurrentStepIcon />
                    ) : (
                        <UpcomingStepIcon />
                    )}
                    <span
                        className={`text-sm ${isCompleted
                            ? 'text-gray-600'
                            : isCurrent
                                ? 'text-blue-600 font-semibold'
                                : 'text-gray-400'
                            }`}
                    >
                        {stage}
                    </span>
                </div>
            );
        });
    };

    if (!quote) {
        return (
            <div className="min-h-screen bg-blue-50">
                <Navbar />
                <div className="pt-24 px-6 text-center text-gray-700">Quote not found.</div>
            </div>
        );
    }

    const handlePayNow = () => {
        navigate('/payment', { state: { quoteId: id, quoteDetails: quote } });
    };

    return (
        <div className="min-h-screen bg-blue-50 pt-24">
            <Navbar />
            <div className="pt-16 px-6 max-w-screen-lg mx-auto bg-white rounded-lg shadow-md p-8 space-y-8">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Quote Details — #{quote.id}</h2>

                <div className="space-y-2 text-gray-700 text-lg">
                    <p>
                        <strong>Order ID:</strong> <span className="font-mono">{quote.requestQuote_id}</span> {/* Order ID */}
                    </p>
                    <p>
                        <strong>Product:</strong> {quote.product}
                    </p>
                    <p>
                        <strong>Quantity:</strong> {quote.quantity}
                    </p>
                    <p>
                        <strong>Status:</strong>{' '}
                        <span className="text-indigo-700 font-semibold">{trackingStatus}</span>
                    </p>
                    <p>
                        <strong>Payment Status:</strong>{' '}
                        <span className={`text-${paymentStatus.toLowerCase() === 'paid' ? 'green' : 'red'}-600 font-semibold`}>
                            {paymentStatus}
                        </span>
                    </p>
                    {/* <p>
                        <strong>Requested On:</strong> {quote.requestedOn ? formatDate(quote.requestedOn) : 'Not Available'}
                    </p> */}
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-5 text-gray-800">Production / Delivery Stages</h3>
                    <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12">
                        {renderStages()}
                    </div>
                </div>

                {error && (
                    <div className="mt-6 text-center text-red-600">
                        <p>{error}</p>
                    </div>
                )}

                {/* Only show the Pay Now button if the payment status is "Pending" */}
                {paymentStatus !== 'Paid' && (
                    <div className="text-center">
                        <button
                            onClick={handlePayNow}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-300"
                        >
                            Pay Now
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
