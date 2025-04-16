const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();



exports.register = async (req, res) => {
  try{
    const {nom, email, mot_de_passe} = req.body;

    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ where: { email } });
    if(userExists) {
      return res.status(400).json({ message: "Cet utilisateur existe déjà" });
    }
    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    console.log('hashedPassword  --->', hashedPassword);
    // Créer un nouvel utilisateur
    const newUser = await User.create({
      nom: nom,
      email,
      mot_de_passe: hashedPassword,
    });

    res.status(201).json({
        message: "Utilisateur créé avec succès",
        user: {
            id: newUser.id,
            nom: newUser.nom,
            email: newUser.email,
            role: newUser.role,
        },
    });

  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'utilisateur :", error);
    res.status(500).json({ message: "Erreur lors de l'enregistrement de l'utilisateur" });
  }
}

exports.login = async (req,res) =>{
  try{
    const {email, mot_de_passe} = req.body;

    // Verifier si l'utilisateur existe
    const user = await User.findOne({ where: { email } });

    if(!user){
      return res.status(401).json({
        message: "Utilisateur non trouvé",
      })
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if(!isPasswordValid){
      return  res.status(401).json({
        message: "Mot de passe incorrect",
      })
    }

    // Créer un token
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.SECRET,
        { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Connexion réussie",
      user: {
        id: user.id,
        nom: user.nom,
        email: user.email,
        role: user.role,
      },
      token,
    });
  }catch(err){
    console.error("Erreur lors de la connexion :", err);
    res.status(500).json({ message: "Erreur lors de la connexion" });
  }
}

exports.logout = async (req,res) =>{
    try {
        // Invalider le token (si vous utilisez une stratégie de stockage de tokens)
        // Par exemple, vous pouvez supprimer le token du stockage côté client
      res.clearCookie("token");
        res.status(200).json({ message: "Déconnexion réussie" });
    } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
        res.status(500).json({ message: "Erreur lors de la déconnexion" });
    }
}