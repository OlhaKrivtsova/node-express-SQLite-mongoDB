const express = require('express');
const multer = require('multer');
// const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => cb(null, file.originalname),
});

// const upload = multer({dest: './uploads'}).single('demo_image');

// const upload = multer({storage, limits: {fileSize: 1100000}}).single(
//   'demo_image'
// );
const upload = multer({storage, limits: {fileSize: 1100000}}); //for uploading a few files

// app.use(bodyParser.json());

//for uploading a few files
app.post('/image', upload.array('demo_image', 4), (req, res) => {
  try {
    res.send(req.files);
  } catch (error) {
    console.log(error);
    res.status(400).send('something went wrong');
  }
});
///for uploading a single file
// app.post('/image', (req, res) => {
//   upload(req, res, err => {
//     if (err) return res.status(400).send('something went wrong');
//     res.send(req.file);
//   });
// });

// { /////result with const upload = multer({dest: './uploads'}).single('demo_image');
//   "fieldname": "demo_image",
//   "originalname": "image 1559.jpg",
//   "encoding": "7bit",
//   "mimetype": "image/jpeg",
//   "destination": "uploads/",
//   "filename": "cf7037c3caad992503b157e61146c91f",
//   "path": "uploads/cf7037c3caad992503b157e61146c91f",
//   "size": 1054053
// }

// { /////result with const upload = multer({storage}).single('demo_image');
//   "fieldname": "demo_image",
//   "originalname": "image 1559.jpg",
//   "encoding": "7bit",
//   "mimetype": "image/jpeg",
//   "destination": "./uploads",
//   "filename": "image 1559.jpg",
//   "path": "uploads/image 1559.jpg",
//   "size": 1054053
// }

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
