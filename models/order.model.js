const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    
cart_id: String,
userInfo: {
  fullName : String,
  phone: String,
  address: String
},
products: [
  {
    product_id: String,
    price: Number,
    discountPercentage: Number,
    quantity: Number,
  }
]
}, {
  timestamps: true
});

const Order = mongoose.model("Order", orderSchema, "orders"); //Role là tên của model này, roleSchema là tên của định dạng,  roles là tên trong mongodb

module.exports = Order;  // chỉ export cái thằng Role 