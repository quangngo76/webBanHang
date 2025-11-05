const Cart = require('../models/Carts');

class CartController {
    
    //Thêm sản phẩm theo userId và productId
    async addProduct(req, res) {
        try {
        const { userId, productId} = req.body;

        // Check sản phẩm đã có trong giỏ chưa
        let cartItem = await Cart.findOne({ user: userId, product: productId });

        if (cartItem) {
            // Nếu có rồi thì cộng thêm số lượng
            cartItem.quantity += 1;
            await cartItem.save();

            return res.status(200).json({
                message: "Cập nhật số lượng sản phẩm trong giỏ thành công",
            });
        }

        // Nếu chưa có thì tạo mới
        let newCartItem = new Cart({
            user: userId,
            product: productId,
            quantity: 1,
        });

        await newCartItem.save();

        return res.status(201).json({
            message: "Thêm sản phẩm vào giỏ thành công"
        });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Lỗi server" });
        }
    }

    //Lấy tát cả sản phẩm theo ID của User
    async getProduct(req, res) {
        try {
            const { userId } = req.query;

            if (!userId) {
                return res.status(400).json({ err: true, message: 'Thiếu userId trong query!' });
            }

            const productOfCart = await Cart.find({ user: userId }).populate('product');

            if (!productOfCart || productOfCart.length === 0) {
                return res.status(200).json({ products: [] });
            }

            res.status(200).json({ products: productOfCart });

        } catch (err) {
            console.error('Lỗi khi lấy giỏ hàng:', err);
            res.status(500).json({ err: true, message: 'Lỗi server khi lấy giỏ hàng.' });
        }
    }


    //Xóa sản phẩm theo productId và userId
    async deleteProduct(req, res){
        try {
            const {productId, userId} = req.body
            const result = await Cart.deleteOne({ _id: productId, userId });
        
            if(result.deletedCount === 0) 
                res.status(500).json({message:"Xóa thất bại", err: true})
        
            const getProducts = await Cart.find({ userId }).populate('product');
                    
            return res.status(200).json({ message: "Xóa thành công", err: false, products: getProducts });
        } catch (error) {
            res.status(500).json({ message: "Lỗi server", err: true });
        }
    }

}

module.exports = new CartController();
