const foodModel = require('../models/food.model');
async function createFood(req,res){
    console.log(req.foodPartner);
    console.log(req.body);
    console.log(req.file);
    res.status(201).json({ message: 'Food created successfully' });
}

module.exports = {
    createFood
}
