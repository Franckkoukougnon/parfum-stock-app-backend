
const Commande = require("../models/commande");
const Parfum = require("../models/parfum.model");
const { decrementationStockParfum } = require("../service/parfumService");



// Fonction pour créer une commande
exports.createCommande = async(req, res) =>{

    try{

       const { parfumId, quantite } = req.body;

       // On verifie  et decremente le stock  via le service
         const parfum = await decrementationStockParfum(parfumId, quantite);

         const total = parfum.prix * quantite;

        const commande = await Commande.create({
            parfumId,
            userId: req.user.id,
            quantite,
            total,
        });

        res.status(201).json({
            message: "Commande créée avec succès",
            commande: {
                id: commande.id,
                parfumId,
                nom : parfum.nom,
                userId: req.user.id,
                quantite,
                total,
            },
        });

    } catch (error){
        console.error("Erreur lors de la création de la commande :", error);
        res.status(500).json({ message: "Erreur lors de la création de la commande" });
    }
}



exports.getCommandesClient = async (req, res) =>{
    try{
        const commandes = await Commande.findAll({
            where: { userId: req.user.id }, // utilisateur connecté
            include: [
                {
                    model: Parfum,
                    attributes: ["nom", "marque", "prix", "image"]
                }
            ],
            order: [["createdAt", "DESC"]],
        });

        res.json({ commandes });
    } catch (error){
        console.error("Erreur lors de la récupération des commandes :", error);
        res.status(500).json({ message: "Erreur lors de la récupération des commandes" });
    }
}






