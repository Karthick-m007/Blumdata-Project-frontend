import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';

export default function QuoteManagement() {
  const [quotes, setQuotes] = useState([]);
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || 'admin');
  const [loading, setLoading] = useState(true);
  const url = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    setLoading(true);
    fetch(`${url}requestquote-getitems`, { method: 'GET', credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setQuotes(data.product || []);
        } else {
          console.error('Error fetching quotes:', data.message);
        }
      })
      .catch(err => console.error('Error fetching quotes:', err))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = (id, newStatus) => {
    const confirmAction = window.confirm(`Are you sure you want to mark this quote as ${newStatus}?`);
    if (!confirmAction) return;

    setQuotes(prev => prev.map(quote =>
      quote._id === id ? { ...quote, status: newStatus } : quote
    ));

    fetch(`${url}update-quote-status/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          console.error('Failed to update status:', data.message);
          setQuotes(prev => prev.map(quote =>
            quote._id === id ? { ...quote, status: 'Pending' } : quote
          ));
        }
      })
      .catch(err => {
        console.error('Error updating status:', err);
        setQuotes(prev => prev.map(quote =>
          quote._id === id ? { ...quote, status: 'Pending' } : quote
        ));
      });
  };

  if (loading) {
    return (
      <div className="pt-24 bg-blue-50 min-h-screen">
        <Navbar />
        <div className="text-center py-12">
          <div className="spinner">Loading...</div> {/* You can replace this with your custom spinner */}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 bg-blue-50 min-h-screen">
      <Navbar />
      <div className="px-4 md:px-10 w-full">
        <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">Quote Management</h1>

        <div className="overflow-x-auto md:w-[85%] flex justify-center mx-auto">
          {/* Table for large screens */}
          <table className="md:min-w-full bg-white rounded-lg shadow-md md:block hidden">
            <thead className="bg-blue-100 text-gray-600 text-sm uppercase">
              <tr>
                <th className="text-left p-4">User</th>
                <th className="text-left p-4">Product</th>
                <th className="text-left p-4">Date</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Message</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map(quote => (
                <tr key={quote._id} className="border-t p-3 hover:bg-gray-50">
                  <td className="p-4 w-36 text-gray-800">{quote.name}</td>
                  <td className="p-4 text-gray-700">{quote.product}</td>
                  <td className="p-4 text-gray-600">{new Date(quote.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${quote.status === 'Approved' ? 'bg-green-100 text-green-700' : quote.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{quote.message || 'No message yet'}</td>
                  <td className="p-4 space-x-2">
                    {userRole === 'admin' && quote.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => updateStatus(quote._id, 'Approved')}
                          className="px-3 py-1 my-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => updateStatus(quote._id, 'Rejected')}
                          className="px-3 py-1 my-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {quote.status !== 'Rejected' && (
                      <Link to={`/track-order/${quote._id}`} className="text-blue-700 hover:underline">
                        <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-600 flex">
                          Track Order
                        </button>
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Card-like layout for mobile screens */}
          <div className="md:hidden space-y-6 w-full">
            {quotes.map(quote => (
              <div key={quote._id} className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-blue-900">{quote.name}</h3>
                    <p className="text-gray-600 text-sm">{quote.product}</p>
                  </div>
                  <p className="text-gray-600 text-sm">{new Date(quote.createdAt).toLocaleDateString()}</p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${quote.status === 'Approved' ? 'bg-green-100 text-green-700' : quote.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {quote.status}
                  </span>
                  <p className="text-gray-600 text-xs">{quote.message || 'No message yet'}</p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  {userRole === 'admin' && quote.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => updateStatus(quote._id, 'Approved')}
                        className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => updateStatus(quote._id, 'Rejected')}
                        className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {quote.status !== 'Rejected' && (
                    <Link to={`/track-order/${quote._id}`} className="text-blue-700 hover:underline">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Track Order
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
