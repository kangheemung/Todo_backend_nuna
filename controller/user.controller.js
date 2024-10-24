const User = require('../model/User');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const userController = {};

userController.createUser = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw new Error('You are already a registered user. Please log in instead.');
        }
        //암호화
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = new User({ email, name, password: hash });
        await newUser.save();
        res.status(200).json({ status: 'success' });
        console.log('hash', hash);
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
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
        // 응답
        const { email, password } = req.body;
        const user = await User.findOne({ email }, '-createdAt -updatedAt -__v');
        if (!user) {
            throw new Error('Account not found. Please register.'); // 登録されていない場合のエラーメッセージ
        }

        if (user) {
            const isMatch = bcrypt.compareSync(password, user.password);
            // password ==> 유저가 입력한 그자체
            // user.password=>암호화 된 패스워들 비교
            if (isMatch) {
                const token = await user.generateToken();
                // console.log(token);
                return res.status(200).json({ status: 'success', user, token });
            } else {
                throw new Error('Incorrect password. Please try again.'); // パスワードが間違っている場合のエラーメッセージ
            }
        }
        throw new Error(error.message || 'Account not found. Please register. ');
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};
userController.getUser = async (req, res) => {
    try {
        const { userId } = req; //req.userId
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('can not find user');
        }
        res.status(200).json({ status: 'success', user });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};
module.exports = userController;
