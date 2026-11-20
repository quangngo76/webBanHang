import styles from './OrderPage.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import {useSelector } from 'react-redux'

const cx = classNames.bind(styles);

function OrderPage() {
  const navigate = useNavigate(); 
  const {user} = useSelector(state => state.auth)

  const [orders, setOrders] = useState([]);

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }

  const getOrders = async () => {
    try {
      const res = await fetch(`http://localhost:8000/order/getOrderOfUser?userId=${user._id}`,{
        method: 'GET',
        headers: {'Content-Type' : 'application/json'}
      })

      const data = await res.json()

      if(data.err){
        console.log(`Message: ${data.message}`)
      }else{
        setOrders(data.orders)
      }

    } catch (err) {
      console.log('Error Server!')
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  const handleClickBtn = async (id, status) => {
    let confirmAction
    if(status === 'Đã hủy'){
      confirmAction = window.confirm(`Bạn có chắc muốn hủy đơn hàng này không?`);
    }else{
      confirmAction = window.confirm(`Bạn đã nhận được hàng?`);
    }
    
    if (!confirmAction) return;

    try {
      await fetch('http://localhost:8000/order/updateStatus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });

      getOrders();

    }catch(error) {
      console.error('Error:', error);
      alert('Không thể kết nối đến server');
    }
  };

  return (
    <div className={cx('orders-page')}>
      <h1>Đơn hàng của bạn</h1>
      <hr />
      <div className={cx('div-btn')}>
        <button className={cx('back-btn')} onClick={() => navigate(-1)}>
          ⬅ Trở về
        </button>
      </div>

      <div className={cx('container-card')}>
        {orders.map((order) => (
          <div key={order._id} className={cx('order-card')}>
            <div className={cx('order-header')}>
              <h3>Mã đơn: {order._id}</h3>
              <span 
                className={cx('status', {
                  processing: order.status === "Đang xử lý",
                  shipping: order.status === "Đang giao",
                  delivered: order.status === "Đã nhận",
                  cancelled: order.status === "Đã hủy",
                })}
              >
                {order.status}
              </span>
            </div>

            <p><b>Ngày đặt:</b> {new Date(order.createdAt).toLocaleString('vi-VN')}</p>
            <p><b>Khách hàng:</b> {order.fullName}</p>

            <table className={cx('order-items')}>
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.product.name}</td>
                    <td>{item.quantity}</td>
                    <td>{formatPrice(item.priceAtPurchase)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={cx('total')}>
              Tổng cộng: <b>{formatPrice(order.totalPrice)}</b>
            </div>

            {/* 🟨 NÚT HỦY / ĐÃ NHẬN */}
            <div 
              className={cx('action-buttons')}
              style={{opacity: (order.status === 'Đã nhận' || order.status === 'Đã hủy' ? '0.6' : '1')}}
            >
              <button
                className={cx('btn-cancel')}
                onClick={() => handleClickBtn(order._id, "Đã hủy")}
                disabled={order.status === 'Đã nhận' || order.status === 'Đã hủy'}
              >
                Hủy đơn
              </button>
              <button
                className={cx('btn-received')}
                onClick={() => handleClickBtn(order._id, "Đã nhận")}
                disabled={order.status === 'Đã nhận' || order.status === 'Đã hủy'}
              >
                Đã nhận
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderPage;
