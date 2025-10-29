const foodPartnerModel = require('../models/foodpartner.model');
const foodModel = require('../models/food.model');
const reviewModel = require('../models/review.model');
const mongoose = require('mongoose');

async function getFoodPartnerProfile(req, res) {
    const foodPartnerId = req.params.id;
    console.log('Received foodPartnerId:', foodPartnerId);
    try {
        const foodPartner = await foodPartnerModel.findById(foodPartnerId);
        const foodItems = await foodModel.find({ foodPartner: foodPartnerId });
        const reviews = await reviewModel
          .find({ foodPartner: foodPartnerId })
          .sort({ createdAt: -1 })
          .populate('user', 'fullName');
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
        foodItems: [],
        reviews: [],
      });
    }
    res.status(200).json({ foodPartner, foodItems, reviews });
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

async function createReview(req, res) {
  const partnerId = req.params.id;
  const { rating, comment } = req.body;
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (!mongoose.Types.ObjectId.isValid(partnerId)) {
      return res.status(400).json({ message: 'Invalid partner id' });
    }
    const r = Number(rating);
    if (!r || r < 1 || r > 5 || !comment || typeof comment !== 'string') {
      return res.status(400).json({ message: 'Invalid review data' });
    }
    const exists = await foodPartnerModel.findById(partnerId);
    if (!exists) {
      return res.status(404).json({ message: 'Food partner not found' });
    }
    const review = await reviewModel.create({
      foodPartner: partnerId,
      user: req.user._id,
      rating: r,
      comment,
    });
    res.status(201).json({ message: 'Review created successfully', review });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getReviews(req, res) {
  const partnerId = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(partnerId)) {
      return res.status(400).json({ message: 'Invalid partner id' });
    }
    const reviews = await reviewModel
      .find({ foodPartner: partnerId })
      .sort({ createdAt: -1 })
      .populate('user', 'fullName');
    res.status(200).json({ reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
    getFoodPartnerProfile,
    getAllFoodPartners,
    createReview,
    getReviews,
}
