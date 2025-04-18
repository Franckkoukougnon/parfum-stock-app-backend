const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/auth.routes");
const parfumRoutes = require("./src/routes/parfum.routes");
const commandeRoutes = require("./src/routes/commande.routes");
const connectDB = require("./src/models/index");

const app = express();
const PORT = process.env.PORT || 3005;
require("dotenv").config();

require("dotenv").config();
// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/commandes",commandeRoutes )
app.use("/api/parfums", parfumRoutes); // Use parfum routes
app.use("/uploads", express.static("uploads")); // Serve static files from the uploads directory
app.use("/api/auth", authRoutes)

//Test route
app.get("/api/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});
