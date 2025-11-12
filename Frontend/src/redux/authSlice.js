import { createSlice } from "@reduxjs/toolkit";

// Đọc dữ liệu từ localStorage an toàn
const savedUser = (() => {
  try {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error("Lỗi khi parse user từ localStorage:", e);
    return null;
  }
})();



const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: savedUser,
    isLogin: savedUser ? true : false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.isLogin = true;
      // Lưu JSON hợp lệ vào localStorage
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.isLogin = false;
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
