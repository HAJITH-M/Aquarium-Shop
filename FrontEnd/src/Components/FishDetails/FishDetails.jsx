import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FishDetails = () => {
    const { id } = useParams();
    const [fish, setFish] = useState(null);
    const [error, setError] = useState('');
    const [billing, setBilling] = useState(null);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [address, setAddress] = useState(''); // State for address input

    const fetchFishDetails = async () => {
        try {
            const response = await fetch(`http://localhost:4000/fish/${id}`);
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

        try {
            const response = await fetch('http://localhost:4000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userEmail,
                    fishId: fish.id,
                    quantity: 1,
                    address, // Include address in the order
                }),
            });

            if (response.ok) {
                setOrderPlaced(true);
                setBilling(null); // Reset billing after order is placed
                setAddress(''); // Reset address after order is placed
            } else {
                throw new Error('Failed to place order');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    if (error) return <p className="text-red-600">{error}</p>;
    if (!fish) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">{fish.title}</h2>
            <img src={fish.image} alt={fish.title} className="w-full h-60 object-cover" />
            <p className="mt-4">{fish.description}</p>
            <span className="text-xl font-extrabold text-gray-900">₹{fish.price.toFixed(2)}</span>
            <button onClick={handleBuyNow} className="mt-4 p-2 bg-blue-500 text-white">Buy Now</button>

            {billing && (
                <div className="mt-4">
                    <p>Total Bill: ₹{billing.toFixed(2)}</p>
                    <input
                        type="text"
                        placeholder="Enter your address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="mt-2 p-2 border rounded"
                        required
                    />
                    <button onClick={placeOrder} className="mt-2 p-2 bg-green-500 text-white">Place Order (COD)</button>
                </div>
            )}

            {orderPlaced && <p className="text-green-600">Order placed successfully!</p>}
        </div>
    );
};

export default FishDetails;
