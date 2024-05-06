const bcrypt = require('bcrypt');
const User = require('../model/user');
const jwt = require('jsonwebtoken'); // You need to install this package

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Store this securely

// Register User
exports.registerUser = async (req, res) => {
    try {
        const { email, password, pseudo } = req.body;
        if (!email || !password || !pseudo) {
            return res.status(400).json({ error: 'Missing fields' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ ...req.body, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ error: 'Email or pseudo already exists' });
        }
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ message: 'Login successful', token });
        } else {
            res.status(400).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
