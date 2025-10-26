import classNames from 'classnames/bind';
import styles from './home.module.scss';
import AsideRight from '../../components/AsideRight/index';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const cx = classNames.bind(styles);

function Home() {
    const { isLogin, user } = useSelector(state => state.auth);
    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }
    
    const images = ["image1", "image2", "image3", "image4"];
    const [index, setIndex] = useState(0);
    const [prev, setPrev] = useState(null);
    const [products, setProducts] = useState([]);

    // Thêm vào giỏ hàng
    // async function handleOnClick(product) {
    //     if (isLogin) {
    //         const valuedata = {
    //             userId: user._id,
    //             productId: product._id
    //         };

    //         try {
    //             await fetch("http://localhost:8000/cart", {
    //                 method: "POST",
    //                 headers: { "Content-Type": "application/json" },
    //                 body: JSON.stringify(valuedata),
    //             });
    //             console.log("✅ Added to cart", valuedata);
    //         } catch (err) {
    //             console.error("❌ Fetch error:", err);
    //         }
    //     } else {
    //         console.log("⚠️ User chưa đăng nhập!");
    //     }
    // }

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

                {/* 3 Icon Cards */}
                <div className={cx('features')}>
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

                {/* Danh sách sản phẩm */}
                <div className={cx('products')}>
                    <h2>Sản phẩm mới</h2>
                    <div className={cx('list-products')}>
                        {products.map(product => (
                            <div key={product._id} className={cx('card')}>
                                <div className={cx('image')}>
                                    <img src={`http://localhost:8000/uploads/${product.imageUrl}?t=${Date.now()}`} alt={product.name} />
                                </div>
                                <div className={cx('infor-card')}>
                                    <h3>{product.name}</h3>
                                    <span>Giá: {formatPrice(product.price)}</span>
                                </div>
                                {/* <div className={cx('btn-card')}>
                                    <button className={cx('infor-product')}>Infor</button>
                                    <button onClick={() => handleOnClick(product)} className={cx('add-cart')}>Add cart</button>
                                </div> */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <AsideRight />
        </div>
    );
}

export default Home;

// import styles from "./home.module.scss";
// import quantity from "/images/icons/quantity.png";
// import sale from "/images/icons/sale.png";
// import support from "/images/icons/support.png";
// import classNames from 'classnames/bind';
// import AsideRight from '../../components/AsideRight/index';
// import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// const cx = classNames.bind(styles);

// function Home() {
//     const products = [
//         { id: 1, name: "iPhone 15 Pro", price: "35,000,000₫", img: "/images/products/iphone15.jpg" },
//         { id: 2, name: "Samsung S24 Ultra", price: "32,000,000₫", img: "/images/products/iphone15.jpg" },
//         { id: 3, name: "Xiaomi 14", price: "18,000,000₫", img: "/images/products/iphone15.jpg" },
//         { id: 4, name: "OPPO Find X7", price: "20,000,000₫", img: "/images/products/iphone15.jpg" },
//     ];

//     return (
//         <div className={cx('Home')}>
//             <div className={cx('main')}>
//                 {/* Hero div */}
//                 <div className={cx('hero')}>
//                     <div className={cx('heroContent')}>
//                     <h1>Chào mừng đến với Mobile Shopee</h1>
//                     <p>Khám phá các sản phẩm công nghệ chất lượng – giá tốt nhất</p>
//                     <button>Xem sản phẩm</button>
//                     </div>
//                 </div>
//                 {/* 3 Icon Cards */}
//                 <div className={cx('features')}>
//                     <div className={cx('featureCard')}>
//                     <img src={quantity} alt="Chất lượng hàng đầu" />
//                     <h3>Chất lượng hàng đầu</h3>
//                     <p>Sản phẩm chính hãng, đảm bảo uy tín và bền bỉ.</p>
//                     </div>
//                     <div className={cx('featureCard')}>
//                     <img src={sale} alt="Ưu đãi hấp dẫn" />
//                     <h3>Ưu đãi hấp dẫn</h3>
//                     <p>Giá cạnh tranh cùng nhiều chương trình khuyến mãi.</p>
//                     </div>
//                     <div className={cx('featureCard')}>
//                     <img src={support} alt="Hỗ trợ 24/7" />
//                     <h3>Hỗ trợ 24/7</h3>
//                     <p>Tư vấn và hỗ trợ kỹ thuật mọi lúc, mọi nơi.</p>
//                     </div>
//                 </div>
//                 {/* Danh sách sản phẩm */}
//                 <div className={cx('products')}>
//                     <h2>Sản phẩm mới</h2>
//                     <div className={cx('grid')}>
//                     {products.map((item) => (
//                         <div key={item.id} className={cx('card')}>
//                             <img src={item.img} alt={item.name} />
//                             <h4>{item.name}</h4>
//                             <p className={cx('price')}>{item.price}</p>
//                         </div>
//                     ))}
//                     </div>
//                 </div>
//             </div>
//             <AsideRight />
//         </div>
//     );
// }

// export default Home
