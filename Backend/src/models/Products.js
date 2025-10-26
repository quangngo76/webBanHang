const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  price: Number,
  stock: Number,
  status: { type: String, enum: ['Còn Hàng', 'Hết hàng'], default: "Còn Hàng" },
});

module.exports = mongoose.model('Product', ProductSchema);
