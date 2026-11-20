import styles from './Contact.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function Contact() {
  return (
    <div className={cx('Contact')}>
      <h1 className={cx('header-page')}>Liên Hệ</h1>
      <hr />
      <div className={cx("contact-page")}>
        <div className={cx("contact-info")}>
          <h2>Liên hệ với chúng tôi</h2>
          <p>Nếu bạn có thắc mắc hoặc cần hỗ trợ, hãy liên hệ với chúng tôi qua thông tin dưới đây.</p>
          <ul>
            <li><strong>Địa chỉ:</strong> 123 Đường ABC, Quận 1, TP.HCM</li>
            <li><strong>Điện thoại:</strong> (+84) 123 456 789</li>
            <li><strong>Email:</strong> support@yourdomain.com</li>
            <li><strong>Giờ làm việc:</strong> Thứ 2 – Thứ 6, 8:00 – 17:30</li>
          </ul>
        </div>

        <div className={cx("contact-form")}>
          <h2>Gửi tin nhắn</h2>
          <form>
            <input type="text" placeholder="Họ và tên" required />
            <input type="email" placeholder="Email" required />
            <input type="text" placeholder="Số điện thoại (tuỳ chọn)" />
            <textarea placeholder="Nội dung tin nhắn" rows="5" required></textarea>
            <button type="submit">Gửi liên hệ</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
