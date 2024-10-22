const express = require("express");
const router = express.Router();
const menusController = require("../controllers/menusController");
const checkPermissions = require("../middleware/Authorization");

router.get("/popular", checkPermissions("read", "Pizza"), menusController.handleGetPopularPizza);
router.get("/fasting", checkPermissions("read", "Pizza"), menusController.handleGetPopularPizza);
router.post("/add_pizza", checkPermissions("create", "menu"), menusController.handleMenuCreate);

module.exports = router;
