import { useState, useEffect } from "react";
import styles from "./OrderManagement.module.scss";
import className from 'classnames/bind'

const cx = className.bind(styles)

function OrderManagement() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    //Lấy thông tin Đơn Hàng
    const getOrder = async () => {
        const res = await fetch('http://localhost:8000/order/getOrderAll', {
            method: 'GET',
            headers: {'Content-Type' : 'application/json'}
        })

        const data = await res.json()
        setOrders(data.orders)

    }

    //Update Trạng Thái Đơn Hàng
    const handleChangeStatus = async (id, status) => {
        try {
            const res = await fetch('http://localhost:8000/order/updateStatus', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status })
            });

            const data = await res.json();

            if (res.ok) {
                alert(data.message);
                getOrder()
            } else {
                alert(data.message || 'Cập nhật thất bại');
            }

        } catch (error) {
            console.error('Error:', error);
            alert('Không thể kết nối đến server');
        }
    };

    async function handleClickViewOrderDetail(orderId) {
        const res = await fetch('http://localhost:8000/order/getOrderId', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({orderId})
        })

        const data = await res.json()
        console.log(data.order)
        setSelectedOrder(data.order)

    }

    async function handleClickDeteleOrder(orderId) {
        const res = await fetch('http://localhost:8000/order/deleteOrderId', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({orderId})
        })

        const data = await res.json()
        alert(data.message)
        getOrder();
    }

    useEffect(() => {
        getOrder()
    }, [])

    return (
        <div className={cx('container')}>
            <header className={cx('header')}>
                <h1>📦 Quản lý đơn hàng</h1>
            </header>

            <div className={cx('tableSection')}>
                <h2>Danh sách đơn hàng</h2>
                <div className={cx('table-container')}>
                    <table>
                        <thead>
                            <tr>
                            <th>Mã đơn</th>
                            <th>Khách hàng</th>
                            <th>Ngày đặt</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.fullName}</td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>{order.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                <td
                                    className={cx("status", {
                                        processing: order.status === "Đang xử lý",
                                        shipping: order.status === "Đang giao",
                                        delivered: order.status === "Đã nhận",
                                        cancelled: order.status === "Đã hủy",
                                    })}
                                >
                                    {order.status}
                                </td>
                                <td>
                                    <button
                                        className={cx('detailBtn')}
                                        onClick = {() => handleClickViewOrderDetail(order._id)}
                                    >
                                        👁 Xem
                                    </button>
                                    <select
                                        value={order.status}
                                        className={cx('selectStatus')}
                                        onChange={(e) => handleChangeStatus(order._id, e.target.value)}
                                    >
                                        <option>Đang xử lý</option>
                                        <option>Đang giao</option>
                                        <option>Đã nhận</option>
                                        <option>Đã hủy</option>
                                    </select>
                                    <button
                                        className={cx('deleteBtn')}
                                        onClick={() => handleClickDeteleOrder(order._id)}
                                    >
                                        🗑
                                    </button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Chi tiết đơn hàng */}
            {selectedOrder && (
                <div className={cx('detailBox')}>
                <h3>🧾 Chi tiết đơn hàng {selectedOrder._id}</h3>
                <p><strong>Khách hàng:</strong> {selectedOrder.fullName}</p>
                <p><strong>Ngày đặt:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                <p><strong>Tổng tiền:</strong> {selectedOrder.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                <h4>Danh sách sản phẩm:</h4>
                <ul>
                    {selectedOrder.items.map((item, i) => (
                    <li key={i}>
                        {item.product.name} — SL: {item.quantity} — Giá:{" "}
                        {item.priceAtPurchase.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </li>
                    ))}
                </ul>
                <button
                    className={cx('closeBtn')}
                    onClick={() => setSelectedOrder(null)}
                >
                    Đóng
                </button>
                </div>
            )}

        </div>
    );
}


export default OrderManagement