const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  fullName: {type: String, require: true},
  photo: {type: String, default: null},
});

const User = mongoose.model('UserPhoto', userSchema);

module.exports = User;
