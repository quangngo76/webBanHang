import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faMagnifyingGlass, faCircleXmark, faSpinner, 
    faCartPlus, faUser, faBell, faBoxOpen, 
    faGear, faRightToBracket
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';

const cx = classNames.bind(styles);

function Header() {
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isClickUser, setIsClickUser] = useState(false);
    const [productNumber, setProductNumber] = useState(0);
    const inputRef = useRef();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLogin, user } = useSelector(state => state.auth);

    const fetchCartCount = async () => {
        if (!isLogin || !user?._id) return setProductNumber(0);
        try {
            const res = await fetch(`http://localhost:8000/cart?userId=${user._id}`);
            const data = await res.json();
            setProductNumber(data?.products?.length || 0);
        } catch (error) {
            console.error("Lỗi fetch cart:", error);
        }
    };

    useEffect(() => {
        fetchCartCount();
    }, [isLogin, user]);

    useEffect(() => {
        const handleCartUpdate = () => fetchCartCount();
        window.addEventListener("cartUpdated", handleCartUpdate);
        return () => window.removeEventListener("cartUpdated", handleCartUpdate);
    }, []);

    useEffect(() => {
        fetchCartCount();
    }, [isLogin, user]);


    // Fake loading khi search
    useEffect(() => {
        if (!searchValue.trim()) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, [searchValue]);

    const handleOnclickLogout = () => {
        dispatch(logout()); 
        navigate('/auth/login');
    };

    const handleOnclickSearchValue = async (searchValue) => { 

    }
    return (
        <div className={cx('header')}>
            <div className={cx('inner')}>
                {/* Logo */}
                <div className={cx('logo')}>
                    <Link to={'/'}>
                        <img src="/images/logoStore.png" alt="logo" />
                    </Link>
                </div>

                {/* Search */}
                <div className={cx('search')}>
                    <input
                        type="text"
                        placeholder='Tìm kiếm...'
                        ref={inputRef}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    {searchValue.trim().length > 0 && 
                        <button
                            className={cx('loadingOrClear')}
                            onClick={() => {
                                setSearchValue('');
                                setIsLoading(false);
                                inputRef.current.focus();
                            }}
                        >
                            <FontAwesomeIcon 
                                icon={isLoading ? faSpinner : faCircleXmark} 
                                spin={isLoading}  
                            />
                        </button>
                    }
                    <button 
                        type='submit' 
                        className={cx('search-btn')}
                        onClick={() => handleOnclickSearchValue(searchValue)}
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>

                {/* Actions */}
                <div className={cx('actions')}>
                    <button className={cx('bell')}>
                        <FontAwesomeIcon icon={faBell} />
                    </button>
                    <Link to={'/cart'}>
                        <button className={cx('cart')}>
                            <FontAwesomeIcon icon={faCartPlus} />
                            {productNumber > 0 && (
                                <span className={cx('badge')}>{productNumber}</span>
                            )}
                        </button>
                    </Link>

                    {isLogin ? (
                        <div>
                            <button 
                                className={cx('user')} 
                                onClick={() => setIsClickUser(!isClickUser)}
                            >
                                <FontAwesomeIcon icon={faUser} />
                            </button>
                            {isClickUser &&
                                <div className={cx('user-box')}>
                                    <div className={cx('box-item')}>
                                        <button>
                                            <FontAwesomeIcon icon={faUser} />
                                        </button>
                                        <p>{user?.name || "User"}</p>
                                    </div>
                                    <Link to='/OrderPage' style={{textDecoration: 'none', color: 'black'}}>
                                        <div className={cx('box-item')}>
                                            <button>
                                                <FontAwesomeIcon icon={faBoxOpen} />
                                            </button>
                                            <p>Đơn Hàng</p>
                                        </div>
                                    </Link>
                                    <div className={cx('box-item')}>
                                        <button>
                                            <FontAwesomeIcon icon={faGear} />
                                        </button>
                                        <p>Cài Đặt</p>
                                    </div>
                                    <div 
                                        className={cx('box-item')}
                                        onClick={handleOnclickLogout}
                                    >
                                        <button>
                                            <FontAwesomeIcon icon={faRightToBracket} />
                                        </button>
                                        <p>Đăng Xuất</p>
                                    </div>
                                </div>
                            }
                        </div>
                    ) : (
                        <Link className={cx('login')} to={'/auth/login'}>
                            Login 
                            <FontAwesomeIcon className={cx('login-icon')} icon={faUser} />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
