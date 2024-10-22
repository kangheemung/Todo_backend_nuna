const Task = require('../model/Task');
const taskController = {};

taskController.createTask = async (req, res) => {
    try {
        const { task, isComplete } = req.body;
        const { userId } = req;
        const newTask = new Task({ task, isComplete, author: userId });
        await newTask.save();

        return res.status(200).json({ status: 'OK', data: newTask });
    } catch (err) {
        if (err.name === 'ReferenceError' && err.message.includes('Task is not defined')) {
            return res.status(400).json({ status: 'fail', error: 'Task field is required' });
        }
        res.status(500).json({ status: 'fail', error: err.message });
    }
};

taskController.getTask = async (req, res) => {
    try {
        const taskList = await Task.find({}).populate('author');
        console.log('tttt', taskList);
        res.status(200).json({ status: 'ok', data: taskList });
    } catch (err) {
        res.status(400).json({ status: 'fall,error', error: err });
    }
};

//update//delete 써 보기
// App.js - クライアント側の修正
const updateTask = async (taskId, isComplete) => {
    try {
        const response = await api.put(`/task/${taskId}`, { isComplete: isComplete });
        if (response.status === 200) {
            getTasks();
            console.log('タスクの更新に成功しました');
        } else {
            console.error('タスクの更新に失敗しました - ステータス:', response.status);
        }
    } catch (error) {
        console.error('タスクの更新中にエラーが発生しました:', error);
    }
};

// taskController.updateTask 関数の修正
taskController.updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ status: 'fail', error: '指定されたタスクが見つかりません' });
        }
        Object.keys(req.body).forEach((key) => {
            task[key] = req.body[key];
        });
        await task.save();
        res.status(200).json({ status: 'ok', data: task });
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err.message });
    }
};

taskController.delete = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: 'ok', data: deletedTask });
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err.message });
    }
};

module.exports = taskController;
