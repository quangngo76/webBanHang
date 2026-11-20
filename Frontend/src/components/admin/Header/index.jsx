import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faRightToBracket} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/authSlice';

const cx = classNames.bind(styles);

function AdminHeader() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
    
  const handleOnclickLogout = () => {
      dispatch(logout()); 
      navigate('/auth/login');
  };

    return (
        <div className={cx('header')}>
          <h1>📊 Bảng điều khiển quản trị</h1>
          <div>
            <button 
              className={cx('logoutBtn')}
              onClick={handleOnclickLogout}
            >
              Đăng xuất
              <FontAwesomeIcon icon={faRightToBracket} />
            </button>
          </div>
        </div>
    )
}

export default AdminHeader;
