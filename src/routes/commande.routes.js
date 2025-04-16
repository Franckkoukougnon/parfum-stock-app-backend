const express = require("express");
const router = express.Router();
const commandeController = require("../controllers/commande.controller");
const upload = require("../middlewares/upload");
const {verifyToken} = require('../middlewares/authMiddleware');

router.post("/",verifyToken, upload.single("image"), commandeController.createCommande); // Create a new commande
router.get("/mycommande",verifyToken, commandeController.getCommandesClient); // Get all commandes


module.exports = router;