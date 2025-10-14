import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Components/UserNavbar';

// Function to format the date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? 'Invalid Date' : date.toLocaleDateString();
};

// SVG Icons for the stepper
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
    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-400">
        {/* Empty circle for upcoming stages */}
    </div>
);

const CompletedStepIcon = () => (
    <div className="w-8 h-8 rounded-full border-2 border-green-600 flex items-center justify-center bg-green-600">
        <CheckIcon />  {/* Green check mark for completed stage */}
    </div>
);

export default function QuoteDetails() {
    const url = process.env.REACT_APP_BACKEND_URL; // Make sure you set this correctly in your .env file
    const { id } = useParams();
    const navigate = useNavigate(); // Hook for navigation
    const [quote, setQuote] = useState(null);
    const [error, setError] = useState('');
    const [trackingStatus, setTrackingStatus] = useState('');

    // Function to fetch quote details from the backend
    const fetchQuote = async () => {
        try {
            const response = await fetch(`${url}requestquote-getitems/${id}`, {
                method: 'GET',
                credentials: 'include',
            });

            const data = await response.json();
            if (data.success) {
                setQuote(data.product);
                setTrackingStatus(data.product.trackingStatus); // Set initial tracking status
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Error fetching quote details');
        }
    };

    useEffect(() => {
        fetchQuote(); // Initial fetch on component mount
    }, [id]);

    // Render the stages (Requested, In Progress, etc.)
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
                        <CompletedStepIcon /> // Green check icon for completed stages
                    ) : isCurrent ? (
                        <CurrentStepIcon /> // Blue circle for current stage
                    ) : (
                        <UpcomingStepIcon /> // Empty circle for upcoming stages
                    )}
                    <span
                        className={`text-sm ${isCompleted
                                ? 'text-gray-600' // Completed stages will have gray text
                                : isCurrent
                                    ? 'text-blue-600 font-semibold' // Current stage will be blue and bold
                                    : 'text-gray-400' // Upcoming stages will have muted gray text
                            }`}
                    >
                        {stage}
                    </span>
                </div>
            );
        });
    };

    // If quote is not found, display a message
    if (!quote) {
        return (
            <div className="min-h-screen bg-blue-50">
                <Navbar />
                <div className="pt-24 px-6 text-center text-gray-700">Quote not found.</div>
            </div>
        );
    }

    // Handle navigation to the payment page
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
                        <strong>Requested On:</strong> {quote.requestedOn ? formatDate(quote.requestedOn) : 'Not Available'}
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-5 text-gray-800">Production / Delivery Stages</h3>
                    <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12">
                        {renderStages()}
                    </div>
                </div>

                {/* Display error message if there is an issue */}
                {error && (
                    <div className="mt-6 text-center text-red-600">
                        <p>{error}</p>
                    </div>
                )}

                {/* Payment Button */}
                {trackingStatus !== "Paid" && (
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
