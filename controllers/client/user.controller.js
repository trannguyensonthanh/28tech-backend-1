const User = require("../../models/user.model")
const md5 = require("md5");
//[get] /user/register
module.exports.register = async (req, res) => {
res.render("client/pages/user/register", {
  pageTitle: "Đăng kí tài khoản"
})
}

//[post] /user/register
module.exports.registerPost = async (req, res) => {
  const existEmail = await User.findOne({
    email: req.body.email,
    deleted: false
  })
if (existEmail) {
  req.flash("error", "email đã tồn tại")
  res.redirect("back");
  return;
}
req.body.password = md5(req.body.password);
const user = new User(req.body);
await user.save();
res.cookie("tokenUser", user.tokenUser); 
res.redirect("/");

res.send("ok")
}

//[get] /user/login
module.exports.login = async (req, res) => {
  res.render("client/pages/user/login", {
    pageTitle: "Đăng nhập tài khoản"
  })
  }
  
//[post] /user/login
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({
    email: email,
    deleted: false
  });

  if (!user) {
    req.flash("error", "email không tồn tại")
    res.redirect("back");
    return;
  }

if (md5(password) != user.password){
  req.flash("error", "sai mật khẩu")
  res.redirect("back");
  return;
}

if (user.status == "inactive"){
  req.flash("error", "Tài khoản đã bị khóa")
  res.redirect("back");
  return;
}

res.cookie("tokenUser", user.tokenUser);
res.redirect("/");

  }

  //[get] /user/logout
module.exports.logout = async (req, res) => {
res.clearCookie("tokenUser")

  res.redirect("/")
  }
  