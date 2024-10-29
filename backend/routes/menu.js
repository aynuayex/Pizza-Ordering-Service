const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const menusController = require("../controllers/menusController");
const checkPermissions = require("../middleware/authorization");

// router.get("/popular", checkPermissions("read", "Pizza"), menusController.handleGetPopularPizza);
router.get("/popular", menusController.handleGetPopularPizza);
// router.get("/fasting", menusController.handleGetPopularPizza);
// router.get("/featured", menusController.handleGetPopularPizza);
router.post("/add_pizza", verifyJWT, checkPermissions("create", "menu"), menusController.handleMenuCreate);

module.exports = router;
