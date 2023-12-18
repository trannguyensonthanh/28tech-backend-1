const Cart  = require("../../models/cart.model");

module.exports.cartId = async (req, res, next) => {
  if (!req.cookies.cartId) {
const cart = new Cart();  // tạo một giỏ hàng trống
await cart.save();

const expiresTime = 1000* 60 * 60 * 24 * 365;

res.cookie("cartId", cart.id, {
  expires: new Date(Date.now() + expiresTime)
});  // đã lưu vào database nên lưu nó vào cookies

  } else {
    // khi đã có giỏ hàng
  }
  next();
}