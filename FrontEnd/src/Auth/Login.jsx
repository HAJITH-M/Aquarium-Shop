// Login.jsx
import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        try {
            const response = await fetch('http://localhost:4000/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            // Store user email and token in local storage
            localStorage.setItem('userEmail', email); // Store email
            localStorage.setItem('token', data.token); // Store token if needed

            // Redirect or update state as needed, e.g., navigate to home page
            window.location.href = '/'; // Redirect to home page
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {error && <p className="text-red-600">{error}</p>}
            <form onSubmit={handleLogin} className="flex flex-col">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="border mb-2 p-2"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="border mb-2 p-2"
                />
                <button
                    type="submit"
                    className="text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
