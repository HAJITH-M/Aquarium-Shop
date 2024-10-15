import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineLoading } from 'react-icons/ai';
import { RiCheckboxCircleLine } from 'react-icons/ri';
import { BiCartAlt, BiCheck } from 'react-icons/bi';

const FishDetails = () => {
    const { id } = useParams();
    const [fish, setFish] = useState(null);
    const [error, setError] = useState('');
    const [billing, setBilling] = useState(null);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchFishDetails = async () => {
        try {
            const response = await fetch(`https://aquarium-shop-ltwi.onrender.com/fish/${id}`);
            if (!response.ok) {
                throw new Error('Fish not found');
            }
            const data = await response.json();
            setFish(data);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchFishDetails();
    }, [id]);

    const handleBuyNow = () => {
        if (fish) {
            setBilling(fish.price);
        }
    };

    const placeOrder = async () => {
        const userEmail = localStorage.getItem('userEmail');

        if (!userEmail) {
            setError('User email is required to place an order.');
            return;
        }

        if (!address) {
            setError('Address is required to place an order.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('https://aquarium-shop-ltwi.onrender.com/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userEmail,
                    fishId: fish.id,
                    quantity: 1,
                    address,
                }),
            });

            if (response.ok) {
                setOrderPlaced(true);
                setBilling(null);
                setAddress('');
            } else {
                throw new Error('Failed to place order');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (error) return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-red-600 text-xl">{error}</p>
        </div>
    );

    if (!fish) return (
        <div className="flex justify-center items-center h-screen">
            <AiOutlineLoading className="text-4xl text-blue-500 animate-spin" />
            <p className="ml-4 text-lg">Loading...</p>
        </div>
    );

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">{fish.title}</h2>
                <img src={fish.image} alt={fish.title} className="w-full h-60 object-cover rounded-lg mt-4" />
                <p className="mt-4 text-gray-600">{fish.description}</p>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-extrabold text-gray-900">₹{fish.price.toFixed(2)}</span>
                    <button onClick={handleBuyNow} className="flex items-center p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                        <BiCartAlt className="text-lg mr-2" />
                        Buy Now
                    </button>
                </div>
            </div>
            {billing && (
                <div className="mt-6">
                    <p className="text-lg font-bold text-gray-900 text-center">Total Bill: ₹{billing.toFixed(2)}</p>
    
<input
    type="text"
    placeholder="Enter your address"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    className="mt-4 p-4 border-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md bg-gray-100"
    required
/>                    <button onClick={placeOrder} className="mt-4 w-full flex items-center justify-center p-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration-300">
                        {loading ? (
                            <div className="flex items-center">
                                <AiOutlineLoading className="text-lg animate-spin" />
                                <p className="ml-2 text-sm">Placing Order...</p>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <BiCheck className="text-lg mr-2" />
                                Place Order (COD)
                            </div>
                        )}
                    </button>
                </div>
            )}
            {orderPlaced && (
                <div className="flex justify-center items-center mt-4 text-green-600">
                    <RiCheckboxCircleLine className="text-4xl" />
                    <p className="ml-2 text-lg">Order placed successfully!</p>
                </div>
            )}
        </div>
    );
};

export default FishDetails;
