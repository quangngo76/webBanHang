const Order = require('../models/Orders')
const User = require('../models/Users')
const Product = require('../models/Products')

class DataController {

    async getData(req, res) {
        const fiveMonthsAgo = new Date();
        fiveMonthsAgo.setMonth(fiveMonthsAgo.getMonth() - 5);
        fiveMonthsAgo.setDate(1); 

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

        const users = await User.countDocuments({ role: 'User' });
        const orders = await Order.countDocuments();
        const products = await Product.countDocuments();

        const totalPrice = await Order.find().select('totalPrice')

        res.status(200).json({users, orders, products , totalPrice, revenueData})
    }

}

module.exports = new DataController();
