const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// require('dotenv').config(); // Load environment variables from a .env file

const app = express();
const prisma = new PrismaClient();

app.use(cors({
    origin: '*', // Adjust based on your frontend's origin
}));

app.use(bodyParser.json());


// Create a transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
        user: "wpage2098@gmail.com", // Your email address
        pass: "tuab eqkt qbrm xeif", // Your email password
    },
});

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Change this to a secure secret

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header
    if (token) {
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) return res.sendStatus(403); // Forbidden
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
};

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});

// POST: Signup
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        res.status(201).json(user);
    } catch (error) {
        console.error('Signup error:', error); 
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// POST: Signin
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate and return a token here (e.g., JWT)
        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({ error: 'Failed to sign in' });
    }
});

// // POST: Create new fish details
// app.post('/fish', async (req, res) => {
//     const fishArray = req.body;

//     const fishData = Array.isArray(fishArray) ? fishArray : [fishArray];

//     try {
//         const fishPromises = fishData.map(fish => 
//             prisma.fishDetails.create({ data: fish })
//         );
//         const fishRecords = await Promise.all(fishPromises);
//         res.status(201).json(fishRecords);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: error.message });
//     }
// });

// GET: Display all fish details
app.get('/fish', async (req, res) => {
    try {
        const fishList = await prisma.fishDetails.findMany();
        res.status(200).json(fishList);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve fish details' });
    }
});

// GET: Display fish details by ID
app.get('/fish/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const fish = await prisma.fishDetails.findUnique({ where: { id: Number(id) } });
        if (!fish) return res.status(404).json({ error: 'Fish not found' });
        res.status(200).json(fish);
    } catch (error) {
        console.error('Error fetching fish details:', error);
        res.status(500).json({ error: 'Failed to retrieve fish details' });
    }
});

// POST: Add item to cart
app.post('/cart', async (req, res) => {
    const { userEmail, fishId } = req.body; // Get userEmail and fishId from the request body

    try {
        const existingItems = await prisma.cartItem.findMany({
            where: {
                userEmail: userEmail,
                fishId: fishId,
            },
        });

        if (existingItems.length > 0) {
            const updatedItem = await prisma.cartItem.update({
                where: { id: existingItems[0].id }, // Update the first found item
                data: { quantity: existingItems[0].quantity + 1 },
            });
            return res.status(200).json(updatedItem);
        }

        const cartItem = await prisma.cartItem.create({
            data: {
                userEmail,
                fishId,
                quantity: 1,
            },
        });
        res.status(201).json(cartItem);
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'Failed to add to cart' });
    }
});


// GET: Retrieve user's cart items
app.get('/cart', async (req, res) => {
    const userEmail = req.query.userEmail; // Expect the userEmail to be sent as a query parameter

    try {
        const cartItems = await prisma.cartItem.findMany({
            where: { userEmail },
            include: { fish: true }, // Include fish details
        });
        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error retrieving cart:', error);
        res.status(500).json({ error: 'Failed to retrieve cart' });
    }
});


// DELETE: Remove item from cart
app.delete('/cart/:id', authenticateJWT, async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.cartItem.delete({ where: { id: Number(id) } });
        res.status(204).send(); // No content to return
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ error: 'Failed to remove item from cart' });
    }
});

// PATCH: Increase item quantity in cart
app.patch('/cart/:id', async (req, res) => {
    const { id } = req.params; // Get the cart item ID
    const userEmail = req.query.userEmail; // Get the user email from query parameters

    try {
        const updatedItem = await prisma.cartItem.update({
            where: { id: parseInt(id) }, // Assuming `id` is an integer
            data: {
                quantity: {
                    increment: 1, // Increase the quantity by 1
                },
            },
        });
        res.status(200).json(updatedItem);
    } catch (error) {
        console.error('Error updating quantity:', error);
        res.status(500).json({ error: 'Failed to update quantity' });
    }
});

// PATCH: Decrease item quantity in cart
app.patch('/cart/decrease/:id', async (req, res) => {
    const { id } = req.params; // Get the cart item ID
    const userEmail = req.query.userEmail; // Get the user email from query parameters

    try {
        const item = await prisma.cartItem.findUnique({
            where: { id: parseInt(id) },
        });

        if (item.quantity > 1) {
            const updatedItem = await prisma.cartItem.update({
                where: { id: parseInt(id) },
                data: {
                    quantity: {
                        decrement: 1, // Decrease the quantity by 1
                    },
                },
            });
            res.status(200).json(updatedItem);
        } else {
            // If quantity is 1, remove the item instead
            await prisma.cartItem.delete({
                where: { id: parseInt(id) },
            });
            res.status(200).json({ message: 'Item removed from cart' });
        }
    } catch (error) {
        console.error('Error decreasing quantity:', error);
        res.status(500).json({ error: 'Failed to update quantity' });
    }
});


// DELETE: Remove item from cart
app.delete('/cart/remove/:id', async (req, res) => {
    const { id } = req.params;
    const userEmail = req.query.userEmail;

    if (!userEmail) {
        return res.status(401).json({ error: 'User email is required' });
    }

    try {
        const cartItem = await prisma.cartItem.findUnique({ where: { id: Number(id) } });

        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        if (cartItem.userEmail !== userEmail) {
            return res.status(403).json({ error: 'You do not have permission to delete this item' });
        }

        await prisma.cartItem.delete({ where: { id: Number(id) } });
        res.status(204).send(); // No content to return
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ error: error.message || 'Failed to remove item from cart' });
    }
});

// POST: Place an order
// app.post('/orders', async (req, res) => {
//     const { userEmail, fishId, quantity } = req.body;

//     try {
//         // Validate that the user exists
//         const user = await prisma.user.findUnique({ where: { email: userEmail } });
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Validate that the fish exists
//         const fish = await prisma.fishDetails.findUnique({ where: { id: fishId } });
//         if (!fish) {
//             return res.status(404).json({ error: 'Fish not found' });
//         }

//         // Create the order
//         const order = await prisma.order.create({
//             data: {
//                 userEmail,
//                 fishId,
//                 quantity,
//             },
//         });

//         res.status(201).json(order);
//     } catch (error) {
//         console.error('Error placing order:', error);
//         res.status(500).json({ error: 'Failed to place order' });
//     }
// });

// POST: Place an order
// POST: Place an order
app.post('/orders', async (req, res) => {
    const { userEmail, fishId, quantity, address } = req.body; // Include address

    try {
        // Validate that the user exists
        const user = await prisma.user.findUnique({ where: { email: userEmail } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Validate that the fish exists
        const fish = await prisma.fishDetails.findUnique({ where: { id: fishId } });
        if (!fish) {
            return res.status(404).json({ error: 'Fish not found' });
        }

        // Create the order
        const order = await prisma.order.create({
            data: {
                userEmail,
                fishId,
                quantity,
                address, // Save the address
            },
        });

        // Send email notification
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: 'Order Confirmation',
            text: `Your order has been placed successfully!\n\nOrder Details:\nFish: ${fish.title}\nQuantity: ${quantity}\nAddress: ${address}\nTotal Price: ₹${(fish.price * quantity).toFixed(2)}\n\nThank you for your purchase!`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ error: 'Order placed, but failed to send email' });
            }
            console.log('Email sent:', info.response);
        });

        res.status(201).json(order);
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ error: 'Failed to place order' });
    }
});


// POST: Create a new category
app.post('/categories', async (req, res) => {
    const { name } = req.body;

    try {
        const category = await prisma.category.create({
            data: { name },
        });
        res.status(201).json(category);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Failed to create category' });
    }
});

// GET: Retrieve all categories
app.get('/categories', async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});


// POST: Create new fish details
app.post('/fish', async (req, res) => {
    const { image, title, description, price, link, categoryId } = req.body;

    try {
        const fishDetails = await prisma.fishDetails.create({
            data: {
                image,
                title,
                description,
                price,
                link,
                categoryId, // Optional foreign key
            },
        });
        res.status(201).json(fishDetails);
    } catch (error) {
        console.error('Error creating fish details:', error);
        res.status(500).json({ error: 'Failed to create fish details' });
    }
});


// GET: Retrieve all orders
app.get('/orders', async (req, res) => {
    const userEmail = req.headers['useremail']; // Get email from headers

    if (!userEmail) {
        return res.status(401).json({ error: 'Unauthorized: No email provided' });
    }

    try {
        const orders = await prisma.order.findMany({
            where: { userEmail: userEmail },
            include: { fish: true }, // Include fish details if necessary
        });
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});



// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});