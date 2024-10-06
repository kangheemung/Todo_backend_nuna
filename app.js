//restful API
//주소 + http 명령어
//==============================
//Tasks post
//Tasks get
//Tasks put
//Tasks delete
//==============================
//createTasks /makeTask /buildTask
//getTasks
//modifyTasks
//deleteTasks
//==============================
// 할일 앱
// 1. 할일을 추가할 수 잇다.
//Tasks post
//URL을 정했다.

// 2. 할일 리스트를 볼수 있다.
// Tasks get
//   3.할일에 대해서 끝남 안끝남 표시를 할수 있다.
//Tasks/:id
//   4.할일을 삭제할수 있다
// Change "tasks/:id delet" to "tasks/:id delete"
// 백앤드 준비
// 1. 기본 세팅: npm express mongoose,app리스너 co2. 라우터 정의 주소정의 3. 데이터 저장하는 스키마 정의
// 4. 기능 정의 :CRUD5. 테스트 :  포스트 맨프론트엔드 준비
// 1.깃 허브
// 깃 클론
// 2. 기능 만들기CRUD
// 3. 전체적인 테스트
//==============================

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
//방어벽
const cors = require('cors');
const indexRouter = require('./routes/index');
require('dotenv').config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); // 이게 있어야 req.body가 객체로 인식됨
app.use(bodyParser.json()); // 이게 있어야 req.body가 객체로 인식됨

const mongoURI = process.env.MONGODB_ATLAS;

// console.log('mongoURI',mongoURI);
app.use('/api', indexRouter);
mongoose
    .connect(mongoURI)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

//포트번호 설정
app.listen(process.env.PORT || 3001, () => {
    console.log('Server running on port 3001');
});
