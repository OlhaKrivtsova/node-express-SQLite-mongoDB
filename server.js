const express = require('express');
const multer = require('multer');
// const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, Express!!');
});

// app.get('/tasks', (req, res) => {
//   res.status(200).json(tasks);
// });

// app.get('/tasks/:id', (req, res) => {
//   const id = Number(req.params.id);
//   const foundTask = tasks.find(item => item.id === id);
//   if (!foundTask) return errMessageId('get', res, id);
//   return res.status(200).json(foundTask);
// });

// app.post('/tasks', (req, res) => {
//   const {id, text} = req.body;
//   let foundTask = tasks.find(item => item.text === text || item.id === id);
//   if (foundTask?.text === text) return errMessageText(res, text, foundTask.id);
//   foundTask = tasks.find(item => item.id === id);
//   if (foundTask?.id === id) return errMessageId('post', res, id);
//   tasks.push({id, text});
//   return res.status(201).json(tasks);
// });

// app.put('/tasks', (req, res) => {
//   const {id, text} = req.body;
//   const foundTask = tasks.find(item => item.text === text);
//   if (foundTask) return errMessageText(res, text, foundTask.id);
//   const foundIndex = tasks.findIndex(item => item.id === id);
//   if (foundIndex < 0) return errMessageId('put', res, id);
//   tasks[foundIndex] = {...req.body};
//   return res.status(201).json(tasks);
// });

// app.patch('/tasks/:id', (req, res) => {
//   const {text} = req.body;
//   const foundTask = tasks.find(item => item.text === text);
//   if (foundTask) return errMessageText(res, text, foundTask.id);
//   const id = Number(req.params.id);
//   const foundIndex = tasks.findIndex(item => item.id === id);
//   if (foundIndex < 0) return errMessageId('patch', res, id);
//   tasks[foundIndex] = {...tasks[foundIndex], ...req.body};
//   return res.status(200).json(tasks);
// });

// app.delete('/tasks/:id', (req, res) => {
//   const id = Number(req.params.id);
//   const foundTask = tasks.find(item => item.id === id);
//   if (!foundTask) return errMessageId('delete', res, id);
//   tasks = tasks.filter(item => item.id !== id);
//   return res.status(200).json(tasks);
// });

app.listen(port, () => {
  console.log(`server is listened on http://localhost:${port}`);
});
