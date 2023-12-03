const express = require('express');
const multer = require('multer');
require('./config/db.js');
const User = require('./models/userModel.js');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

//create access for clients to folder '/uploads' for watching images
app.use('/uploads', express.static('uploads')); //http://localhost:3000/uploads/image_1560.jpg

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => cb(null, file.originalname),
});

// const upload = multer({dest: 'uploads/'}).single('demo_image');

// const upload = multer({storage, limits: {fileSize: 1100000}}).single(
//   'demo_image'
// );
const upload = multer({storage, limits: {fileSize: 1100000}}); //for uploading a few files

app.get('/users', async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('something went wrong');
  }
});

app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('something went wrong');
  }
});

app.put('/users/:id', upload.single('demo_image'), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        photo: req.file.filename,
      },
      {new: true}
    );
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('something went wrong');
  }
});

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

app.listen(port, () => {
  console.log(`server is listened on http://localhost:${port}`);
});
