const User = require('../model/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const userController = {};

userController.createUser = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw new Error('이미가입이 된 유저 입니다. ');
        }
        //암호화
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = new User({ email, name, password: hash });
        await newUser.save();
        res.status(200).json({ status: 'success' });
        console.log('hash', hash);
    } catch (error) {
        res.status(400).json({ status: 'fail', error });
    }
};
userController.loginWithEmail = async (req, res) => {
    try {
        // 있다면 ? 유저 정보 + 토큰
        //프론트 엔드 이 정보 저장
        // 1. router설정
        //2. 이메일 패스워드 정보 읽어오기
        //3. 이메일을 가지고 유저 정보 가져오기
        // 4. 이 유전에 디비에 있는 패스워드와 프론트엔드가 보낸 패스워드가 같은지 비교
        // 5. 맞다 ! 토큰 발행
        // 6. 틀리면 에러베세지 보냄
        // 응ㅇ답
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = bcrypt.compareSync(password, user.password);
        // password ==> 유저가 입력한 그자체
        // user.password=>암호화 된 패스워들 비교
        if (!isMatch) {
            const token = await user.generateToken();
            console.log(token);

            return res.status(200).json({ status: 'success', user, token });
        }
        throw new Error('id or password not match');
    } catch (error) {
        res.status(400).json({ status: 'fail', error: error.message });
    }
};
module.exports = userController;
