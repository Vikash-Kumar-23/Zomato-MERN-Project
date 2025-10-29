const foodModel = require('../models/food.model');

async function createFood(req, res) {
  try {
    const { name, description } = req.body;

    if (!req.foodPartner) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'Invalid name' });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'Video file is required' });
    }

    const filename = req.file.filename;
    const videoUrl = `${req.protocol}://${req.get('host')}/uploads/videos/${filename}`;

    const foodItem = await foodModel.create({
      name,
      description,
      video: videoUrl,
      foodPartner: req.foodPartner._id,
    });

    res.status(201).json({ message: 'Food created successfully', food: foodItem });
  } catch (error) {
    console.error('Error creating food:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
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
