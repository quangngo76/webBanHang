import styles from './Cart.module.scss'
import classNames from 'classnames/bind'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'; 
import {useSelector } from 'react-redux'
import { useState, useEffect, useMemo } from 'react'

import {Link} from 'react-router-dom'

const cx = classNames.bind(styles)

function Cart(){
    const navigate = useNavigate(); 
    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }

    const {isLogin, user} = useSelector(state => state.auth)
    const [products, setProducts] = useState([])
    const [checkedItems, setCheckedItems] = useState({});
    const [quantity, setQuantity] = useState({})

    const [checkRadio, setCheckRadio] = useState(null)

    const [customer, setCustomer] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        address: '',
        payment: checkRadio,
        orders: {}
    })

    useEffect(() => {
        setCustomer(prev => ({
            ...prev,
            payment: checkRadio
        }))
    }, [checkRadio])

    const totalPrice = useMemo(() => {
        return products
            .filter(product => checkedItems[product._id])
            .reduce((sum, product) => 
                sum + (quantity[product._id] * product.product.price), 0
        );
    }, [products, checkedItems, quantity]);



    const loadProducts = async () => {
        if(isLogin){
            try {
                
                const res = await fetch(`http://localhost:8000/cart?userId=${user._id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const data = await res.json();
                setProducts(data.products || []);

                const initialQuantity = {};

                data.products.forEach(p => {
                    initialQuantity[p._id] = p.quantity;
                });

                setQuantity(initialQuantity);

            } catch (error) {
                console.log('Error: ' + error)
            }
        }else{
            setProducts([])
        }
    }

    useEffect(()=>{
        loadProducts()
    },[])

    const handleOnClickDelete = async(productId, userId) => {
        const res = await fetch('http://localhost:8000/cart/deleteProduct', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({productId, userId})
        })

        const data = await res.json()

        if(data.err){
            console.log(data.message)
        }
        setProducts(data.products)
    }

    const handleOnClickDecrease = (productId) => {
        setQuantity(prev => ({
            ...prev,
            [productId]: Math.max((prev[productId] || 1) - 1, 1)
        }));
    };

    const handleOnClickIncrease = (productId) => {
        setQuantity(prev => ({
            ...prev,
            [productId]: (prev[productId] || 1) + 1
        }));
    };

    const handleOnChangeCustomer = (e) => {
        const name = e.target.name
        const value = e.target.value

        setCustomer(prev => ({
            ...prev,
            [name] : value
        }))
    }

    const handleSubmitPay = async (e) => {
        e.preventDefault();

        const selectedOrders = products
            .filter(p => checkedItems[p._id])
            .map(p => ({
            productId: p.product._id,
            name: p.product.name,
            quantity: quantity[p._id],
            price: p.product.price,
            total: quantity[p._id] * p.product.price,
            }));

        const finalData = {
            userId: user._id,
            ...customer,
            orders: selectedOrders,
            totalPrice,
        };

        console.log('Final order data:', finalData);

        try {
            const res = await fetch('http://localhost:8000/order/addOrder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalData)
            });


            const data = await res.json();

            if(data.err){
                alert(data.message)
            }else{
                setProducts(data.products)
                setCustomer({
                    fullName: '',
                    phoneNumber: '',
                    email: '',
                    address: '',
                    payment: checkRadio,
                    orders: {}
                })
                alert('Đặt Hàng thành công');
            }


        } catch (err) {
            console.error('Fetch error:', err);
        }
    };


    
    return(
        <div className={cx('Cart-page')}>
            <div className={cx('swrap')}>

                {/* Giỏ Hàng */}
                <div className={cx('cart-content')}>
                    <h1>Giỏ Hàng</h1>
                    <hr />
                    <div className={cx('div-btn')}>
                        <button className={cx('back-btn')} onClick={() => navigate(-1)}>
                        ⬅ Trở về
                        </button>
                    </div>
                    <div className={cx('list-cart')}>
                        {products.map(product => (
                        <div key={product._id} className={cx('item')} 
                            style={{opacity: checkedItems[product._id] ? '1' : '0.6'}} 
                        >
                            <div className={cx('box-image')}>
                                <img src={`http://localhost:8000/uploads/${product.product.imageUrl}`} alt="" />
                            </div>
                            <p>{product.product.name}</p>
                            <div className={cx('quantity')}>
                                <button onClick={() => handleOnClickDecrease(product._id)}>-</button>
                                <span>
                                    {quantity[product._id] || 1}
                                </span>
                                <button onClick={() => handleOnClickIncrease(product._id)}>+</button>
                            </div>
                            <span className={cx('total')}>{formatPrice(quantity[product._id] * product.product.price)}</span>
                            <FontAwesomeIcon 
                                className={cx('delete-icon')} 
                                icon={faTrashCan} 
                                onClick={()=> handleOnClickDelete(product._id, product.user._id)}
                                style={{pointerEvents: checkedItems[product._id] ? 'auto' : 'none'}}
                            />
                            <input
                                type="checkbox"
                                checked={checkedItems[product._id] || false}
                                onChange={() =>
                                    setCheckedItems(prev => ({
                                    ...prev,
                                    [product._id]: !prev[product._id]
                                    }))
                                }
                            />

                        </div>
                        ))}
                    </div>
                </div>

                {/* Form Thanh Toán */}
                <form className={cx('payment-infor')} onSubmit={e => handleSubmitPay(e)}>
                    <h1>Payment Infor</h1>
                    <fieldset className={cx('field-user')}>
                        <legend>Khách hàng</legend>
                        <input 
                            type="text" 
                            placeholder='Tên' 
                            name='fullName'
                            value= {customer.fullName}
                            onChange={(e) => handleOnChangeCustomer(e)}
                            required
                        />
                        <input 
                            type="email" 
                            placeholder='Email' 
                            name='email'
                            value= {customer.email}
                            onChange={(e) => handleOnChangeCustomer(e)}
                            required
                        />
                        <input 
                            type="text" 
                            placeholder='Số điện thoại' 
                            name='phoneNumber'
                            value= {customer.phoneNumber}
                            onChange={(e) => handleOnChangeCustomer(e)}
                            required
                        />
                        <input 
                            type="text" 
                            placeholder='Địa chỉ' 
                            name='address'
                            value= {customer.address}
                            onChange={(e) => handleOnChangeCustomer(e)}
                            required
                        />
                    </fieldset>
                    <fieldset className={cx('field-payment')}>
                        <legend>Phương thức thanh toán</legend>
                        <label htmlFor="payLater">
                            <input 
                                type="radio" 
                                name='payment' 
                                id='payLater'
                                checked={'payLater' === checkRadio }
                                onChange={(e) => setCheckRadio(e.target.id)}
                            />
                            Thanh toán khi nhận được hàng
                        </label>
                        <label htmlFor="card">
                            <input 
                                type="radio" 
                                name='payment' 
                                id='card' 
                                checked={'card' === checkRadio }
                                onChange={(e) => setCheckRadio(e.target.id)}
                            />
                            Thẻ tín dụng / Thẻ ghi nợ
                        </label>
                        <label htmlFor="e-wallet">
                            <input 
                                type="radio" 
                                name='payment' 
                                id='e-wallet'
                                checked={'e-wallet' === checkRadio }
                                onChange={(e) => setCheckRadio(e.target.id)}
                            />
                            Ví điện tử (Mono, Zalo pay, Vn pay,…)
                        </label>
                    </fieldset>
                    <fieldset className={cx('field-summary')}>
                        <legend>Tóm tắt đơn hàng</legend>
                        <div className={cx('order')}>
                            {products
                            .filter(product => checkedItems[product._id])
                            .map(product => (
                                <p key={product._id}>{`${product.product.name}, Số lượng ${quantity[product._id]}, Tổng ${formatPrice(quantity[product._id] * product.product.price)}`}</p>
                            ))
                        }
                        </div>
                        <hr />
                        
                        <p>Tổng cộng: <span>{formatPrice(totalPrice)}</span></p>
                    </fieldset>
                    <button type='submit'>Đặt Hàng</button>
                </form>
            </div>
        </div>
    )
}

export default Cart;