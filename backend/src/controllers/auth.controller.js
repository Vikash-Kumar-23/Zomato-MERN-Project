const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodpartner.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    console.log('Register User Request Body:', req.body); // Add this line
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
        res.cookie("token",token, {httpOnly:true,sameSite:'None',secure:true})
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
        res.cookie("token",token, {httpOnly:true,sameSite:'None',secure:true})
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

function logoutUser(req, res) {
    res.clearCookie("token")
    res.status(200).json({ message: 'User logged out successfully' });
}

async function registerFoodPartner(req, res) {
    const { name, email, password } = req.body;
    try {
        const foodPartner = await foodPartnerModel.findOne({ email });
        //if food partner already exists
        if (foodPartner) {
            return res.status(400).json({ message: 'Food partner already exists' });
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create new food partner
        const newFoodPartner = await foodPartnerModel.create({
            name,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({
            id: newFoodPartner._id,
        },process.env.JWT_SECRET)
        res.cookie("token",token, {httpOnly:true,sameSite:'None',secure:true})
        res.status(201).json({ message: 'Food partner registered successfully',
            foodPartner:{
                _id:newFoodPartner._id,
                name: newFoodPartner.name,
                email: newFoodPartner.email,
            }
         });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function loginFoodPartner(req, res) {
    const { email, password } = req.body;
    try {
        const foodPartner = await foodPartnerModel.findOne({ email });
        //if food partner does not exist
        if (!foodPartner) {
            return res.status(400).json({ message: 'Food partner does not exist' });
        }
        //if food partner exist
        const isPasswordValid = await bcrypt.compare(password, foodPartner.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        //if password is valid
        const token = jwt.sign({
            id: foodPartner._id,
        },process.env.JWT_SECRET)
        res.cookie("token",token, {httpOnly:true,sameSite:'None',secure:true})
        res.status(200).json({ message: 'Food partner logged in successfully',
            foodPartner:{
                _id:foodPartner._id,
                name: foodPartner.name,
                email: foodPartner.email,
            }
         });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

function logoutFoodPartner(req, res) {
    res.clearCookie("token")
    res.status(200).json({ message: 'Food partner logged out successfully' });
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}