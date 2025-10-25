const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const foodPartnerController = require('../controllers/food-partner.controller');
const foodController = require('../controllers/food.controller');

const router = express.Router();

//GET /api/food-partner/:id
router.get('/:id', 
    foodPartnerController.getFoodPartnerProfile);

//GET /api/food-partner/:foodPartnerId/fooditems
router.get('/:foodPartnerId/fooditems', foodController.getFoodItemsByFoodPartnerId);

//GET /api/food-partner
router.get('/', foodPartnerController.getAllFoodPartners);

module.exports = router;