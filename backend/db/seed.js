const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/database.db");

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS sankey_data");

  db.run(`
    CREATE TABLE sankey_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      source TEXT,
      target TEXT,
      value INTEGER
    )
  `);

  const stmt = db.prepare("INSERT INTO sankey_data (source, target, value) VALUES (?, ?, ?)");

  const dummyData = [
    ["Start", "Checkpoint A", 100],
    ["Checkpoint A", "Checkpoint B", 80],
    ["Checkpoint B", "End", 60],
    ["Checkpoint A", "End", 20],
    ["Start", "Checkpoint C", 40],
    ["Checkpoint C", "End", 30]
  ];

  dummyData.forEach(([s, t, v]) => {
    stmt.run(s, t, v);
  });

  stmt.finalize();
  console.log("Seed complete.");
});

db.close();
