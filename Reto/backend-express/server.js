const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// 📁 Conexión con SQLite
const db = new sqlite3.Database("./vehiculos.db", (err) => {
  if (err) {
    console.error("❌ Error al conectar con la base de datos:", err.message);
  } else {
    console.log("✅ Conectado a la base de datos SQLite.");
  }
});

// 🧱 Crear tabla si no existe
db.run(`
  CREATE TABLE IF NOT EXISTS vehiculos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    placa TEXT NOT NULL,
    modelo TEXT NOT NULL,
    cedula_dueno TEXT NOT NULL,
    bandera BOOLEAN DEFAULT 1
  )
`);

// 🚗 Crear nuevo vehículo (entrada)
app.post("/api/vehiculos", (req, res) => {
  const { placa, modelo, cedula_dueno } = req.body;
  if (!placa || !modelo || !cedula_dueno) {
    return res.status(400).json({ error: "Faltan datos del vehículo" });
  }

  const sql = `INSERT INTO vehiculos (placa, modelo, cedula_dueno, bandera) VALUES (?, ?, ?, 1)`;
  db.run(sql, [placa, modelo, cedula_dueno], function (err) {
    if (err) {
      console.error("❌ Error al insertar:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res
      .status(201)
      .json({ id: this.lastID, placa, modelo, cedula_dueno, bandera: true });
  });
});

// 📋 Listar todos los vehículos
app.get("/api/vehiculos", (req, res) => {
  db.all(`SELECT * FROM vehiculos`, [], (err, rows) => {
    if (err) {
      console.error("❌ Error al consultar:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// 🚪 Actualizar bandera (por ejemplo, al salir del parqueadero)
app.put("/api/vehiculos/:id/salida", (req, res) => {
  const { id } = req.params;
  const sql = `UPDATE vehiculos SET bandera = 0 WHERE id = ?`;
  db.run(sql, [id], function (err) {
    if (err) {
      console.error("❌ Error al actualizar:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ id, bandera: false });
  });
});

// 🗑️ Eliminar registro
app.delete("/api/vehiculos/:id", (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM vehiculos WHERE id = ?`, [id], function (err) {
    if (err) {
      console.error("❌ Error al eliminar:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ mensaje: "Vehículo eliminado correctamente" });
  });
});

// 🟢 Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
