const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        priceAtPurchase: { type: Number, required: true }
        }
    ],
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    payment: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["Đang xử lý", "Đang giao", "Đã nhận", "Đã hủy"], default: "Đang xử lý" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
