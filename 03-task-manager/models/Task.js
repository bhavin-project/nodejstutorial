// const mongoose = require("mongoose");
import { mongoose } from "mongoose";

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxlength: [20, "name can not be more than 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// module.exports = mongoose.model("Task", TaskSchema);
const Task = mongoose.model("Task", TaskSchema);

// Export the model
export default Task;
