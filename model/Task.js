const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const taskSchema = new Schema({
    task: {
        type: String,
        required: true,
    },
    isComplete: {
        type: Boolean,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
});
//taskModel
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
//스키마 정의 
