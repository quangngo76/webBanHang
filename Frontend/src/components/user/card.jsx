import classNames from 'classnames/bind';
import styles from './card.module.scss';

const cx = classNames.bind(styles);

export default function Card({ product, onAddCart }) {

    //Định dạng format đơn vị tiền
    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND'
        });
    };

    return (
        //component Card
        <div className={cx('card')}>
            <div className={cx('image')}>
                <img src={`http://localhost:8000/uploads/${product.imageUrl}`} />
            </div>
            <div className={cx('infor-card')}>
                <h3>{product.name}</h3>
                <span>Giá: {formatPrice(product.price)}</span>
            </div>
            <div className={cx('btn-card')}>
                <button className={cx('infor-product')}>Infor</button>
                <button 
                    className={cx('add-cart')}
                    onClick={()=> onAddCart(product._id)}
                >
                    Add cart
                </button>
            </div>
        </div>
    );
}