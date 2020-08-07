const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create todolist Schema & model
const ToDoListSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title field is required"]
    },
    priority: {
        type: Number,
        default: 0
    },
    dueDate: {
        type: String,
        default: () => new Date("<YYYY-mm-dd>")
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const ToDoList = mongoose.model('todolist', ToDoListSchema);
module.exports = ToDoList;