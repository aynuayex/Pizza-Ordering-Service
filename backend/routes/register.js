const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");

router.post('/customer',registerController.handleRegisterCustomer);
router.post('/restaurant',registerController.handleRegisterRestaurant);
router.post('/admin',registerController.handleAddAdmin);

module.exports = router;
