const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
    
user_id : String,
products: [
 {
  product_id: String,
  quantity: Number
 }
]
}, {
  timestamps: true
});

const Cart = mongoose.model("Cart", cartSchema, "cart"); //Role là tên của model này, roleSchema là tên của định dạng,  roles là tên trong mongodb

module.exports = Cart;  // chỉ export cái thằng Role 
