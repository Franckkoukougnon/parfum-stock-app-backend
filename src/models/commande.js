const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");


const Commande = sequelize.define("Commande", {
    quantite: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    }, {
    tableName: "commandes",
    timestamps: true, // Ajoute les colonnes createdAt et updatedAt
})

module.exports = Commande;