const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "holy_city"
});

app.post("/api/reservations", (req, res) => {
  const { nom, email, type, date, heure, details } = req.body;

  const sql = "INSERT INTO reservations (nom, email, type, date, heure, details) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [nom, email, type, date, heure, details], (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur lors de l'enregistrement" });
    res.status(200).json({ message: "Réservation enregistrée !" });
  });
});

app.listen(3000, () => {
  console.log("Serveur démarré sur le port 3000");
});
