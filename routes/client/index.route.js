
const productRoutes = require("../client/products.route")
const homeRoutes = require("../client/home.route")
const searchRoutes = require("../client/search.route")
const cartRoutes = require("../client/cart.route")
const checkoutRoutes = require("../client/checkout.route")
const userRoutes = require("../client/user.route")
const chatRoutes = require("../client/chat.route")
const usersRoutes = require("../client/users.route")
const roomsChatRoutes = require("../client/rooms-chat.route")
const categoryMiddleware = require("../../middlewares/client/category.middleware")
const settingMiddleware = require("../../middlewares/client/setting.middleware")
const userMiddleware = require("../../middlewares/client/user.middleware")
const cartMiddleware = require("../../middlewares/client/cart.middleware")
const authMiddleware = require("../../middlewares/client/auth.middleware")
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
  app.use('/users',authMiddleware.requireAuth, usersRoutes);
  app.use('/chat',authMiddleware.requireAuth , chatRoutes);
  app.use('/rooms-chat',authMiddleware.requireAuth , roomsChatRoutes);
  
  }