const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const JWT_SECRET = "votre_secret_jwt"; // Remplacez par votre secret JWT

exports.register = async (req, res) => {
  const { nom, email, mot_de_passe } = req.body;
  try {
    const hash = await bcrypt.hash(mot_de_passe, 10); // Hachage du mot de passe
    const user = await User.create({ nom, email, mot_de_passe: hash, role });
    res.status(201).json({ message: "Utilisateur créé avec succès", user });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, mot_de_passe } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé" });
    }
    const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Mot de passe ou login  incorrect" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Connexion réussie",
      token,
      user: {
        id: user.id,
        nom: user.nom,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
