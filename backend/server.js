const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const app = express();
const PORT = 5050;

app.use(cors());

const db = new sqlite3.Database("./db/database.db");

app.get("/api/sankey", (req, res) => {
  db.all("SELECT * FROM sankey_data", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
app.get("/", (req, res) => {
    res.send("Backend API is working! Try /api/sankey");
  });
  
