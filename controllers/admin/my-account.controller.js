const Account = require("../../models/account.model")
var md5 = require('md5');
//[GET] /admin/my-account
module.exports.index = (req, res) => {
  res.render("admin/pages/my-account/index.pug", {
     pageTitle: "trang tài khoản của tôi"
  })
}

//[GET] /admin/my-account/edit
module.exports.edit = (req, res) => {
  res.render("admin/pages/my-account/edit.pug", {
     pageTitle: "chỉnh sửa trang thông tin"
  })
}

//[PATCH] /admin/my-account/edit
module.exports.editPatch = async (req, res) => {
 const id = res.locals.user.id
  const emailExist = await Account.findOne({
    deleted: false,
    email: req.body.email,
    _id: { $ne: id }
   })
  
  
  if (emailExist){
    req.flash("error", `Email ${req.body.email} đã tồn tại!`)
  }
 else {
  if (req.body.password == '') {
  delete password;
}
else {
  req.body.password = md5(req.body.password);
}

await Account.updateOne({_id: id} , req.body)
 }


 res.redirect("back")
}