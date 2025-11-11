const Order = require('../models/Orders')
const User = require('../models/Users')
const Product = require('../models/Products')

class DataController {

    async getData(req, res) {
        //5 Tháng trước
        const fiveMonthsAgo = new Date();
        fiveMonthsAgo.setMonth(fiveMonthsAgo.getMonth() - 5);
        fiveMonthsAgo.setDate(1); 

        //Lấy tất cả đơn hàng tháng 11
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const orders = await Order.find({
            createdAt: {
                $gte: startOfMonth,
                $lt: startOfNextMonth
            }
        });

        //doanh thu 5 tháng trước
        const revenueData = await Order.aggregate([
        {
            $match: {
                createdAt: { $gte: fiveMonthsAgo }
            }
        },
        {
            $group: {
                _id: { $month: "$createdAt" },  
                totalPrice: { $sum: "$totalPrice" }        
            }
        },
        { $sort: { "_id": 1 } }             
        ]);

        //số lượng user
        const users = await User.countDocuments({ role: 'User' });
        
        //số lượng sản phẩm
        const products = await Product.countDocuments();

        res.status(200).json({users, orders, products, revenueData})
    }

}

module.exports = new DataController();
