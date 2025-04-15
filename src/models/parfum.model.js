const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Parfum = sequelize.define(
  "Parfum",
  {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marque: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    prix: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "parfums",
    timestamps: true, // Ajoute les colonnes createdAt et updatedAt
  }
);

module.exports = Parfum;
