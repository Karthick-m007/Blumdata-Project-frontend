import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/UserNavbar';

const MyQuotesPage = () => {
    const navigate = useNavigate();
    const url = process.env.REACT_APP_BACKEND_URL;

    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeQuoteId, setActiveQuoteId] = useState(null); // Track active quote ID

    useEffect(() => {
        const fetchQuotes = async () => {
            setLoading(true);
            setError('');

            try {
                const response = await fetch(`${url}requestquote-getitems`, {
                    method: 'GET',
                    credentials: 'include',
                });

                const data = await response.json();
                if (response.ok) {
                    setQuotes(data.product || []);
                } else {
                    setError(data.message || 'Unable to fetch quotes.');
                }
            } catch (err) {
                setError('Something went wrong. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchQuotes();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date) ? 'Invalid Date' : date.toLocaleDateString();
    };

    const handleQuoteClick = (quoteId) => {
        setActiveQuoteId(quoteId); // Set active quote ID
        navigate(`/quote/${quoteId}`);
    };

    // Function to return the appropriate color based on quote status
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-600'; // Yellow for pending
            case 'approved':
                return 'bg-green-600'; // Green for approved
            case 'rejected':
                return 'bg-red-600'; // Red for rejected
            default:
                return 'bg-gray-600'; // Default to gray if unknown status
        }
    };

    return (
        <div className="min-h-screen bg-blue-50">
            <div className="py-24">
                <Navbar />
                <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
                    <h1 className="text-3xl font-bold text-blue-800 mb-6">My Quotes</h1>

                    {loading && <div>Loading...</div>}
                    {error && <div className="text-red-500 mb-4">{error}</div>}

                    <div>
                        {quotes.length > 0 ? (
                            quotes.map((quote) => (
                                <div
                                    key={quote.requestQuote_id}
                                    className="flex justify-between items-center p-4 border-b border-gray-300"
                                >
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-800">{quote.product}</h2>
                                        <p className="text-sm text-gray-500">Requested on: {formatDate(quote.delivery)}</p>
                                    </div>

                                    <div className="flex flex-col items-end">
                                        <h4 className="text-sm text-gray-700">
                                            Status: <span className={`font-semibold ${getStatusColor(quote.status)}`}>{quote.status}</span>
                                        </h4>
                                        <button
                                            onClick={() => handleQuoteClick(quote._id)}  // Use handleQuoteClick here
                                            className={`mt-2 px-4 py-2 rounded-lg ${activeQuoteId === quote._id
                                                ? 'bg-blue-800 hover:bg-blue-700' // Highlight active button
                                                : 'bg-blue-600 hover:bg-blue-700'
                                                } text-white`}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center mt-6">You have no quotes yet.</div>
                        )}
                    </div>

                    <div className="flex justify-between mx-auto max-w-xs mt-6">
                        <button
                            className="w-1/2 px-2 py-1 bg-green-600 me-3 text-white rounded-lg hover:bg-green-700"
                            onClick={() => { navigate('/requestquote'); }}
                        >
                            Add New Quote
                        </button>
                        <button
                            className="w-1/2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            onClick={() => { navigate('/productlist'); }}
                        >
                            View Products
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyQuotesPage;
