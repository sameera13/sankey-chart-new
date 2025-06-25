const sqlite3 = require("sqlite3").verbose();
const XLSX = require("xlsx");
const db = new sqlite3.Database("./db/database.db");

// 1️⃣ Load the Excel file
const workbook = XLSX.readFile("./db/sankey_data.xlsx");   // <- your file
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(sheet);              // [{source:'id1', target:'create session', value:100, color:'#FF5733'}, ...]

db.serialize(() => {
  // 2️⃣ Re-create the table
  db.run("DROP TABLE IF EXISTS sankey_data");
  db.run(`
    CREATE TABLE sankey_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      source TEXT,
      target TEXT,
      value INTEGER,
      color TEXT
    )
  `);

  // 3️⃣ Bulk-insert without a manual loop using executemany-style string
  const placeholders = rows.map(() => "(?,?,?,?)").join(",");
  const flatValues   = rows.flatMap(r => [r.source, r.target, r.value, r.color]);

  db.run(
    `INSERT INTO sankey_data (source, target, value, color) VALUES ${placeholders}`,
    flatValues,
    err => {
      if (err) console.error(err.message);
      else     console.log("Seed complete from Excel.");
      db.close();
    }
  );
});
