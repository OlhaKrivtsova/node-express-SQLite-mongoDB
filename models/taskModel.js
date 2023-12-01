const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const taskSchema = new Schema({
  // author: ObjectId,
  text: {
    type: String,
    require: [true, 'Task description is required'],
    unique: true,
  },
  isDone: {type: Boolean, default: false},
});
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
