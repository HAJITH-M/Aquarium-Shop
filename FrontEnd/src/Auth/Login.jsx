import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSignUp, setIsSignUp] = useState(false); // State to toggle between login and signup

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('https://aquarium-shop-ltwi.onrender.com/signin', {
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
            localStorage.setItem('userEmail', email);
            localStorage.setItem('token', data.token);
            window.location.href = '/';
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('https://aquarium-shop-ltwi.onrender.com/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Sign up failed');
            }

            const data = await response.json();
            localStorage.setItem('userEmail', email);
            localStorage.setItem('token', data.token);
            window.location.href = '/';
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-blue-50 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
                {isSignUp ? 'Sign Up for Your Aquarium' : 'Login to Your Aquarium'}
            </h2>
            {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
            <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="flex flex-col">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="border border-blue-300 mb-4 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="border border-blue-300 mb-4 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <button
                    type="submit"
                    className="text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-6 py-3 transition duration-200"
                >
                    {isSignUp ? 'Create Account' : 'Dive In'}
                </button>
            </form>
            <p className="mt-4 text-center text-blue-500">
                {isSignUp ? 'Already have an account?' : 'Don’t have an account?'}{' '}
                <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="underline text-blue-700 focus:outline-none"
                >
                    {isSignUp ? 'Login' : 'Sign Up'}
                </button>
            </p>
        </div>
    );
};

export default Login;
