import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AiOutlineLoading } from 'react-icons/ai';
import { RiCheckboxCircleLine } from 'react-icons/ri';
import { BiCartAlt, BiCheck } from 'react-icons/bi';
import { FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FishDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [fish, setFish] = useState(null);
    const [error, setError] = useState('');
    const [billing, setBilling] = useState(null);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);

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
                toast.success('Order placed successfully!');
            } else {
                throw new Error('Failed to place order');
            }
        } catch (error) {
            setError(error.message);
            toast.error('Error placing order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const renderStructuredDescription = (description) => {
        if (!description) return null;

        const sections = [
            { title: "Features", content: description.split("Features:")[1]?.split("Care Instructions:")[0] || "" },
            { title: "Care Instructions", content: description.split("Care Instructions:")[1]?.split("Why Choose Albino Oscar Fish?")[0] || "" },
            { title: "Why Choose Albino Oscar Fish?", content: description.split("Why Choose Albino Oscar Fish?")[1] || "" }
        ];

        return (
            <div className="space-y-4">
                {sections.map((section, index) => (
                    section.content && (
                        <div key={index}>
                            <h4 className="text-lg font-bold mb-2">{section.title}</h4>
                            <ul className="list-disc pl-5 space-y-2">
                                {section.content.split("\n").filter(item => item.trim() !== "").map((item, idx) => (
                                    <li key={idx} dangerouslySetInnerHTML={{__html: item.replace(/(\w+):/g, '<strong>$1:</strong>')}} />
                                ))}
                            </ul>
                        </div>
                    )
                ))}
            </div>
        );
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
        <div className="max-w-3xl mt-8 mx-auto p-6 bg-white rounded-lg shadow-md">
            <ToastContainer />
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">{fish.title}</h2>
                <img src={fish.image} alt={fish.title} className="w-60 flex justify-center  h-60 object-cover rounded-lg mt-4" />
                <div className="mt-4">
                    {showFullDescription ? (
                        <div className="text-left">
                            {renderStructuredDescription(fish.description)}
                            <button onClick={() => setShowFullDescription(false)} className="mt-4 text-blue-500 hover:text-blue-700">
                                Show Less
                            </button>
                        </div>
                    ) : (
                        <div>
                            <p className="text-gray-600">{fish.description.split(' ').slice(0, 30).join(' ')}...</p>
                            <button onClick={() => setShowFullDescription(true)} className="mt-2 text-blue-500 hover:text-blue-700">
                                Read More
                            </button>
                        </div>
                    )}
                </div>
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
                    />
                    <button onClick={placeOrder} className="mt-4 w-full flex items-center justify-center p-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration-300">
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