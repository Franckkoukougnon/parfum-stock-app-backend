const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/register", authController.register); // Route pour l'enregistrement d'un utilisateur
router.post("/login", authController.login); // Route pour la connexion d'un utilisateur

module.exports = router; // Exportation du routeur pour l'utiliser dans d'autres fichiers
