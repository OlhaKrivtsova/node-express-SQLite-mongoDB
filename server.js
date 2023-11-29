const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

let tasks = [
  {id: 1, text: 'Go shopping'},
  {id: 2, text: 'Do chores'},
  {id: 3, text: 'Do dishes'},
  {id: 4, text: 'Go for a walk'},
  {id: 5, text: 'Exercise', isDone: false},
];

app.use(bodyParser.json());

const errMessageId = (method, res, id) => {
  let message;
  if (['get', 'delete', 'patch'].includes(method))
    message = `Task with id ${id} is not found`;
  if (method === 'post')
    message = `Task with id ${id} has already existed. If you want to replace it, sent the PUT request`;
  if (method === 'put')
    message = `Task with id ${id} is not found. If you want to create a new task, sent the POST request`;
  return res.status(404).json({message});
};

const errMessageText = (res, text, id) => {
  return res.status(404).json({
    message: `Task '${text}' has already existed with id ${id}.`,
  });
};

app.get('/', (req, res) => {
  res.send('Hello, Express!!');
});

app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const foundTask = tasks.find(item => item.id === id);
  if (!foundTask) return errMessageId('get', res, id);
  return res.status(200).json(foundTask);
});

app.post('/tasks', (req, res) => {
  const {id, text} = req.body;
  let foundTask = tasks.find(item => item.text === text || item.id === id);
  if (foundTask?.text === text) return errMessageText(res, text, foundTask.id);
  foundTask = tasks.find(item => item.id === id);
  if (foundTask?.id === id) return errMessageId('post', res, id);
  tasks.push({id, text});
  return res.status(201).json(tasks);
});

app.put('/tasks', (req, res) => {
  const {id, text} = req.body;
  const foundTask = tasks.find(item => item.text === text);
  if (foundTask) return errMessageText(res, text, foundTask.id);
  const foundIndex = tasks.findIndex(item => item.id === id);
  if (foundIndex < 0) return errMessageId('put', res, id);
  tasks[foundIndex] = {...req.body};
  return res.status(201).json(tasks);
});

app.patch('/tasks/:id', (req, res) => {
  const {text} = req.body;
  const foundTask = tasks.find(item => item.text === text);
  if (foundTask) return errMessageText(res, text, foundTask.id);
  const id = Number(req.params.id);
  const foundIndex = tasks.findIndex(item => item.id === id);
  if (foundIndex < 0) return errMessageId('patch', res, id);
  tasks[foundIndex] = {...tasks[foundIndex], ...req.body};
  return res.status(200).json(tasks);
});

app.delete('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const foundTask = tasks.find(item => item.id === id);
  if (!foundTask) return errMessageId('delete', res, id);
  tasks = tasks.filter(item => item.id !== id);
  return res.status(200).json(tasks);
});

app.listen(port, () => {
  console.log(`server is listened on http://localhost:${port}`);
});
