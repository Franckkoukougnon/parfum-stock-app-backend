const Parfum = require("../models/parfum.model");
const fs = require("fs");
const path = require("path");

// Get all parfums
exports.getAllParfums = async (req, res) => {
  try {
    const parfums = await Parfum.findAll();
    res.json({
      message: "Parfums fetched successfully",
      nbre_items: parfums.length,
      data: parfums,
    });
  } catch (error) {
    console.error("Error fetching parfums:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single parfum by ID
exports.getParfumById = async (req, res) => {
  const { id } = req.params;
  try {
    const parfum = await Parfum.findByPk(id);
    if (!parfum) {
      return res.status(404).json({ message: "Parfum not found" });
    }
    res.json({
      message: "Parfum fetched successfully",
      data: parfum,
    });
  } catch (error) {
    console.error("Error fetching parfum:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new parfum
exports.createParfum = async (req, res) => {
  const { nom, marque, description, prix, stock } = req.body;
  const image = req.file ? req.file.path : null;
  try {
    const newParfum = await Parfum.create({
      nom,
      marque,
      description,
      prix,
      image,
      stock,
    });
    res.status(201).json({
      message: "Parfum created successfully",
      data: newParfum,
    });
  } catch (error) {
    console.error("Error creating parfum:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a parfum by ID
exports.updateParfum = async (req, res) => {
  try {
    const parfum = await Parfum.findByPk(req.params.id);
    if (!parfum) {
      return res.status(404).json({ message: "Parfum non trouvé" });
    }

    const { nom, marque, description, prix, stock } = req.body;
    let image = parfum.image; // Par défaut, on garde l'image existante

    // Si une nouvelle image est envoyée
    if (req.file) {
      if (image) {
        const oldImagePath = path.join(__dirname, "..", "uploads", image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Supprime l'ancienne image
        }
      }
      image = req.file.filename; // Nouvelle image
    }

    await parfum.update({
      nom: nom || parfum.nom,
      marque: marque || parfum.marque,
      description: description || parfum.description,
      prix: prix || parfum.prix,
      stock: stock || parfum.stock,
      image, // Nouveau nom d’image ou ancienne conservée
    });

    res.json({
      message: "Parfum mis à jour avec succès",
      data: parfum,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du parfum:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// Delete a parfum by ID
exports.deleteParfum = async (req, res) => {
  try {
    const parfum = await Parfum.findByPk(req.params.id);
    if (!parfum) {
      return res.status(404).json({ message: "Parfum non trouvé" });
    }
    await parfum.destroy();
    res.json({
      message: "Parfum deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting parfum:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
