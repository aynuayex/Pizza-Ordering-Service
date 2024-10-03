const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");
const rentalsController = require("../controllers/rentalsController");
const earningsController = require("../controllers/earningsController");
const checkPermissions = require("../middleware/Authorization");

router.get("/",checkPermissions("read", "roles"),roleController.handleGetAllRoles);

module.exports = router;