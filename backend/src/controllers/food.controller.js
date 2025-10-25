const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');

async function createFood(req,res){
    const { v4: uuid } = await import('uuid');
    console.log('req.foodPartner:', req.foodPartner);
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);
    
    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());
    // console.log('fileUploadResult:', fileUploadResult);

    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    });

    res.status(201).json({ message: 'Food created successfully',food: foodItem });
}

async function getFoodItems(req,res){
    const foodItems = await foodModel.find({});
    res.status(200).json({ message: 'Food items retrieved successfully',foodItems });
}

async function getFoodItemsByFoodPartnerId(req, res) {
    const { foodPartnerId } = req.params;
    try {
        const foodItems = await foodModel.find({ foodPartner: foodPartnerId });
        res.status(200).json({ message: 'Food items retrieved successfully', foodItems });
    } catch (error) {
        console.error('Error fetching food items by food partner ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    createFood,
    getFoodItems,
    getFoodItemsByFoodPartnerId
}
