import { useState, useEffect } from "react";
import styles from "./UserManagement.module.scss";
import className from 'classnames/bind'

const cx = className.bind(styles);

function UserManagement() {

  //danh sách user
  const [users, setUsers] = useState([]);

  //Add/Update người dùng
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const handleChangeInputUser = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getUser = async () => {
    try {
      const res = await fetch("http://localhost:8000/user/getUser", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      setUsers(data.users);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const addUser = async () => {
    //Kiểm tra dữ liệu trước khi gửi
    if (!user.name || !user.email || !user.password || !user.role) {
      alert("Vui lòng nhập đầy đủ thông tin và chọn vai trò!");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/user/addUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      if (!data.err) {
        alert("Thêm người dùng thành công!");
        setUser({ name: "", email: "", password: "", role: "" });
        getUser(); 
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const deleteUser = async (userId) => {

    try {
      const res = await fetch("http://localhost:8000/user/deleteUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({userId}),
      });

      const data = await res.json();
      if (!data.err) {
        alert(data.message);
        getUser(); 
      } 

    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className={cx("container")}>
      <header className={cx("header")}>
        <h1>👤 Quản lý người dùng</h1>
      </header>

      {/* FORM */}
      <div className={cx("formSection")}>
        <h2>➕ Thêm người dùng mới</h2>
        <div className={cx("form")}>
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={user.name}
            onChange={handleChangeInputUser}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChangeInputUser}
          />
          <input
            type="text"
            name="password"
            placeholder="Mật khẩu"
            value={user.password}
            onChange={handleChangeInputUser}
          />
          <select
            name="role"
            value={user.role}
            onChange={handleChangeInputUser}
          >
            {/* ✅ Option mặc định không chọn được */}
            <option value="">-- Chọn vai trò --</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>

          <button className={cx("addBtn")} onClick={addUser}>
            ➕ Thêm mới
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className={cx("tableSection")}>
        <h2>📋 Danh sách người dùng</h2>
        <table>
          <thead>
            <tr>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Mật khẩu</th>
              <th>Vai trò</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.password}</td>
                  <td>{u.role}</td>
                  <td>
                    <button 
                      className={cx("deleteBtn")}
                      onClick={() => deleteUser(u._id)}
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className={cx("noData")}>
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagement;
