import React from 'react';

const Categories = () => {
    // Sample JSON data with images
    const data = [
        {
            "category": "Fish Food",
            "items": [
                {
                    "id": 1,
                    "title": "Flake Food",
                    "description": "High-quality flakes for daily feeding.",
                    "image": "https://ik.imagekit.io/k5gvskw6y/Aquarium_Shop/fish%20photos/omega-one-shrimp%20-%20thumb.jpg?updatedAt=1728803426237"
                },
                {
                    "id": 2,
                    "title": "Pellet Food",
                    "description": "Nutritious pellets for larger fish.",
                    "image": "https://ik.imagekit.io/k5gvskw6y/Aquarium_Shop/fish%20photos/omegaone-goldfish-flakes%20-%20thumb.jpg?updatedAt=1728803426358"
                },
                {
                    "id": 2,
                    "title": "Pellet Food",
                    "description": "Nutritious pellets for larger fish.",
                    "image": "https://ik.imagekit.io/k5gvskw6y/Aquarium_Shop/fish%20photos/omegaone-goldfish-flakes%20-%20thumb.jpg?updatedAt=1728803426358"
                },
                {
                    "id": 2,
                    "title": "Pellet Food",
                    "description": "Nutritious pellets for larger fish.",
                    "image": "https://ik.imagekit.io/k5gvskw6y/Aquarium_Shop/fish%20photos/omegaone-goldfish-flakes%20-%20thumb.jpg?updatedAt=1728803426358"
                },
                {
                    "id": 2,
                    "title": "Pellet Food",
                    "description": "Nutritious pellets for larger fish.",
                    "image": "https://ik.imagekit.io/k5gvskw6y/Aquarium_Shop/fish%20photos/omegaone-goldfish-flakes%20-%20thumb.jpg?updatedAt=1728803426358"
                },
                {
                    "id": 2,
                    "title": "Pellet Food",
                    "description": "Nutritious pellets for larger fish.",
                    "image": "https://ik.imagekit.io/k5gvskw6y/Aquarium_Shop/fish%20photos/omegaone-goldfish-flakes%20-%20thumb.jpg?updatedAt=1728803426358"
                },
                {
                    "id": 2,
                    "title": "Pellet Food",
                    "description": "Nutritious pellets for larger fish.",
                    "image": "https://ik.imagekit.io/k5gvskw6y/Aquarium_Shop/fish%20photos/omegaone-goldfish-flakes%20-%20thumb.jpg?updatedAt=1728803426358"
                },
                {
                    "id": 2,
                    "title": "Pellet Food",
                    "description": "Nutritious pellets for larger fish.",
                    "image": "https://ik.imagekit.io/k5gvskw6y/Aquarium_Shop/fish%20photos/omegaone-goldfish-flakes%20-%20thumb.jpg?updatedAt=1728803426358"
                },
                
            ]
        },
        {
            "category": "Aquarium Kits",
            "items": [
                {
                    "id": 3,
                    "title": "Beginner Kit",
                    "description": "All-in-one kit for new aquarists.",
                    "image": "https://example.com/beginner-kit.jpg"
                },
                {
                    "id": 2,
                    "title": "Pellet Food",
                    "description": "Nutritious pellets for larger fish.",
                    "image": "https://ik.imagekit.io/k5gvskw6y/Aquarium_Shop/fish%20photos/omegaone-goldfish-flakes%20-%20thumb.jpg?updatedAt=1728803426358"
                },
                {
                    "id": 2,
                    "title": "Pellet Food",
                    "description": "Nutritious pellets for larger fish.",
                    "image": "https://ik.imagekit.io/k5gvskw6y/Aquarium_Shop/fish%20photos/omegaone-goldfish-flakes%20-%20thumb.jpg?updatedAt=1728803426358"
                },
                {
                    "id": 2,
                    "title": "Pellet Food",
                    "description": "Nutritious pellets for larger fish.",
                    "image": "https://ik.imagekit.io/k5gvskw6y/Aquarium_Shop/fish%20photos/omegaone-goldfish-flakes%20-%20thumb.jpg?updatedAt=1728803426358"
                },
                {
                    "id": 2,
                    "title": "Pellet Food",
                    "description": "Nutritious pellets for larger fish.",
                    "image": "https://ik.imagekit.io/k5gvskw6y/Aquarium_Shop/fish%20photos/omegaone-goldfish-flakes%20-%20thumb.jpg?updatedAt=1728803426358"
                },
                {
                    "id": 2,
                    "title": "Pellet Food",
                    "description": "Nutritious pellets for larger fish.",
                    "image": "https://ik.imagekit.io/k5gvskw6y/Aquarium_Shop/fish%20photos/omegaone-goldfish-flakes%20-%20thumb.jpg?updatedAt=1728803426358"
                },
                {
                    "id": 2,
                    "title": "Pellet Food",
                    "description": "Nutritious pellets for larger fish.",
                    "image": "https://ik.imagekit.io/k5gvskw6y/Aquarium_Shop/fish%20photos/omegaone-goldfish-flakes%20-%20thumb.jpg?updatedAt=1728803426358"
                },
                {
                    "id": 2,
                    "title": "Pellet Food",
                    "description": "Nutritious pellets for larger fish.",
                    "image": "https://ik.imagekit.io/k5gvskw6y/Aquarium_Shop/fish%20photos/omegaone-goldfish-flakes%20-%20thumb.jpg?updatedAt=1728803426358"
                },
                
            ]
        }
    ];

    // Constants for button text and colors
    const BUTTON_TEXT = "View Kit";
    const BUTTON_COLOR = "bg-green-500";
    const BG_COLOR = "bg-green-100";

    const CardComponent = ({ title, description, buttonText, bgColor, buttonColor, image }) => {
        return (
            <div className={`p-5 rounded-lg shadow-lg ${bgColor} hover:shadow-xl transition-shadow duration-300`}>
                <img src={image} alt={title} className="w-full h-32 object-cover rounded-t-lg mb-4" />
                <h2 className="text-2xl font-bold mb-3">{title}</h2>
                <p className="text-gray-700 mb-4">{description}</p>
                <button className={`text-white py-2 px-4 rounded ${buttonColor} hover:${buttonColor}-600 transition duration-300`}>
                    {buttonText}
                </button>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-5">
            {data.map(category => (
                <div key={category.category} className="mb-8">
                    <h1 className="text-3xl font-bold mb-4">{category.category}</h1>
                    <div className="flex flex-wrap justify-center">
                        {category.items.map(item => (
                            <div key={item.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-3">
                                <CardComponent 
                                    title={item.title} 
                                    description={item.description} 
                                    buttonText={category.category === "Aquarium Kits" ? BUTTON_TEXT : "Buy Now"}
                                    bgColor={BG_COLOR} 
                                    buttonColor={BUTTON_COLOR}
                                    image={item.image}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Categories;
