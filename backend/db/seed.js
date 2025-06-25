const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/database.db");

db.serialize(() => {
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

  const dummyData = [
    // Flow 1: id1 → create session → validate session → create order
    ["id1", "create session", 100, "#FF5733"],
    ["id2", "create session", 100, "#FF5733"],
    ["create session", "validate session", 80, "#FF5733"],
    ["validate session", "create order", 60, "#FF5733"],
  
    // Flow 2: create order → get products → save products
    ["create order", "get products", 40, "#33C1FF"],
    ["get products", "save products", 30, "#33C1FF"],
  
    // Flow 3: save products → submit order
    ["save products", "submit order", 20, "#75FF33"]
  ];

  const stmt = db.prepare("INSERT INTO sankey_data (source, target, value, color) VALUES (?, ?, ?, ?)");
  dummyData.forEach(([s, t, v, c]) => {
    stmt.run(s, t, v, c);
  });
  stmt.finalize();

  console.log("Seed complete.");
});

db.close();
