const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error("Error when opening database: ", err.message);
    } else {
        console.log("Database connection was successful.");
        
        // Tábla létrehozása a feladatoknak
        db.run(`CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            status TEXT DEFAULT 'todo',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
    }
});

module.exports = db;