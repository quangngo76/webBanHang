import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';
import AdminHeader from '../../components/admin/Header/index';
import Aside from '../../components/common/Aside'

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
  return (
    <div className={cx('app')}>
        <AdminHeader />
        
        <div className={cx('container')}>
          <Aside />
          <div className={cx('content')}>
            {children}
          </div>
        </div>

    </div>
  );
}

export default AdminLayout;
