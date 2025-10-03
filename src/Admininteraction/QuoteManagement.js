import React, { useState } from "react";
import Navbar from '../Components/Navbar';

export default function QuoteManagement() {
  const [quotes, setQuotes] = useState([
    { id: 1, user: "John Doe", product: "CNC Machine", date: "2025-09-29", status: "Pending" },
    { id: 2, user: "Jane Smith", product: "3D Printer", date: "2025-09-28", status: "Approved" },
    { id: 3, user: "Mark Taylor", product: "Laser Cutter", date: "2025-09-27", status: "Rejected" },
  ]);

  const updateStatus = (id, newStatus) => {
    setQuotes(prev =>
      prev.map(q => (q.id === id ? { ...q, status: newStatus } : q))
    );
  };

  const statusColors = {
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
    Pending: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="pt-24 bg-blue-50 min-h-screen">
      <Navbar />
      <div className="p-6 md:p-10">
        <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">Quote Management</h1>

        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow-sm">
            <thead className="bg-blue-100 text-gray-600 text-sm uppercase">
              <tr>
                <th className="text-left  text-blue-600 p-4">User</th>
                <th className="text-left text-blue-600 p-4">Product</th>
                <th className="text-left text-blue-600 p-4">Date</th>
                <th className="text-left text-blue-600 p-4">Status</th>
                <th className="text-left text-blue-600 p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map(quote => (
                <tr key={quote.id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-4 text-gray-800">{quote.user}</td>
                  <td className="p-4 text-gray-700">{quote.product}</td>
                  <td className="p-4 text-gray-600">{quote.date}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[quote.status]}`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="p-4 space-x-2 whitespace-nowrap">
                    {quote.status === "Pending" && (
                      <>
                        <button
                          onClick={() => updateStatus(quote.id, "Approved")}
                          className="text-green-700 hover:text-white hover:bg-green-600 border border-green-600 px-3 py-1 rounded transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatus(quote.id, "Rejected")}
                          className="text-red-700 hover:text-white hover:bg-red-600 border border-red-600 px-3 py-1 rounded transition"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {quote.status === "Approved" && (
                      <button
                        onClick={() => updateStatus(quote.id, "Pending")}
                        className="text-yellow-700 hover:text-white hover:bg-yellow-500 border border-yellow-500 px-3 py-1 rounded transition"
                      >
                        Revoke
                      </button>
                    )}
                    {quote.status === "Rejected" && (
                      <button
                        onClick={() => updateStatus(quote.id, "Pending")}
                        className="text-blue-700 hover:text-white hover:bg-blue-600 border border-blue-600 px-3 py-1 rounded transition"
                      >
                        Reconsider
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4">
          {quotes.map(quote => (
            <div key={quote.id} className="bg-white rounded shadow-sm p-4 border">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-800">{quote.user}</p>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[quote.status]}`}>
                  {quote.status}
                </span>
              </div>
              <p className="text-gray-700">
                <strong>Product:</strong> {quote.product}
              </p>
              <p className="text-gray-600">
                <strong>Date:</strong> {quote.date}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {quote.status === "Pending" && (
                  <>
                    <button
                      onClick={() => updateStatus(quote.id, "Approved")}
                      className="text-green-700 hover:text-white hover:bg-green-600 border border-green-600 px-3 py-1 rounded transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(quote.id, "Rejected")}
                      className="text-red-700 hover:text-white hover:bg-red-600 border border-red-600 px-3 py-1 rounded transition"
                    >
                      Reject
                    </button>
                  </>
                )}
                {quote.status === "Approved" && (
                  <button
                    onClick={() => updateStatus(quote.id, "Pending")}
                    className="text-yellow-700 hover:text-white hover:bg-yellow-500 border border-yellow-500 px-3 py-1 rounded transition"
                  >
                    Revoke
                  </button>
                )}
                {quote.status === "Rejected" && (
                  <button
                    onClick={() => updateStatus(quote.id, "Pending")}
                    className="text-blue-700 hover:text-white hover:bg-blue-600 border border-blue-600 px-3 py-1 rounded transition"
                  >
                    Reconsider
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
