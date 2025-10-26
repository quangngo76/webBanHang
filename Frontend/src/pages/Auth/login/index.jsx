import { useState } from "react";
import classNames from 'classnames/bind';
import styles from './login.module.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate} from "react-router-dom";  

import { useDispatch, useSelector } from "react-redux";
import { login} from "../../../redux/authSlice";


const cx = classNames.bind(styles);

function Login() {

  const dispatch = useDispatch();

  const [isShowPassWord, setIsShowPassWord] = useState(false);
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const navigate = useNavigate();   // ✅ khởi tạo navigate

  // validate field
  const validateField = (name, value) => {
    if (value.trim().length === 0) return `Vui lòng nhập ${name}`;
    if (name === "email") {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(value)) return "Không đúng định dạng email!";
    }
    return "";
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // validate ngay khi nhập
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  }

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      email: validateField("email", values.email),
      password: validateField("password", values.password),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== "")) return;

    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!data.isError) {
        dispatch(login({ user: data.user })); 

        if(data.user.role === 'User'){
          navigate("/"); 
        }else{
          navigate("/Dashboard"); 
        }
          
      } else {
        console.log("❌ Login error:", data);
        const newErrs = { email: "", password: "" };

        data.errors.forEach((error) => {
          if (error.field && newErrs[error.field] !== undefined) {
            newErrs[error.field] = error.message;
          }
        });
        setErrors(newErrs);
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
    }
  };


  return (
    <>
      <form className={cx("form")} onSubmit={handleSubmit}>
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

        <div className={cx("form-group")}>
          <label>Password</label>
          <input
            type={isShowPassWord ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
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
          Log in
        </button>
      </form>

      <p className={cx("switch")}>
        Don’t have an account? <Link to="/auth/register">Sign up</Link>
      </p>
    </>
  );
}

export default Login;
