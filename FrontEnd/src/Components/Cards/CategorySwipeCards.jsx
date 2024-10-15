import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategorySwipeCards = () => {
    const [categories, setCategories] = useState([]);
    const [fishDetails, setFishDetails] = useState({});
    const navigate = useNavigate();

    const handleAddToCart = async (product) => {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
            return navigate('/login');
        }
    
        try {
            const response = await fetch('https://aquarium-shop-ltwi.onrender.com/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userEmail,
                    fishId: product.id,
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to add to cart: ${errorData.error || response.statusText}`);
            }
    
            const cartItem = await response.json();
            console.log('Cart updated:', cartItem);
            toast.success(`${product.title} added to cart!`);
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error('Error adding to cart. Please try again.');
        }
    };

    const handleBuyNow = (product) => {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            navigate(`/fish/${product.id}`);
        } else {
            navigate('/login');
        }
    };

    const fetchFishDetails = async () => {
        try {
            const response = await fetch('https://aquarium-shop-ltwi.onrender.com/fish');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            const groupedFish = {};
            data.forEach(fish => {
                if (!groupedFish[fish.categoryId]) {
                    groupedFish[fish.categoryId] = [];
                }
                groupedFish[fish.categoryId].push(fish);
            });
            setFishDetails(groupedFish);
        } catch (error) {
            console.error('Error fetching fish details:', error.message);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://aquarium-shop-ltwi.onrender.com/categories');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error.message);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchFishDetails();
    }, []);

    return (
        <div className="overflow-x-auto scrollbar-hide mb-4 relative px-2 md:px-8 example mx-auto">
            <ToastContainer />
            {categories.map(category => (
                <div key={category.id} className="mb-6">
                    <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
                    <div className="flex snap-x snap-mandatory gap-4 md:gap-6" style={{ width: 'max-content' }}>
                        {fishDetails[category.id]?.map((card) => (
                            <div key={card.id} className="flex-none w-64 snap-center sm:w-80 md:w-64">
                                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-4 shadow-md">
                                    <img src={card.image} alt={card.title} className="w-full h-40 object-cover" />
                                    <div className="p-4">
                                        <h3 className="text-lg leading-6 font-bold text-gray-900">{card.title}</h3>
                                        <p className="text-gray-600 mt-2 text-sm">{card.description}</p>
                                        <div className="flex flex-col space-y-4 justify-between mt-4">
                                            <span className="text-xl font-extrabold text-gray-900">₹{card.price.toFixed(2)}</span>
                                            <div className="flex space-x-8">
                                                <button
                                                    onClick={() => handleAddToCart(card)}
                                                    className="text-white bg-fuchsia-950 hover:bg-fuchsia-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-3"
                                                >
                                                    Add to Cart
                                                </button>
                                                <button
                                                    onClick={() => handleBuyNow(card)}
                                                    className="text-white bg-green-600 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-3"
                                                >
                                                    Buy Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CategorySwipeCards;
