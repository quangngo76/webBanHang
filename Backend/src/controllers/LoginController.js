const bcrypt = require('bcryptjs');
const Users = require('../models/Users');

class LoginController {
    async loginUser(req, res) {
        try {
            let isError = false;
            const errors = [];
            const { email, password } = req.body;

            // Kiểm tra email tồn tại
            const user = await Users.findOne({ email });
            if (!user) {
                errors.push({ message: "Email không tồn tại!", field: "email" });
                isError = true;
            } else {
                // Kiểm tra mật khẩu
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    return res.status(200).json({ 
                        message: "Login success", 
                        isError: false, 
                        user 
                    });
                } else {
                    errors.push({ message: "Password không chính xác!", field: "password" });
                    isError = true;
                }
            }

            if (errors.length > 0) {
                return res.status(400).json({ errors, isError });
            }

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new LoginController();
