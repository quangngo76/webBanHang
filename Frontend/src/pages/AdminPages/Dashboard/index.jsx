import styles from "./Dashboard.module.scss";
import classNames from 'classnames/bind';
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const cx = classNames.bind(styles);

export default function Dashboard() {
  const [revenueData, setRevenueData] = useState([])

  const [orderStatusData, setOrderStatusData] = useState([
    { name: "Đã nhận", value: 0 },
    { name: "Đang xử lý", value: 0 },
    { name: "Đang giao", value: 0 },
    { name: "Đã hủy", value: 0 },
  ]);


  const COLORS = ["#4CAF50", "#FFC107", "#0b07ecff", "#F44336"];

  const [numberOfUsers, setNumberOfUsers] = useState(0)
  const [numberOfProducts, setNumberOfProducts] = useState(0)
  const [numberOfOrders, setNumberOfOrders] = useState(0)
  const [totalRevenue, setTotalRevenue] = useState(0)

  const getdata = async () => {
    const res = await fetch('http://localhost:8000/data/getData',{
      method: 'GET',
      headers: {'Content-Type' : 'application/json'},
    })

    const data = await res.json()

    const total = Array.isArray(data.orders)
      ? data.orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0)
      : 0;

    const newStatusData = [
      { name: "Đã nhận", value: 0 },
      { name: "Đang xử lý", value: 0 },
      { name: "Đang giao", value: 0 },
      { name: "Đã hủy", value: 0 },
    ];

    data.orders.forEach(order => {
      if(order.status === "Đã nhận") newStatusData[0].value++;
      if(order.status === "Đang xử lý") newStatusData[1].value++;
      if(order.status === "Đang giao") newStatusData[2].value++;
      if(order.status === "Đã hủy") newStatusData[3].value++;
    });

setOrderStatusData(newStatusData);


    setNumberOfUsers(data.users)
    setNumberOfProducts(data.products)
    console.log(data.orders)
    setNumberOfOrders(data.orders.length)
    setTotalRevenue(total)
    setRevenueData(data.revenueData)

  }

  useEffect(() => {
    getdata()
  }, [])

  return (
    <div className={cx('container')}>
      
      <div className={cx('body')}>
        {/* Main content */}
        <main className={cx('main')}>
          <h1>Tổng quan hệ thống</h1>

          {/* Cards */}
          <div className={cx('stats')}>
            <div className={cx('card')}>
              <h4>Doanh thu tháng này</h4>
              <p>{totalRevenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
            </div>
            <div className={cx('card')}>
              <h4>Người dùng</h4>
              <p>{numberOfUsers}</p>
            </div>
            <div className={cx('card')}>
              <h4>Sản phẩm</h4>
              <p>{numberOfProducts}</p>
            </div>
            <div className={cx('card')}>
              <h4>Đơn hàng</h4>
              <p>{numberOfOrders}</p>
            </div>
          </div>

          {/* Charts */}
          <div className={cx('charts')}>
            <div className={cx('chartBox')}>
              <h2>📈 Doanh thu 5 tháng gần nhất</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <XAxis dataKey="_id"/>
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="totalPrice" fill="#2196F3" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className={cx('chartBox')}>
              <h2>📦 Tình trạng đơn hàng</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
        </main>
      </div>
    </div>
  );
}
