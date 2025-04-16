const express = require("express");
const router = express.Router();
const parfumConbtroller = require("../controllers/parfum.controller");
const upload = require("../middlewares/upload");
const {verifyToken, isAdmin} = require('../middlewares/authMiddleware')  //Protection des routes


router.get("/", parfumConbtroller.getAllParfums); // Get all parfums
router.get("/:id", parfumConbtroller.getParfumById); // Get a single parfum by ID
router.post("/",verifyToken,isAdmin, upload.single("image"), parfumConbtroller.createParfum); // Create a new parfum
router.delete("/:id",verifyToken,isAdmin, parfumConbtroller.deleteParfum); // Delete a parfum by ID
router.put("/:id",verifyToken,isAdmin, upload.single("image"), parfumConbtroller.updateParfum); // Update a parfum by ID with image upload

module.exports = router;
