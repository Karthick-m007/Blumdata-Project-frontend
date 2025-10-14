import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';

export default function PaymentVerification() {
  const [payments, setPayments] = useState([]);
  const url = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = () => {
    fetch(`${url}quotations`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log('Fetched payments:', data.quotations);
          setPayments(data.quotations);
        } else {
          console.error('Error fetching payments:', data.message);
        }
      })
      .catch((err) => console.error('Error fetching payments:', err));
  };

  const toggleStatus = (id) => {
    const updatedPayments = payments.map((payment) =>
      payment._id === id
        ? { ...payment, paymentStatus: payment.paymentStatus === 'Paid' ? 'Pending' : 'Paid' }
        : payment
    );
    setPayments(updatedPayments);

    const status = updatedPayments.find(payment => payment._id === id).paymentStatus;

    fetch(`${url}update-payment-status/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentStatus: status })
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          console.error('Error updating payment status:', data.message);
        }
      })
      .catch((err) => console.error('Error updating payment status:', err));
  };

  return (
    <div className="pt-24 bg-blue-50 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-semibold text-center text-blue-900 mb-10">
          Payment Verification
        </h1>

        <div className="hidden md:block bg-white rounded-xl shadow-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-blue-800">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-blue-800">Product</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-blue-800">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-blue-800">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-blue-800">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payments.map((pay, index) => (
                <tr key={index} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-blue-900 font-medium">{pay.name || "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-blue-800">{pay.product || "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-blue-700">{pay.total || "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold
                      ${pay.paymentStatus === 'Paid'
                          ? 'bg-green-100 text-green-500'
                          : 'bg-red-100 text-red-500'
                        }`}
                    >
                      {pay.paymentStatus === 'Paid' ? (
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      )}
                      {pay.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleStatus(pay._id)}
                      className={`px-4 py-2 rounded-md text-sm font-semibold shadow-sm transition
                      ${pay.paymentStatus === 'Paid'
                          ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/50'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-400/50'
                        }`}
                    >
                      Mark {pay.paymentStatus === 'Paid' ? 'Unpaid' : 'Paid'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-6">
          {payments.map(({ _id, name, product, total, paymentStatus }) => (
            <div key={_id} className="bg-white rounded-xl shadow-md p-5">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-blue-900">{name || "N/A"}</h2>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold
                    ${paymentStatus === 'Paid'
                      ? 'bg-green-100 text-green-500'
                      : 'bg-red-100 text-red-500'
                    }`}
                >
                  {paymentStatus === 'Paid' ? (
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  )}
                  {paymentStatus}
                </span>
              </div>
              <p className="text-blue-800 mb-1"><strong>Product:</strong> {product || "N/A"}</p>
              <p className="text-blue-700 mb-4"><strong>Amount:</strong> {total || "N/A"}</p>
              <button
                onClick={() => toggleStatus(_id)}
                className={`w-full py-2 rounded-md text-white font-semibold transition shadow-sm
                  ${paymentStatus === 'Paid'
                    ? 'bg-red-500 hover:bg-red-600 shadow-red-400/50'
                    : 'bg-blue-500 hover:bg-blue-600 shadow-blue-400/50'
                  }`}
              >
                Mark {paymentStatus === 'Paid' ? 'Unpaid' : 'Paid'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
