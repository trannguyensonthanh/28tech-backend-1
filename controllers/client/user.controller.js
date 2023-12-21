const User = require("../../models/user.model")
const ForgotPassword = require("../../models/forgot-password.model")
const generateHelper = require("../../helpers/generate")
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
  
  //[get] user/password/forgotPassword
module.exports.forgotPassword = async (req, res) => {
  res.render("client/pages/user/forgot-password", {
    pageTitle: "Lấy lại mật khẩu"
  })
  }

  //[post] user/password/forgotPasswordPost
module.exports.forgotPasswordPost = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({
    email: email,
    deleted: false
    
  })

  if (!user) {
    req.flash("error", "Email không tồn tại!");
    res.redirect("back");
    return;
  }
const otp = generateHelper.generateRandomNumber(8)
const objectForgotPassword = {
  email: email,
  otp: otp,
  expireAt: Date.now()
}
const forgotPassword = new ForgotPassword(objectForgotPassword);
await forgotPassword.save();

res.redirect(`/user/password/otp?email=${email}`);
  }

    //[get] user/password/otp
module.exports.otpPassword = async (req, res) => {
const  email = req.query.email;
  res.render("client/pages/user/otp-password", {
    pageTitle: "Nhập mã OTP",
    email: email,
  });
  };

    //[post] user/password/otp
module.exports.otpPasswordPost = async (req, res) => {
const  email = req.body.email;
const otp = req.body.otp;
const result = await ForgotPassword.findOne({
  email: email,
  otp: otp
});

if (!result){
  req.flash("error", `OTP!`);
  res.redirect("back");
  return;
}

const user = await User.findOne({
  email: email
});
res.cookie("tokenUser", user.tokenUser);

  res.redirect("/user/password/reset");
  };

      //[get] user/password/reset
module.exports.resetPassword = async (req, res) => {

    res.render("client/pages/user/reset-password", {
      pageTitle: "Đổi mật khậu",

    });
    };

      //[post] user/password/reset
module.exports.resetPasswordPost = async (req, res) => {
const password = req.body.password;
const tokenUser= req.cookies.tokenUser;
await User.updateOne({
  tokenUser: tokenUser
},{
  password: md5(password)
})
    res.redirect("/");
    };