const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const prisma = new PrismaClient();

app.use(cors({
    origin: '*', // Adjust based on your frontend's origin
}));

app.use(bodyParser.json());

const JWT_SECRET = 'your_jwt_secret'; // Change this to a secure secret

// POST: Signup
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Hash the password (if using bcrypt)
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
        res.status(200).json({ token: 'your_generated_token' });
    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({ error: 'Failed to sign in' });
    }
});

// Existing routes...


// POST: Create new fish details
app.post('/fish', async (req, res) => {
    const fishArray = req.body; // Expecting either an array or a single fish object

    // If the input is not an array, wrap it in an array
    const fishData = Array.isArray(fishArray) ? fishArray : [fishArray];

    try {
        const fishPromises = fishData.map(fish => 
            prisma.fishDetails.create({
                data: fish,
            })
        );
        const fishRecords = await Promise.all(fishPromises);
        res.status(201).json(fishRecords);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

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
  


// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
