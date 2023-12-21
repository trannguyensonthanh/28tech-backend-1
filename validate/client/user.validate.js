module.exports.registerPost = (req, res, next) => {
  if (!req.body.fullName){
    req.flash("error", 'Vui lòng nhập Họ tên!');
    res.redirect("back"); 
     return;
  }
  if (!req.body.email){
    req.flash("error", 'Vui lòng nhập Email!');
    res.redirect("back"); 
     return;
  }
  if (!req.body.password){
    req.flash("error", 'Vui lòng nhập Mật Khẩu!');
    res.redirect("back"); 
     return;
  }
  next();
}

module.exports.loginPost = (req, res, next) => {
  if (!req.body.email){
    req.flash("error", 'Vui lòng nhập Email!');
    res.redirect("back"); 
     return;
  }
  if (!req.body.password){
    req.flash("error", 'Vui lòng nhập Mật Khẩu!');
    res.redirect("back"); 
     return;
  }
  next();
}

module.exports.forgotPasswordPost = (req, res, next) => {
  if (!req.body.email){
    req.flash("error", 'Vui lòng nhập Email!');
    res.redirect("back"); 
     return;
  }
  next();
}


module.exports.resetPasswordPost = (req, res, next) => {
  if (!req.body.password){
    req.flash("error", 'Vui lòng nhập mật khẩu mới');
    res.redirect("back"); 
     return;
  }

  if (!req.body.confirmPassword){
    req.flash("error", 'Vui lòng nhập mật khẩu mới');
    res.redirect("back"); 
     return;
  }

  if (req.body.confirmPassword != req.body.password){
    req.flash("error", 'xác nhận mật khẩu không trùng khớp');
    res.redirect("back"); 
     return;
  }
  next();
}