import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./BankPayment.module.scss";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const banks = [
    { id: 1, name: "Vietcombank", logo: "https://upload.wikimedia.org/wikipedia/commons/9/99/Logo_Vietcombank.png" },
    { id: 2, name: "Techcombank", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Techcombank_logo.svg" },
    { id: 3, name: "MB Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/d/dd/MB_Bank_logo.svg" },
    { id: 4, name: "ACB", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1e/ACB_logo.svg" },
];

export default function BankPayment() {
    const location = useLocation()
    const {finalData} = location.state || {}
    const navigate = useNavigate()
    const [selectedBank, setSelectedBank] = useState(null);
    const [accountNumber, setAccountNumber] = useState("");
    const [accountName, setAccountName] = useState("");
    // const [amount, setAmount] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedBank) {
            alert("Vui lòng chọn ngân hàng!");
            return;
        }
        let confirmAction = window.confirm(`Xác nhận thanh toán?`);
        if (!confirmAction) return;

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
                alert('Đặt Hàng thành công');
                navigate('/cart')
            }


        } catch (err) {
            console.error('Fetch error:', err);
        }
    };

    return (
        <div className={cx("container")}>
        <h2 className={cx("title")}>Thanh Toán Qua Ngân Hàng</h2>

        <div className={cx("content")}>
            {/* Danh sách ngân hàng */}
            <div className={cx("bank-list")}>
            {banks.map((bank) => (
                <div
                key={bank.id}
                className={cx("bank-item", { active: selectedBank?.id === bank.id })}
                onClick={() => setSelectedBank(bank)}
                >
                <img src={bank.logo} alt={bank.name} />
                <span>{bank.name}</span>
                </div>
            ))}
            </div>

            {/* Form thanh toán */}
            <form className={cx("form")} onSubmit={handleSubmit}>
                <div className={cx("form-group")}>
                    <label>Ngân hàng</label>
                    <input type="text" readOnly value={selectedBank?.name || ""} placeholder="Chưa chọn ngân hàng" />
                </div>

                <div className={cx("form-group")}>
                    <label>Số tài khoản</label>
                    <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="Nhập số tài khoản"
                    required
                    />
                </div>

                <div className={cx("form-group")}>
                    <label>Tên chủ tài khoản</label>
                    <input
                    type="text"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    placeholder="Nhập họ tên"
                    required
                    />
                </div>

                <div className={cx("form-group")}>
                    <label>Số tiền</label>
                    <input
                    type="number"
                    value={finalData.totalPrice}
                    // onChange={(e) => setAmount(e.target.value)}
                    // placeholder="Nhập số tiền"
                    // required
                    readOnly
                    />
                </div>

                <button type="submit" className={cx("submit-btn")}>
                    Xác nhận thanh toán
                </button>
            </form>
        </div>
        </div>
    );
}
