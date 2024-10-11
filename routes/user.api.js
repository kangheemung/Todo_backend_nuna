//detail엔드 파일
const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller')
//1.회원가입 endpoint
router.post('/',userController.createUser);
router.post('/login',userController)
module.exports = router;
//2.로그인
//이메일 패스워드 를 입력해서 보냄 
//데이터 베이스에 해당 이메일과 패스워드를 가진 유저가 있는지 확인 
//없으면 로그인 실패 
// 있다면 ? 유저 정보 + 토큰 
//프론트 엔드 이 정보 저장 
// 1.router설정
//2. 이메일 패스워드 정보 읽어오기 
//3. 이메일을 가지고 유저 정보 가져오기
// 4. 이 유전에 디비에 있는 패스워드와 프론트엔드가 보낸 패스워드가 같은지 비교 
// 5. 맞다 ! 토큰 발행
// 6. 틀리면 에러베세지 보냄 
// 응ㅇ답

