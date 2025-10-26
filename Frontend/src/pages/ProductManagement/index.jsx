import styles from './ProductManagement.module.scss'
import classNames from 'classnames/bind'
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        background: 'white',
        borderRadius: '8px',
        padding: '20px',
        position: 'relative',
        width: '400px'
      }}>
        {children}
        <button 
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            cursor: 'pointer',
            border: 'none',
            background: 'transparent',
            fontSize: '18px'
          }}  
          onClick={onClose}
        >
          ✖
        </button>
      </div>
    </div>,
    document.body
  );
}

function ProductManagement() {
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }

  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([])
  const [modalType, setModalType] = useState(null)

  const [inputValues, setInputValues] = useState({
    productName: '',
    image: null,
    price: '',
    quantity: '',
    productId: null
  });

  const fieldFormModal = [
    {id: 'productName', type: 'text', labelValue: 'Tên Sản Phẩm'},
    {id: 'image', type: 'file', labelValue: 'Hình Ảnh'},
    {id: 'price', type: 'number', labelValue: 'Giá'},
    {id: 'quantity', type: 'number', labelValue: 'Số Lượng'},
  ]

  // Handle input change
  function handleOnchange(e) {
    const name = e.target.name;
    if (e.target.type === "file") {
      const file = e.target.files[0];
      setInputValues(prev => ({
        ...prev,
        [name]: file
      }));
    } else {
      const value = e.target.value;
      setInputValues(prev => ({
        ...prev,
        [name]: value
      }));
    }
  }

  // Hàm load sản phẩm
  const loadProducts = async () => {
    const res = await fetch(`http://localhost:8000/product/getProduct`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setProducts(data.products);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  //Xóa sản phẩm
  const handleOnClickDelete = async (productId) => {
    const res = await fetch("http://localhost:8000/product/delProduct", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({productId}),
    })

    const data = await res.json()

    if(data.err) console.log(data.message)

    setProducts(data.products)

  }

  //Sửa sản phẩm
  const handleOnClickEdit = async (productId) => {

    const res = await fetch(`http://localhost:8000/product/getProduct/${productId}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    })

    const data = await res.json()
    console.log(data.products.imageUrl)
    setInputValues({
      productName: data.products.name, 
      image: data.products.imageUrl, 
      price: data.products.price, 
      quantity: data.products.stock,
      productId: data.products._id })
    setModalType('editProduct')
    setIsOpen(true)

  }

  //Thêm sản phẩm
  const handleOnClickAdd = async () => {
    setInputValues({ productName: '', image: null, price: '', quantity: '' , productId: null})
    setModalType('addProduct')
    setIsOpen(true)
  }

  // Handle submit của Thêm sản phẩm
  const handleSubmitAddProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", inputValues.productName);
    formData.append("price", inputValues.price);
    formData.append("quantity", inputValues.quantity);
    formData.append("image", inputValues.image);

    await fetch("http://localhost:8000/product/addProduct", {
      method: "POST",
      body: formData
    });

    // Refresh list
    await loadProducts();

    // Reset form
    setInputValues({ productName: '', image: null, price: '', quantity: '', productId: null });

    // Close modal
    setIsOpen(false);
  }

  const handleSubmitEditProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", inputValues.productName);
    formData.append("price", inputValues.price);
    formData.append("quantity", inputValues.quantity);
    formData.append("image", inputValues.image);
    formData.append('productId', inputValues.productId )

    await fetch("http://localhost:8000/product/editProduct", {
      method: "POST",
      body: formData
    });

    // Refresh list
    await loadProducts();

    // Reset form
    setInputValues({ productName: '', image: null, price: '', quantity: '', productId: null });

    // Close modal
    setIsOpen(false);
  }

  return (
    <div className={cx('ProductManagement')}>
      <h1 className={cx('header-page')}>Quản lý Sản Phẩm</h1>
      <hr />
      <button onClick={handleOnClickAdd}>
        Thêm Sản Phẩm +
      </button>

      <div className={cx("ProductManagement-page")}>
        <h3>📋 Danh sách sản phẩm</h3>
        <div className={cx('container-table')}>
          <table>
            <thead>
              <tr>
                <th>Tên Sản Phẩm</th>
                <th>Hình Ảnh</th>
                <th>Giá</th>
                <th>Kho Hàng</th>
                <th>Status</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>
                  <img
                    src={`http://localhost:8000/uploads/${product.imageUrl}?t=${Date.now()}`}
                    alt={product.name}
                    width="80"
                  />
                </td>
                <td>{formatPrice(product.price)}</td>
                <td>{product.stock}</td>
                <td>{product.status}</td>
                <td>
                  <FontAwesomeIcon
                    className={cx('icon')}
                    icon={faTrashCan}
                    onClick={() => handleOnClickDelete(product._id)}
                  />
                  <FontAwesomeIcon
                    className={cx('icon')}
                    icon={faPenToSquare}
                    onClick={(e) => handleOnClickEdit(product._id)}
                  />
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {modalType === 'addProduct' && 
          <form className={cx('Modal')} onSubmit={handleSubmitAddProduct}>
            <h2>Thêm Sản Phẩm</h2>

            {fieldFormModal.map(item => (
              <div key={item.id} className={cx('field')}>
                <label htmlFor={item.id}>{item.labelValue}</label>
                <input 
                  type={item.type} 
                  name={item.id} 
                  id={item.id} 
                  value={item.type !== "file" ? inputValues[item.id] || "" : undefined}
                  onChange={handleOnchange}
                  accept={item.id === "image" ? "image/*" : undefined}
                  required={item.id !== "image"}
                />
                {item.id === "image" && inputValues.image && (
                  <img 
                    src={URL.createObjectURL(inputValues.image)} 
                    alt="preview" 
                    width="100"
                    style={{marginTop: "10px"}}
                  />
                )}
              </div>
            ))}

            <button type='submit'>Xác Nhận</button>
          </form>
        }

        {modalType === 'editProduct' && 
          <form className={cx('Modal')} onSubmit={(e)=>handleSubmitEditProduct(e)}>
            <h2>Chỉnh Sửa Sản Phẩm</h2>

            {fieldFormModal.map(item => (
              <div key={item.id} className={cx('field')}>
                <label htmlFor={item.id}>{item.labelValue}</label>
                <input 
                  type={item.type} 
                  name={item.id} 
                  id={item.id} 
                  value={item.type !== "file" ? inputValues[item.id] || "" : undefined}
                  onChange={handleOnchange}
                  accept={item.id === "image" ? "image/*" : undefined}
                  required={item.id !== "image"}
                />
                {item.id === "image" && (
                  <img
                    src={
                      inputValues.image instanceof File
                        ? URL.createObjectURL(inputValues.image)
                        : `http://localhost:8000/uploads/${inputValues.image}`
                    }
                    alt="preview"
                    width="100"
                    style={{ marginTop: "10px" }}
                  />
                )}

              </div>
            ))}

            <button type='submit'>Xác Nhận</button>
          </form>
        }
      </Modal>
    </div>
  );
}

export default ProductManagement;
