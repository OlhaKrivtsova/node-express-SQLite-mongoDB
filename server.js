const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;
dbName = 'tasks.db';
const db = new sqlite3.Database(dbName);

// let tasks = [
//   {id: 1, text: 'Go shopping'},
//   {id: 2, text: 'Do chores'},
//   {id: 3, text: 'Do dishes'},
//   {id: 4, text: 'Go for a walk'},
//   {id: 5, text: 'Exercise', isDone: false},
// ];

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, Express!!');
});

app.get('/tasks', (req, res) => {
  db.all('select * from tasks', (err, rows) => res.status(200).json(rows));
});

app.get('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  db.get('select * from tasks where id=?', id, (err, rows) => {
    console.log(rows);
    if (err) return res.status(500).json({error: err.message});
    if (!rows)
      return res.status(404).json({
        message: `Task with id ${id} is not found.`,
      });
    return res.status(200).json(rows);
  });
});

app.post('/tasks', (req, res) => {
  const {id, text, isDone} = req.body;
  db.run(
    'insert into tasks (id, text, isDone) values (?, ?, ?)',
    [id, text, isDone],
    function (err) {
      if (err) return res.status(500).json({error: err.message});
      return res.status(201).json({idLast: this.lastID, id, text, isDone});
    }
  );
});

app.put('/tasks', (req, res) => {
  const {id, text, isDone} = req.body;
  db.run(
    'update tasks set text = ?,  isDone = ? where id = ?',
    [text, isDone, id],
    function (err) {
      if (err) return res.status(500).json({error: err.message});
      if (this.changes === 0)
        return res.status(400).json({message: `task ${id} is not found`});
      return res
        .status(201)
        .json({id, text, isDone, message: `task ${id} is replaced`});
      //this.changes the number of rows affected by this query
    }
  );
});

app.patch('/tasks/:id', (req, res) => {
  const {text, isDone} = req.body;
  const id = Number(req.params.id);
  db.run(
    'update tasks set text = ?,  isDone = ? where id = ?',
    [text, isDone, id],
    function (err) {
      if (err) return res.status(500).json({error: err.message});
      if (this.changes === 0)
        return res.status(400).json({message: `task ${id} is not found`});
      return res
        .status(201)
        .json({id, text, isDone, message: `task ${id} is replaced`});
    }
  );
});

app.delete('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  db.run('delete from tasks where id = ?', id, function (err) {
    if (err) return res.status(500).json({error: err.message});
    if (this.changes === 0)
      return res.status(400).json({message: `task ${id} is not found`});
    return res.status(200).json({id, message: `task ${id} is deleted`});
  });
});

app.listen(port, () => {
  console.log(`server is listened on http://localhost:${port}`);
});
