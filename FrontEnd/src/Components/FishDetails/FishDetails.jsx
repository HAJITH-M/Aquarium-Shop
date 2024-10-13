// FishDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FishDetails = () => {
    const { id } = useParams(); // Get the fish ID from the URL
    const [fish, setFish] = useState(null);
    const [error, setError] = useState('');

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

    if (error) return <p className="text-red-600">{error}</p>;
    if (!fish) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">{fish.title}</h2>
            <img src={fish.image} alt={fish.title} className="w-full h-60 object-cover" />
            <p className="mt-4">{fish.description}</p>
            <span className="text-xl font-extrabold text-gray-900">₹{fish.price.toFixed(2)}</span>
            {/* You can add a button to add to cart or buy here */}
        </div>
    );
};

export default FishDetails;
