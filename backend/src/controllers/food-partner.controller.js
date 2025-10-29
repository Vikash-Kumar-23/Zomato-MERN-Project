const foodPartnerModel = require('../models/foodpartner.model');
const foodModel = require('../models/food.model');

async function getFoodPartnerProfile(req, res) {
    const foodPartnerId = req.params.id;
    console.log('Received foodPartnerId:', foodPartnerId);
    try {
        const foodPartner = await foodPartnerModel.findById(foodPartnerId);
        const foodItems = await foodModel.find({ foodPartner: foodPartnerId });
        console.log('Food partner found:', foodPartner);
    if (!foodPartner) {
      // Return a stub profile for non-existent IDs to prevent 404 on frontend
      return res.status(200).json({
        foodPartner: {
          _id: req.params.id,
          name: "Unknown Partner",
          contactName: "",
          phone: "",
          address: "",
          email: "",
          customerServicePhone: "", // Default for stub
          customerServiceEmail: "", // Default for stub
          totalMeals: 0,
          customerServe: 0,
        },
      });
    }
    res.status(200).json({ foodPartner, foodItems });
    } catch (error) {
        console.error('Error in getFoodPartnerProfile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getAllFoodPartners(req, res) {
    try {
        const foodPartners = await foodPartnerModel.find({});
        res.status(200).json({ message: 'Food partners retrieved successfully', foodPartners });
    } catch (error) {
        console.error('Error fetching all food partners:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getFoodPartnerProfile,
    getAllFoodPartners,
}
