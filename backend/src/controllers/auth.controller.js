const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    const { fullName, email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        //if user already exists
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create new user
        const newUser = await userModel.create({
            fullName,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({
            id: newUser._id,
        },process.env.JWT_SECRET)
        res.cookie("token",token)
        res.status(201).json({ message: 'User registered successfully',
            user:{
                _id:newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
            }
         });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        //if user does not exist
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        //if user exist
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        //if password is valid
        const token = jwt.sign({
            id: user._id,
        },process.env.JWT_SECRET)
        res.cookie("token",token)
        res.status(200).json({ message: 'User logged in successfully',
            user:{
                _id:user._id,
                fullName: user.fullName,
                email: user.email,
            }
         });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    registerUser,
    loginUser
}