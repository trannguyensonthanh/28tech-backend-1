
const productRoutes = require("../client/products.route")
const homeRoutes = require("../client/home.route")
const searchRoutes = require("../client/search.route")
const cartRoutes = require("../client/cart.route")
const categoryMiddleware = require("../../middlewares/client/category.middleware")
const cartMiddleware = require("../../middlewares/client/cart.middleware")
  module.exports = (app) => {
   app.use(categoryMiddleware.category)
   app.use(cartMiddleware.cartId)
    app.use('/', homeRoutes);
  app.use('/products', productRoutes);
  app.use('/search', searchRoutes);
  app.use('/cart', cartRoutes);
  
  }