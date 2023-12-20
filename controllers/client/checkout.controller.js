const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const productsHelper = require("../../helpers/products")
const Order = require("../../models/order.model");
// [get] /checkout/ 
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId;

const cart = await Cart.findOne({
  _id: cartId
})

if (cart.products.length > 0){
  for(const item of cart.products){
    const productId = item.product_id;
    const productInfo = await Product.findOne({
      _id: productId
    });
    productInfo.priceNew = productsHelper.priceNewProduct(productInfo);
    item.productInfo = productInfo;
    item.totalPrice = item.quantity * productInfo.priceNew;
  }
}
cart.totalPrice = cart.products.reduce( (sum, item) => {
  return item.totalPrice + sum;
}, 0)
  res.render("client/pages/checkout/index", {
    pageTitle: "Đặt hàng",
    cartDetail: cart
  });
}

// [post] /checkout/order

module.exports.order = async (req, res) => {
   const cartId = req.cookies.cartId;
  const userInfo = req.body;
    const cart = await Cart.findOne({
      _id: cartId

    })

    let products = [];
   for(const product of cart.products){
    const objectProduct = {
      product_id: product.product_id,
      price : 0 ,
      discountPercentage: 0,
      quantity: product.quantity
    };
    const productInfo = await Product.findOne({
      _id: product.product_id
    });

    objectProduct.price = productInfo.price;
    objectProduct.discountPercentage = productInfo.discountPercentage;

    products.push(objectProduct);
   }
const objectOrder = {
    
  cart_id: cartId,
  userInfo: userInfo,
  products: products
  }

const order = new Order(objectOrder);
await order.save();
await Cart.updateOne({
  _id: cartId 
},{
  products: []
})
   res.redirect(`/checkout/success/${order.id}`);
}

// [get] /checkout/success/:id

module.exports.success = async (req, res) => {
  const order = await Order.findOne({
    _id: req.params.orderId
  })

for (const product of order.products){
  const productInfo = await Product.findOne({
    _id: product.product_id
  }).select("title thumbnail");
  console.log(productInfo);
  product.productInfo = productInfo;
 product.priceNew = productsHelper.priceNewProduct(product);
 product.totalPrice = product.priceNew * product.quantity;
}

order.totalPrice = order.products.reduce((sum,item) => {
  return sum + item.totalPrice;
}, 0);

  res.render("client/pages/checkout/success", {
    pageTitle: "Đặt hàng thành công",
    order: order
  });
}