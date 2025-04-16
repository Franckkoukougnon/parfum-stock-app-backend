const Parfum = require("../models/parfum.model");

const decrementationStockParfum = async (parfumId, quantite)=>{
    const parfum = await Parfum.findByPk(parfumId);
    console.log("parfum nom "+parfum.nom);
    if (!parfum) {
        throw new Error("Parfum non trouvé");
    }
    if (parfum.stock < quantite) {
        throw new Error("Stock insuffisant");
    }

    parfum.stock -= quantite;
    await parfum.save();

    return parfum;
}

module.exports = { decrementationStockParfum };