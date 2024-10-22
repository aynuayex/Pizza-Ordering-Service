const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const checkPermissions = require("../middleware/Authorization");

router.get("/",checkPermissions("read", "roles"),userController.handleGetAllUsers);
router.put("/",checkPermissions("update", "roles"),userController.handleUserActiveStatus);
router.delete("/",checkPermissions("delete", "roles"),userController.handleUserDelete);

module.exports = router;