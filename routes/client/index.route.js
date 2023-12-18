
const productRoutes = require("../client/products.route")
const homeRoutes = require("../client/home.route")
const searchRoutes = require("../client/search.route")
const categoryMiddleware = require("../../middlewares/client/category.middleware")
  module.exports = (app) => {
   app.use(categoryMiddleware.category)
    app.use('/', homeRoutes);
  app.use('/products', productRoutes);
  app.use('/search', searchRoutes);
  
  }