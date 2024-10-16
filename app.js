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
app.listen(process.env.PORT || 8080, () => {
    console.log('Server running on port 8080');
});
//1. 회원가입
//유저가 이메일, 패스워드, 유저 이름 입력해서 보냄
// 로그인 유저
//받은 정보를 저장함(데이터 베이스 모델 필요)
// 패스워드 암호호 시켜서 저장 라이브러리 이용 
//1.라우터
//2. 모델
//3 . 데이터 저장 (중복 가입이 안되게 가입된 유저 유무 판단 후 ,패스워드 암호화 )
//4. 응담을 보냄
// authunticate유저 권한 확인
// (투두 페이지 로그인한 유저만 들어갈수 있다.)
// 내가 이미 로그인한 유저라면 추가 로그인
// 없이 바로 메인 페이지로 들어오기
