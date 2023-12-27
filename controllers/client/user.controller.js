const User = require("../../models/user.model")
const Cart = require("../../models/cart.model")
const ForgotPassword = require("../../models/forgot-password.model")
const generateHelper = require("../../helpers/generate")
const sendMailHelper = require("../../helpers/sendMail")
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

await User.updateOne({
  _id: user.id
},{
  statusOnline: "online"
});

_io.once("connection", (socket) => {
  // người dùng gửi yêu cầu kết bạn
  socket.broadcast.emit("SERVER_RETURN_USER_ONLINE", user.id);
});

// lưu user_id vào carts
await Cart.updateOne({
  _id: req.cookies.cartId
}, {
  user_id: user.id
});
res.redirect("/");

  }

  //[get] /user/logout
module.exports.logout = async (req, res) => {
  const userId = res.locals.user.id;
  await User.updateOne({
    _id: userId
  },{
    statusOnline: "offline"
  })
  _io.once("connection", (socket) => {
    // người dùng gửi yêu cầu kết bạn
    socket.broadcast.emit("SERVER_RETURN_USER_OFFFLINE", userId);
  });

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

// gửi email
const subject = `Mã OTP ĐỂ XÁC MINH LẤY LẠI MẬT KHẨU`
const html = `Mã OTP ĐỂ XÁC MINH LẤY LẠI MẬT KHẨU LÀ <b>${otp}</b>. Thời hạn sử dụng: 3 phút . Lưu ý không được để lộ OTP `;
sendMailHelper.sendMail(email, subject, html );
// end gửi email

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

    //[get] /user/info
module.exports.info = async (req, res) => {
  res.render("client/pages/user/info", {
    pageTitle: "thông tin tài khoản"
  })
  }