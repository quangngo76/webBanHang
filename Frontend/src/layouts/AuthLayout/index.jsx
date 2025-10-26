import classNames from 'classnames/bind';
import styles from './AuthLayout.module.scss'
import avatar from '/images/clientAvatar.png'
import {Link} from 'react-router-dom'

const cx = classNames.bind(styles);

function AuthLayout({children}){
    return (
        <div className={cx('AuthLayout')}>
            <div className={cx("auth-wrapper")}>    
                <div className={cx('circle', 'circle-1')} />
                <div className={cx('circle', 'circle-2')} />
                <div className={cx('circle', 'circle-3')} />
                <div className={cx('circle', 'circle-4')} />
                <div className={cx('circle', 'circle-5')} />
                <div className={cx('circle', 'circle-6')} />
                <div className={cx('auth-container')}>
                    <Link to={'/'} style={{textDecorationLine: 'none'}}>
                        <h1>Trở Về Trang Chủ</h1>
                    </Link>
                    <hr />
                    <div className={cx('auth-content')}>
                        <div className={cx('auth-message')}>
                            <h3>Welcome Back!</h3>
                            <p>Nơi mua sắm tiện lợi, nhanh chóng và an toàn.</p>
                            <p>Đăng nhập để trải nghiệm ngay!</p>
                        </div>
                        <div className={cx('auth-box')} >
                            <img src={avatar} alt="avatar" className={cx("avatar")} />
                            {children}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AuthLayout;