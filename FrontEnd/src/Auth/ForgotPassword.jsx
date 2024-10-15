import React, { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSendOtp = async () => {
        setError('');
        setMessage('');

        if (!email) {
            setError('Please enter your email.');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to send OTP');
            }

            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleResetPassword = async () => {
        setError('');
        setMessage('');

        if (!otp || !newPassword) {
            setError('Please enter OTP and new password.');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp, newPassword }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to reset password');
            }

            const data = await response.json();
            setMessage(data.message);
            // Optionally redirect to login or another page
            // e.g., history.push('/login');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-blue-50 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Reset Password</h2>
            {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
            {message && <p className="text-green-600 mb-4 text-center">{message}</p>}
            <div className="flex flex-col mb-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="border border-blue-300 mb-4 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <button
                    onClick={handleSendOtp}
                    className="text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-6 py-3 transition duration-200"
                >
                    Send OTP
                </button>
            </div>
            <div className="flex flex-col mb-4">
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    required
                    className="border border-blue-300 mb-4 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                    required
                    className="border border-blue-300 mb-4 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <button
                    onClick={handleResetPassword}
                    className="text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-6 py-3 transition duration-200"
                >
                    Reset Password
                </button>
            </div>
        </div>
    );
};

export default ForgotPassword;
