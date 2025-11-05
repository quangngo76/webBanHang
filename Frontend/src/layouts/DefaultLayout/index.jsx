import classNames from 'classnames/bind';
import styles from './defaultLayout.module.scss';
import Header from '../../components/Header';
import Aside from '../../components/Aside';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={cx('app')}>
        <Header />

        <div className={cx('container')}>
          <Aside />
          <div className={cx('content')} >
            {children}
          </div>
        </div>

    </div>
  );
}

export default DefaultLayout;
