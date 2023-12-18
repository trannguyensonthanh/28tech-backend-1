const Cart = require("../../models/cart.model");

// [POST] /cart/add/:productId
module.exports.addPost = async (req, res) => {
  const cartId = req.cookies.cartId;
  const productId = req.params.productId;
  const quantity = parseInt(req.body.quantity);

const cart = await Cart.findOne({
  _id: cartId
});

const existProductIncart = cart.products.find(item => {
  return item.product_id === productId;
})

if (existProductIncart) {
  // cập nhật quantity
  const newQuantity = quantity + existProductIncart.quantity;
  await Cart.updateOne({
    _id: cartId,
    'products.product_id' : productId
  },
  {
    'products.$.quantity': newQuantity
  }
  )
}
else {
// thêm sản phẩm mới vào database
const objectCart = {
  product_id: productId,
  quantity: quantity,
};
await Cart.updateOne(
  {
    _id: cartId,
  },
  {
    $push: {
      products: objectCart,
    },
  }
);
}


 
  req.flash("success", "thêm sản phẩm vào giỏ hàng thành công!");
  res.redirect("back");
};
