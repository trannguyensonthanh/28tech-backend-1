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
    const cart = await Cart.findOne({
      _id: req.cookies.cartId
    })
cart.totalQuantity = cart.products.reduce((sum, item) => {
     return sum + item.quantity;
}, 0)

  res.locals.miniCart = cart;
  }
  next();
}