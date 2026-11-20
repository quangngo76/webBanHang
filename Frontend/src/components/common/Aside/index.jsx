import styles from './Aside.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHouse, faBoxOpen, faNewspaper, faLocationDot, faAddressCard, faBarsProgress, faGauge, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Aside() {
  const { isLogin, user } = useSelector((state) => state.auth);
  const [navList, setNavList] = useState([]);
  const [active, setActive] = useState('');

  const navListUser = [
    { id: 'home', name: 'Trang Chủ', icon: faHouse, path: '/' },
    { id: 'category', name: 'Danh Mục Sản Phẩm', icon: faBoxOpen, path: '/productCategory' },
    { id: 'blogs', name: 'Bài Viết', icon: faNewspaper, path: '/blogs' },
    { id: 'contact', name: 'Liên Hệ', icon: faAddressCard, path: '/contact' },
    { id: 'StoreSystem', name: 'Hệ Thống Cửa Hàng', icon: faLocationDot, path: '/StoreSystem' },
  ];

  const navListAdmin = [
    { id: 'Dashboard', name: 'Dashboard', icon: faGauge, path: '/Dashboard' },
    { id: 'management-product', name: 'Sản Phẩm', icon: faBarsProgress, path: '/productManagement' },
    { id: 'UserManagement', name: 'Người Dùng', icon: faUsers, path: '/UserManagement' },
    { id: 'OrderManagement', name: 'Đơn Hàng', icon: faBoxOpen, path: '/OrderManagement' },
  ];

  const handleOnClick = (navItemId) => {
    setActive(navItemId);
    localStorage.setItem('activeNav', navItemId);
  };

  // Khôi phục trạng thái active
  useEffect(() => {
    const savedActive = localStorage.getItem('activeNav');
    if (savedActive) setActive(savedActive);
  }, []);

  // Cập nhật danh sách nav khi user/role thay đổi
  useEffect(() => {
    if (isLogin) {
      if (user.role === 'User') setNavList(navListUser);
      else if (user.role === 'Admin') setNavList(navListAdmin);
    } else {
      setNavList(navListUser);
    }
  }, [isLogin, user]);

  return (
    <div className={cx('Aside')}>
      <div className={cx('bars')}>
        <FontAwesomeIcon className={cx('icon-bars')} icon={faBars} />
        <img src="/images/logoStore.png" alt="logo" />
      </div>

      <div className={cx('sideBar')}>
        {navList.map((navItem) => (
          <Link
            key={navItem.id}
            className={cx('sideBarLink')}
            to={navItem.path}
            style={{ background: active === navItem.id ? '#1abc9c' : 'transparent' }}
            onClick={() => handleOnClick(navItem.id)}
          >
            <div className={cx('sideBarItem')}>
              <FontAwesomeIcon className={cx('sideBar-icons')} icon={navItem.icon} />
              {navItem.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Aside;
