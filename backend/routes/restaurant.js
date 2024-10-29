const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");
const checkPermissions = require("../middleware/authorization");

router.get("/top", restaurantController.handleGetPopularRestaurant);

module.exports = router;