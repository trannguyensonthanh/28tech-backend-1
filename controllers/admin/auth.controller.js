const Account = require("../../models/account.model");
var md5 = require('md5');
const systemConfig = require("../../config/system");
// [get] /admin/auth/login
module.exports.login = (req, res) => {
  if(req.cookies.token){
    res.redirect(`${systemConfig.prefixAdmin}/dashboard/`)
  }
  else {
res.render("admin/pages/auth/login.pug", {
     pageTitle: "Trang đăng nhập"
  })
  }
}

// [post] /admin/auth/login
module.exports.loginPost = async (req, res) => {
 const email = req.body.email;
 const password = req.body.password;
 const user = await Account.findOne({
  email: email,
  deleted: false
 })
if (!user) {
  req.flash("error", `Email ${email} không tồn tại`)
  res.redirect("back");
  return;
}
if (md5(password) != user.password){
  req.flash("error", "Sai mật khẩu!");
  res.redirect("back")
  return;
}

if (user.status == "inactive"){
  req.flash("error", "tài khoản của bạn đã bị khóa");
  res.redirect("back")
  return;
}
res.cookie("token", user.token);
 res.redirect(`${systemConfig.prefixAdmin}/dashboard/`)
}

// [get] /admin/auth/logout
module.exports.logout = (req, res) => {
  res.clearCookie("token");
 res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
}