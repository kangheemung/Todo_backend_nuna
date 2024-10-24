//라우터를 써봅시당
const express = require('express');
const taskController = require('../controller/task.controller');
const authController = require('../controller/auth.controller');
const router = express.Router();



router.post('/', authController.authenticate ,taskController.createTask);
router.get('/', taskController.getTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.delete);

// router.get('/', (req, res) => {
//     res.send('get task');
// });
// router.put('/:id', (req, res) => {
//     res.send('update tasks');
// });
// router.delete('/:id', (req, res) => {
//     res.send('delete task');
// });

module.exports = router;
