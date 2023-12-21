const User = require("../../models/user.model");
module.exports.requireAuth = async (req, res, next) => {
  if (!req.cookies.tokenUser) {
    res.redirect("/user/login");
    return;
  } 
    // lấy cookies từ link req
    const user = await User.findOne({ tokenUser: req.cookies.tokenUser }).select(
      "-password"
    );
    if (!user) {
      res.redirect("/user/login");
      return;
    } 
      next(); 
  
};
