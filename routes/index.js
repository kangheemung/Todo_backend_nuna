const express = require('express');
const router = express.Router();
const taskApi = require('./task.api');
//묶어줄수 있어용 유알엘
router.use('/task', taskApi);
// router.use('/ta')
module.exports = router;
