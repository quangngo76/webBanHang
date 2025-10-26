const bcrypt = require('bcryptjs');
const User = require('../models/Users');

class RegisterController {

    async createUser(req, res) {
        try {
            let isError = false;
            const Error = [];
            const { name, email, password } = req.body;

            // Kiểm tra name tồn tại
            const checkName = await User.findOne({ name });
            if (checkName) {
                Error.push({ message: `UserName đã được sử dụng!`, field: "name" });
                isError = true;
            }

            // Kiểm tra email tồn tại
            const checkEmail = await User.findOne({ email });
            if (checkEmail) {
                Error.push({ message: `email đã được sử dụng!`, field: "email" });
                isError = true;
            }

            if (Error.length > 0) {
                return res.status(400).json({ Error, isError });
            }

            // Băm password
            const passwordHash = await bcrypt.hash(password, 10);

            // Lưu vào DB
            const newUser = new User({ name, email, password: passwordHash });
            await newUser.save();

            res.status(201).json({ message: 'User created', isError: false });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new RegisterController();
