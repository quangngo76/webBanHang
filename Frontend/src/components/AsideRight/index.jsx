import classNames from 'classnames/bind';
import styles from './AsideRight.module.scss';

const cx = classNames.bind(styles);

function AsideRight(){
    return(
        <div className={cx('Aside-right')}>
            <div className={cx('ads')}>
                <h2>🔥Siêu Sale Công Nghệ 2025</h2>
                <div className={cx("ads-text")}>
                    <div className={cx("ads-content")}>
                        <p>Giảm giá đến 50% </p>
                        <p>Mua Ngay</p>
                    </div>
                    <img src="/images/slides/image2.avif" alt=""/>
                </div>
            </div>
            <div className={cx('promotion')}></div>
        </div>
    )
}

export default AsideRight;
