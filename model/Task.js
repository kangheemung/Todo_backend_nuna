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
taskSchema.methods.toJSON = function () {
    const obj=this._doc;
    delete obj.password;
    delete obj.updatedAt;
    delete obj.__v
    delete obj.createdAt;
    return obj;
};
//taskModel
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
//스키마 정의 
