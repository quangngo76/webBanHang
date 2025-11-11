import { useState } from "react";
import classNames from 'classnames/bind';
import styles from '../login/login.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Register() {
  const [isShowPassWord, setIsShowPassWord] = useState(false);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: ""
  });

  const validateField = (name, value) => {
    if (value.trim().length === 0) {
      return `Vui lòng nhập ${name}`;
    }
    if (name === "email") {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(value)) {
        return "Không đúng định dạng email!";
      }
    }
    return "";
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {
      name: validateField("name", values.name),
      email: validateField("email", values.email),
      password: validateField("password", values.password),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== "")) {
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (data.isError) {
        const newErrs = { name: "", email: "", password: "" };
        data.Error.forEach((error) => {
          if (error.field && newErrs[error.field] !== undefined) {
            newErrs[error.field] = error.message;
          }
        });
        setErrors(newErrs);

        setNotice({ show: true, message: "Đăng ký thất bại!", isError: true });
        return;
      }

      setValues({ name: "", email: "", password: "" });
      alert('Đăng ký thành công')
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setNotice({ show: true, message: "Lỗi kết nối server!", isError: true });
    }
  };

  return (
    <div style={{width: '100%', overflow: 'hi'}}>

      <form className={cx("form")} onSubmit={handleSubmit}>
        {/* Name */}
        <div className={cx("form-group")}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <span className={cx("error")}>{errors.name}</span>}
        </div>

        {/* Email */}
        <div className={cx("form-group")}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="email@domain.com"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <span className={cx("error")}>{errors.email}</span>}
        </div>

        {/* Password */}
        <div className={cx("form-group")}>
          <label>Password</label>
          <input
            type={isShowPassWord ? "text" : "password"}
            name="password"
            placeholder="Create a password"
            value={values.password}
            onChange={handleChange}
          />
          <FontAwesomeIcon
            className={cx("checkbox")}
            icon={isShowPassWord ? faEyeSlash : faEye}
            onClick={() => setIsShowPassWord(!isShowPassWord)}
          />
          {errors.password && (
            <span className={cx("error")}>{errors.password}</span>
          )}
        </div>

        <button type="submit" className={cx("btn")}>
          Sign up
        </button>
      </form>

      <p className={cx("switch")}>
        Already have an account? <Link to="/auth/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
