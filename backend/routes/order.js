const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");
const checkPermissions = require("../middleware/Authorization");

router.get("/",checkPermissions("read", "orders"),ordersController.handleGetAllOrders);
router.post("/", checkPermissions("create", "Order"), ordersController.handleOrderCreate);
router.patch("/status", checkPermissions("update", "Order"), ordersController.handleOrderStatusUpdate);

module.exports = router;
