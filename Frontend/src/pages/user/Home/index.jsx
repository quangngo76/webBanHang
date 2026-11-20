import classNames from 'classnames/bind';
import styles from './home.module.scss';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from '../../../components/user/card';

const cx = classNames.bind(styles);

function Home() {
    const { isLogin, user } = useSelector(state => state.auth);
    
    const images = ["image1", "image2", "image3", "image4"];
    const [index, setIndex] = useState(0);
    const [prev, setPrev] = useState(null);
    const [products, setProducts] = useState([]);

    // Slide show
    useEffect(() => {
        const t = setTimeout(() => {
            setPrev(index);
            setIndex((i) => (i + 1) % images.length);
        }, 3000);
        return () => clearTimeout(t);
    }, [index]);

    // Load products từ server
    const loadProducts = async () => {
        try {
            const res = await fetch("http://localhost:8000/product/getNewProduct", {
                method: "GET"
            });
            const data = await res.json();
            setProducts(data.products);
        } catch (err) {
            console.error("❌ Load products error:", err);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <div className={cx('Home')}>
            <div className={cx('Main')}>
                {/* Slide Show */}
                <div className={cx('boxSlide')}>
                    <div className={cx("slideShow")}>
                        {images.map((img, i) => (
                            <img
                                key={i}
                                src={`/images/slides/${img}.avif`}
                                alt=""
                                className={cx({ active: i === index, prev: i === prev })}
                            />
                        ))}
                    </div>
                </div>

                {/* Danh sách sản phẩm */}
                <div className={cx('products')} >
                    <h2>Sản phẩm mới</h2>
                    <div className={cx('list-products')}>
                        {products.map(product => (
                            <Card
                                key={product._id}
                                product={product}
                            />
                        ))}
                    </div>
                </div>

                {/* 3 Icon Cards */}
                <div className={cx('features')}>
                    <h2>Chúng tôi mang đến cho bạn</h2>
                    <div className={cx('featureListCard')}>
                        <div className={cx('featureCard')}>
                            <img src= '/images/icons/quantity.png' alt="Chất lượng hàng đầu" />
                            <h3>Chất lượng hàng đầu</h3>
                            <p>Sản phẩm chính hãng, đảm bảo uy tín và bền bỉ.</p>
                        </div>
                        <div className={cx('featureCard')}>
                            <img src='/images/icons/sale.png' alt="Ưu đãi hấp dẫn" />
                            <h3>Ưu đãi hấp dẫn</h3>
                            <p>Giá cạnh tranh cùng nhiều chương trình khuyến mãi.</p>
                        </div>
                        <div className={cx('featureCard')}>
                            <img src='/images/icons/support.png' alt="Hỗ trợ 24/7" />
                            <h3>Hỗ trợ 24/7</h3>
                            <p>Tư vấn và hỗ trợ kỹ thuật mọi lúc, mọi nơi.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Home;
