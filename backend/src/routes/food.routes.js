const express = require('express');
const foodController = require('../controllers/food.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });
//psst --> /api/food/[protected]
router.post('/', authMiddleware.authFoodPartnerMiddleware, upload.single('video'), foodController.createFood);


module.exports = router;