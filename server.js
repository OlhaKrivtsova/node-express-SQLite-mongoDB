const express = require('express');
const bodyParser = require('body-parser');
require('./config/db');
const {Task} = require('./models/taskModel');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const serverError = (err, res) => {
  if (err) return res.status(500).json({error: err.message});
};

const idNotExist = (id, res, err) =>
  res.status(404).json({message: err ?? `The task with '${id}' is not found`});

app.get('/', (req, res) => {
  res.send('Hello, Express!!');
});

app.get('/tasks', async (req, res) => {
  try {
    const task = await Task.find();
    return res.status(201).json(task);
  } catch (err) {
    return serverError(err, res);
  }
});

app.get('/tasks/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);
    return !task ? idNotExist(id, res) : res.status(200).json(task);
  } catch (err) {
    return serverError(err, res);
  }
});

app.post('/tasks', async (req, res) => {
  try {
    const newTask = req.body;
    const task = await Task.create(newTask);
    return res.status(201).json(task);
  } catch (err) {
    return serverError(err, res);
  }
});

app.put('/tasks', async (req, res) => {
  try {
    const {id, ...updatedTask} = req.body;
    const task = await Task.findByIdAndUpdate(id, updatedTask, {new: true});
    return !task
      ? idNotExist(id, res)
      : res.status(200).json({
          message: `The task with id '${id}' is replaced`,
          task,
        });
  } catch (err) {
    return serverError(err, res);
  }
});

app.patch('/tasks/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedTask = req.body;
    const task = await Task.findByIdAndUpdate(id, updatedTask, {new: true});
    return !task
      ? idNotExist(id, res)
      : res.status(200).json({
          message: `The fields of the task with id '${id}' is changed`,
          task,
        });
  } catch (err) {
    return serverError(err, res);
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndDelete(id);
    return !task
      ? idNotExist(id, res)
      : res.status(200).json({message: `The task with id '${id}' is deleted`});
  } catch (err) {
    return serverError(err, res);
  }
});

app.listen(port, () => {
  console.log(`server is listened on http://localhost:${port}`);
});
