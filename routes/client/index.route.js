
const productRoutes = require("../client/products.route")
const homeRoutes = require("../client/home.route")

  module.exports = (app) => {

    app.use('/', homeRoutes);
  app.use('/products', productRoutes);
  
  }