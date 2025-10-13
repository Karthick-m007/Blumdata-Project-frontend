import React, { useState } from 'react';

const Toast = ({ message }) => (
    <div className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded-lg shadow-lg">
        {message}
    </div>
);

export default function UserRequestquotForm() {
    const [toastMessage, setToastMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Example of successful submission
        setToastMessage('Quote requested successfully!');
        setTimeout(() => {
            setToastMessage('');
        }, 3000); // Toast will disappear after 3 seconds
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* Form elements */}
                <button type="submit">Request Quote</button>
            </form>

            {/* Toast Notification */}
            {toastMessage && <Toast message={toastMessage} />}
        </div>
    );
}
