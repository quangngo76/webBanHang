import classNames from 'classnames/bind';
import styles from './ProductCategory.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong, faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function ProductCategory() {
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }
  
  const { user, isLogin } = useSelector((state) => state.auth);
  const [searchValue, setSearchValue] = useState('all');
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1)
  const [pageNumber, setPageNumber] = useState(1)

  // Thêm vào giỏ hàng
  const handleOnClickAddCart = async (productId) => {
    if (isLogin) {
      try {
        await fetch('http://localhost:8000/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user._id, productId }),
        });
        console.log('✅ Added to cart', productId);
      } catch (err) {
        console.error('❌ Fetch error:', err);
      }
    } else {
      console.log('⚠️ User chưa đăng nhập!');
    }
  };

  //Hàm fetch sản phẩm (có phân trang + lọc)
  const getProducts = async (pageNum = 1) => {
    try {
      const res = await fetch('http://localhost:8000/product/searchProduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          searchValue,
          pageNumber: pageNum,
          limit: 10,
        }),
      });

      const data = await res.json();
      setProducts(data.products || []);
      setPageNumber(data.pageNumber || 1);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('❌ Lỗi khi load sản phẩm:', error);
    }
  };

  // Gọi lại mỗi khi searchValue thay đổi
  useEffect(() => {
    getProducts();
  }, [searchValue]);

  const handlePrevPage = () => {
    if (pageNumber > 1) getProducts(pageNumber - 1);
  };

  const handleNextPage = () => {
    if (pageNumber < totalPages) getProducts(pageNumber + 1);
  };

  return (
    <div className={cx('ProductCategory')}>
      <h1>Danh Mục Sản Phẩm</h1>
      <hr />
      
      <div className={cx('choose')}>
        <select 
          value={searchValue} 
          onChange={(e) => setSearchValue(e.target.value)}
        >
          <option value="all">Tất cả</option>
          <option value="lowest">Giá thấp nhất</option>
          <option value="highest">Giá cao nhất</option>
        </select>
      </div>

      <div className={cx('list-products')}>
        {products.map((product) => (
          <div key={product._id} className={cx('card')}>
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
                onClick={()=> handleOnClickAddCart(product._id)}
              >
                Add cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={cx('page-list-products')}>
        <button 
          onClick={handlePrevPage}
          disabled={pageNumber <= 1}
        >
          <FontAwesomeIcon className={cx('prev-page')} icon={faLeftLong} />
        </button>
        <span className={cx('pageNumber')}>{pageNumber}</span>
        <button 
          onClick={handleNextPage}
          disabled={pageNumber >= totalPages}
        >
          <FontAwesomeIcon className={cx('next-page')} icon={faRightLong} />
        </button>
      </div>
    </div>
  );
}

export default ProductCategory;
