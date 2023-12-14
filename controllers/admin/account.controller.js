const Account = require("../../models/account.model")
var md5 = require('md5');
const Role = require("../../models/role.model")
const systemConfig = require("../../config/system");
//[get] /admin/accounts
module.exports.index = async (req, res) => {

  const find = {
    deleted: false
  }
const records = await Account.find(find).select("-password -token");

for (const record of records){
  const role = await Role.findOne({
    deleted: false,
    _id: record.role_id
  })
  record.role = role.title;
}

  res.render("admin/pages/account/index.pug", {
     pageTitle: "Trang quản lí tài khoản",
     records: records
     
  })
}

//[get] /admin/accounts/create
module.exports.create = async (req, res) => {
const roles = await Role.find({
  deleted: false
})
  res.render("admin/pages/account/create.pug", {
     pageTitle: "tạo mới tài khoản",
     roles: roles
  })
}

//[post] /admin/accounts/create
module.exports.createPost = async (req, res) => {

  const emailExist = await Account.findOne({
    deleted: false,
    email: req.body.email
  })

if (emailExist) {
req.flash("error", `Email ${req.body.email} đã tồn tại`)
res.redirect("back");
}
else {
  req.body.password = md5(req.body.password);
const record = new Account(req.body);
await record.save();
res.redirect(`${systemConfig.prefixAdmin}/accounts`)
}

}

//[get] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
 try {
const id = req.params.id;
  const find = {
    deleted: false
  }
  if (id){
    find._id = id;
  }
  const roles = await Role.find({deleted: false})
  const records = await Account.findOne(find);
    res.render("admin/pages/account/edit.pug", {
       pageTitle: "chỉnh sửa tài khoản",
       roles: roles,
       records: records
    })
 } catch (error){
res.redirect(`${systemConfig.prefixAdmin}/accounts`)
 }

  }

//[patch] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
 const emailExist = await Account.findOne({
  deleted: false,
  email: req.body.email,
  _id: { $ne: id }
 })


if (emailExist){
  req.flash("error", `Email ${req.body.email} đã tồn tại!`)
}
else {
  if (req.body.password){
   req.body.password = md5(req.body.password);
  }
  else {
  delete req.body.password;
  }
  await Account.updateOne({_id: id}, req.body);
  req.flash("success", "cập nhật thành công")
}
    res.redirect("back");
  }

