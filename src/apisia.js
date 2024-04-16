import express from "express";
import { connection } from "./db.js";

const app = express();

app.get("/", (req, res) => {
  connection.query("SELECT * FROM alimento", (err, rows) => {
    if (err) {
      console.error("Error de consulta:", err);
      return res.status(500).send("Error de servidor");
    }
    res.json(rows);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
});
