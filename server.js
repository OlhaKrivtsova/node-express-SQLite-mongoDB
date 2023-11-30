const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;
dbName = 'tasks.db';
const db = new sqlite3.Database(dbName);

app.use(bodyParser.json());

const serverError = (err, res) => {
  res.status(500).json({error: err.message});
};

const idNotExist = (id, res, err) =>
  res.status(404).json({message: err ?? `The task with '${id}' is not found`});

app.get('/', (req, res) => {
  res.send('Hello, Express!!');
});

app.get('/', (req, res) => {
  res.send('Hello, Express!!');
});

app.get('/tasks', (req, res) => {
  db.all('select * from tasks', (err, rows) => {
    if (err) return serverError(err, res);
    if (!rows[0]) return idNotExist(0, res, 'No task is found');
    return res.status(200).json(rows);
  });
});

app.get('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  db.get('select * from tasks where id=?', id, (err, row) => {
    if (err) return serverError(err, res);
    if (!row) return idNotExist(id, res);
    return res.status(200).json(row);
  });
});

app.post('/tasks', (req, res) => {
  const {id, text, isDone} = req.body;
  db.run(
    'insert into tasks (id, text, isDone) values (?, ?, ?)',
    [id, text, isDone],
    function (err) {
      if (err) return serverError(err, res);
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
      if (err) return serverError(err, res);
      if (this.changes === 0) return idNotExist(id, res);
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
      if (err) return serverError(err, res);
      if (this.changes === 0) return idNotExist(id, res);
      return res
        .status(201)
        .json({id, text, isDone, message: `task ${id} is replaced`});
    }
  );
});

app.delete('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  db.run('delete from tasks where id = ?', id, function (err) {
    if (err) return serverError(err, res);
    if (this.changes === 0) return idNotExist(id, res);
    return res.status(200).json({id, message: `task ${id} is deleted`});
  });
});

app.listen(port, () => {
  console.log(`server is listened on http://localhost:${port}`);
});
