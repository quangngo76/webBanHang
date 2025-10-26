const Product = require('../models/Products');
const Order = require('../models/Orders')
const Cart = require('../models/Carts')

class OrderController {

    async addOrder(req, res) {
        try {
            const { userId, fullName, phoneNumber, address, email, orders, totalPrice, payment } = req.body;

            if (!orders || orders.length === 0) {
                return res.status(400).json({ message: "Không có sản phẩm trong đơn hàng", err: true });
            }

            for (const order of orders) {
                const product = await Product.findById(order.productId).select('stock name');

                if (!product) {
                    return res.status(404).json({ message: `Không tìm thấy sản phẩm ${order.name}`, err: true });
                }

                if (product.stock <= 0) {
                    return res.status(405).json({ message: `Sản phẩm ${order.name} đã hết hàng`, err: true });
                }

                if (product.stock < order.quantity) {
                    return res.status(405).json({ message: `Sản phẩm ${order.name} không đủ hàng`, err: true });
                }

                // Trừ số lượng tồn kho
                await Product.updateOne(
                    { _id: order.productId },
                    { $inc: { stock: -order.quantity } }
                );

                // Nếu tồn kho = 0, cập nhật trạng thái “Hết hàng”
                const updated = await Product.findById(order.productId).select('stock');
                if (updated.stock <= 0) {
                    await Product.updateOne(
                        { _id: order.productId },
                        { $set: { status: "Hết hàng" } }
                    );
                }

                await Cart.deleteOne({product: order.productId, user: userId})
            }

            // Tạo đơn hàng mới
            const newOrder = new Order({
                user: userId,
                items: orders.map(order => ({
                product: order.productId,
                quantity: order.quantity,
                priceAtPurchase: order.price
                })),
                fullName,
                email,
                phoneNumber,
                address,
                payment,
                totalPrice,
            });

            await newOrder.save();

            const products = await Cart.find()

            return res.status(200).json({
                message: "Tạo đơn hàng thành công!",
                products,
                err: false
            });

        } catch (error) {
            console.error("Lỗi server:", error);
            return res.status(500).json({ message: "Lỗi server", err: true });
        }
    }

    async getOrderOfUser(req, res) {
        const {userId} = req.query
        const orders = await Order.find({user: userId}).populate('items.product', 'name')

        res.status(200).json({orders})
    }

    async getOrderAll(req, res) {
        const orders = await Order.find().populate('items.product')

        res.status(200).json({orders})
    }

    async updateStatus(req, res) {
        try {
            const { id, status } = req.body;

            if (!id || !status) {
            return res.status(400).json({ message: "Thiếu id hoặc status", err: true });
            }

            const order = await Order.findById(id);
            if (!order) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng", err: true });
            }

            await Order.findOneAndUpdate(
                { _id: id },
                { $set: { status } },
                { new: true, runValidators: true }
            );

            const orders = await Order.find();

            res.status(200).json({
                message: "Cập nhật Status cho Đơn Hàng thành công",
                err: false,
                orders
            });

        } catch (error) {
            console.error("Lỗi updateStatus:", error);
            return res.status(500).json({ message: "Lỗi server", err: true });
        }
    }


}

module.exports = new OrderController();
