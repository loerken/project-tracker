const express = require('express');
const path = require('path');
const db = require('./database');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/tasks', (req, res) => {
    const sql = "SELECT * FROM tasks ORDER BY created_at DESC";
    
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

app.post('/api/tasks', (req, res) => {
    const { title, description } = req.body;
    
    if (!title) {
        res.status(400).json({ "error": "Title is mandatory!" });
        return;
    }

    const sql = 'INSERT INTO tasks (title, description) VALUES (?,?)';
    const params = [title, description];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": {
                "id": this.lastID,
                "title": title,
                "description": description,
                "status": "todo"
            }
        });
    });
});

app.delete('/api/tasks/:id', (req, res) => {
    const sql = 'DELETE FROM tasks WHERE id = ?';
    const params = [req.params.id];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "message": "deleted", "changes": this.changes });
    });
});

app.listen(port, () => {
    console.log(`Server running on the following address: http://localhost:${port}`);
});