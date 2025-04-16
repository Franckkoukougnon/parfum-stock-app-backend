const jwt = require("jsonwebtoken");


const verifyToken =(req, res, next) => {
    const autheader = req.headers["authorization"];
    const token = autheader && autheader.split(" ")[1]; // Récupérer le token de l'en-tête d'autorisation

    if (!token) {
        return res.status(401).json({ message: "Token manquant" });
    }
    try{
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded; // Stocker les informations de l'utilisateur décodées dans la requête
        next(); // Passer au middleware suivant ou à la route
    } catch(error) {
        console.error("Erreur de vérification du token :", error);
        return res.status(403).json({ message: "Token invalide" });
    }
}

const isAdmin = (req, res, next) => {
  if(req.user.role === "admin"){
      next();
  } else {
      return res.status(401).json({ message: "Token manquant" });
  }
}

module.exports ={verifyToken, isAdmin};