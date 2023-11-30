const mongoose = require('mongoose');
const {PASSWORD_DB: password} = require('./secret');
const uri = `mongodb+srv://olgakrivtsova73:${password}@cluster0.itej8vo.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(uri)
  .then(() => console.log('Connected!'))
  .catch(err => console.error(err));
// await mongoose.connect(uri);//await is only valid in async functions and the top level bodies of modules
