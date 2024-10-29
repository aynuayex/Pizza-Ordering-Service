const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const registerController = require("../controllers/registerController");
const checkPermissions = require("../middleware/authorization");

router.get("/",checkPermissions("read", "roles"),userController.handleGetAllUsers);
router.post("/",checkPermissions("create", "users"),registerController.handleAddAdmin);
router.patch("/",checkPermissions("update", "roles"),userController.handleUserRoleChange);
router.patch("/status",checkPermissions("update", "roles"),userController.handleUserActiveStatus);
router.delete("/",checkPermissions("delete", "roles"),userController.handleUserDelete);

module.exports = router;