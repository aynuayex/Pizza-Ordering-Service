const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");
const checkPermissions = require("../middleware/authorization");

router.get("/",checkPermissions("read", "Orders"),ordersController.handleGetAllOrders);
// should be specifically there own only, read order history 
router.get("/history",checkPermissions("read", "Orders"),ordersController.handleGetOrderHistory);
router.post("/", checkPermissions("create", "Order"), ordersController.handleOrderCreate);
router.patch("/status", checkPermissions("update", "Order"), ordersController.handleOrderStatusUpdate);

module.exports = router;
