const User = require('../models/Users');
const bcrypt = require('bcryptjs')

class UserController {
  
    async addUser(req, res) {
        try {
            const { name, email, password, role } = req.body;
            const err = true

            const existingName = await User.findOne({ name });
            if (existingName) {
                return res.status(400).json({ message: `Tên "${name}" đã tồn tại!` , err});
            }

            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ message: `Email "${email}" đã tồn tại!` ,err});
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await User.create({
                name,
                email,
                password: hashedPassword,
                role,
            });

            res.status(200).json({ message: "Thêm User thành công!" });
        } catch (error) {
            console.error("❌ Lỗi khi thêm user:", error);
            res.status(500).json({ message: "Lỗi server!", error: error.message });
        }
    }

    async getUser(req, res) {
        try {
            const users = await User.find()
            res.status(200).json({users})
        } catch (error) {
            console.error("❌ Lỗi khi lấy user:", error);
            res.status(500).json({ message: "Lỗi server!", error: error.message });
        }
    }

    async deleteUser(req, res){
        try {
            const {userId} = req.body
            await User.deleteOne({_id: userId})

            res.status(200).json({message: "Xóa người dùng thành công!"})

        } catch (error) {
            console.error("❌ Lỗi khi xóa user:", error);
            res.status(500).json({ message: "Lỗi server!", error: error.message });
        }


    }

}

module.exports = new UserController();
