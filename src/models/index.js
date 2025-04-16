const sequelize = require("../config/db");
const Parfum = require('./parfum.model');
const User = require("./user");
const Commande = require("./commande");

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connexion à la base de données réussie 🚀");

    // Synchronisation des modèles avec la base de données
    await sequelize.sync({ alter: true }); // Set force to true to drop and recreate tables
    console.log("Modèles synchronisés avec succès ✅");
  } catch (error) {
    console.error("Erreur de connexion à la base de données ❌:", error);
  }
};

//Relations
User.hasMany(Commande, {foreignKey: "userId"});
Commande.belongsTo(User, {foreignKey: "userId"});

Parfum.hasMany(Commande, {foreignKey: "parfumId"});
Commande.belongsTo(Parfum, {foreignKey: "parfumId"});

module.exports = connectDB;
