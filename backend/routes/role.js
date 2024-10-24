const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");
const checkPermissions = require("../middleware/Authorization");

router.get("/",checkPermissions("read", "roles"),roleController.handleGetAllRoles);
router.post("/",checkPermissions("create", "roles"),roleController.handleRoleCreateOrUpdate);
router.patch("/",checkPermissions("update", "roles"),roleController.handleRoleCreateOrUpdate);
router.patch("/status",checkPermissions("update", "roles"),roleController.handleRoleActiveStatus);
router.delete("/",checkPermissions("delete", "roles"),roleController.handleRoleDelete);

module.exports = router;