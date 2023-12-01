const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
require('./config/db');
const Task = require('./models/taskModel');
const User = require('./models/userModel');
const checkAuth = require('./middleware/checkAuth');
const checkAdmin = require('./middleware/checkAdmin');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const serverError = (err, res) => {
  if (err) return res.status(500).json({error: err.message});
};

const idNotExist = (id, res, err) =>
  res.status(404).json({message: err ?? `The task with '${id}' is not found`});

/////authorization
///create user
app.post('/users', async (req, res) => {
  try {
    const {password, ...user} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = await User.create({password: hash, ...user});
    const {password: pass, ...newIdentity} = await newUser._doc;
    return res.status(201).json(newIdentity);
  } catch (err) {
    return serverError(err, res);
  }
});

///authorize user
app.post('/login', async (req, res) => {
  try {
    const {password, email} = req.body;
    const user = await User.findOne({email});
    const isPasswordValid =
      (await user) && (await bcrypt.compare(password, user.password));
    if (!isPasswordValid)
      return res.status(400).json({message: 'Invalid login or password'});
    return res.status(200).json({message: 'Success!', id: user.id});
  } catch (err) {
    return serverError(err, res);
  }
});

///Basic authentication
app.get('/books', checkAuth, checkAdmin, async (req, res) => {
  try {
    return res.status(200).send('all books');
  } catch (err) {
    return serverError(err, res);
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    const persons = await users.map(item => {
      const {password, ...person} = item._doc;
      return person;
    });
    if (!users?.[0]) return idNotExist(0, res, 'No users found');
    return res.status(201).json(persons);
  } catch (err) {
    return serverError(err, res);
  }
});

///////tasks

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
