import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';

export default function QuoteManagement() {
  const [quotes, setQuotes] = useState([]);
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || 'admin');  // Assuming you store user role in localStorage
  const url = process.env.REACT_APP_BACKEND_URL;

  // Fetch quotes when the component is mounted
  useEffect(() => {
    fetch(`${url}requestquote-getitems`, { method: 'GET', credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setQuotes(data.product || []);
        } else {
          console.error('Error fetching quotes:', data.message);
        }
      })
      .catch(err => console.error('Error fetching quotes:', err));
  }, []);

  // Update the status of a quote (Accept/Reject)
  const updateStatus = (id, newStatus) => {
    console.log(`Updating quote ${id} to ${newStatus}...`);

    fetch(`${url}update-quote-status/${id}`, {
      method: 'PUT',
      credentials: 'include',  // Ensure the session is passed along
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })  // Send the status change request
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          console.log('Status updated successfully');
          setQuotes(prev => prev.map(quote =>
            quote._id === id ? { ...quote, status: newStatus } : quote
          ));
        } else {
          console.error('Failed to update status:', data.message);
        }
      })
      .catch(err => console.error('Error updating status:', err));
  };


  return (
    <div className="pt-24 bg-blue-50 min-h-screen">
      <Navbar />
      <div className="p-6 md:p-10">
        <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">Quote Management</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
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
                <tr key={quote._id} className="border-t hover:bg-gray-50">
                  <td className="p-4 text-gray-800">{quote.name}</td>
                  <td className="p-4 text-gray-700">{quote.product}</td>
                  <td className="p-4 text-gray-600">{new Date(quote.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${quote.status === 'Approved' ? 'bg-green-100 text-green-700' : quote.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{quote.message || 'No message yet'}</td>
                  <td className="p-4 space-x-2">
                    {/* Only show actions for admin and quotes with status 'Pending' */}
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
                    {/* If status is not 'Rejected', show the Track Order button */}
                    {quote.status !== 'Rejected' && (
                      <Link to={`/track-order/${quote._id}`} className="text-blue-700 hover:underline">
                        <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                          Track Order
                        </button>
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
