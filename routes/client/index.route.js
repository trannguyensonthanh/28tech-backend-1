
const productRoutes = require("../client/products.route")
const homeRoutes = require("../client/home.route")
const searchRoutes = require("../client/search.route")
const cartRoutes = require("../client/cart.route")
const checkoutRoutes = require("../client/checkout.route")
const userRoutes = require("../client/user.route")
const categoryMiddleware = require("../../middlewares/client/category.middleware")
const settingMiddleware = require("../../middlewares/client/setting.middleware")
const userMiddleware = require("../../middlewares/client/user.middleware")
const cartMiddleware = require("../../middlewares/client/cart.middleware")
  module.exports = (app) => {
   app.use(categoryMiddleware.category)
   app.use(cartMiddleware.cartId)
   app.use(userMiddleware.infoUser)
   app.use(settingMiddleware.settingGeneral);
    app.use('/', homeRoutes);
  app.use('/products', productRoutes);
  app.use('/search', searchRoutes);
  app.use('/cart', cartRoutes);
  app.use('/checkout', checkoutRoutes);
  app.use('/user', userRoutes);
  
  }