const Role = require("../../models/role.model")
const systemConfig = require("../../config/system")
//[get]  /admin/roles
module.exports.index = async (req, res) => {

let find = {
  deleted: false
}
 const records = await Role.find(find);
  res.render("admin/pages/roles/index.pug", {
     pageTitle: "Nhóm quyền",
     records: records
  })
}

//[get]  /admin/roles/create
module.exports.create = async (req, res) => {

  res.render("admin/pages/roles/create", {
     pageTitle: "Tạo nhóm quyền",
   
  })
}

//[post]  /admin/roles/create
module.exports.createPost = async (req, res) => {

const record = new Role(req.body)
await record.save();
res.redirect(`${systemConfig.prefixAdmin}/roles`)
}

//[get]  /admin/roles/create
module.exports.edit = async (req, res) => {
try {
const find = {
  deleted: false
}
if (req.params.id) {
  find._id = req.params.id;
}
const records = await Role.findOne(find)

  res.render("admin/pages/roles/edit", {
     pageTitle: "Chỉnh sửa nhóm quyền",
     records : records
  })
} catch (error) {
  res.redirect(`${systemConfig.prefixAdmin}/roles`)
}

}

//[patch]  /admin/roles/create
module.exports.editPatch = async (req, res) => {
try {
if (req.params.id) {
await Role.updateOne({_id: req.params.id}, req.body)
}
req.flash("success", "cập nhật nhóm quyền thành công")

} catch (error) {
  req.flash("error", "cập nhậy nhóm quyền thất bại")
}
res.redirect("back")

}

//[get]  /admin/roles/permissions
module.exports.permissions = async (req, res) => {
let find = {
  deleted: false
}
const records = await Role.find(find);
res.render("admin/pages/roles/permissions", {
  pageTitle: "Phân quyền",
  records : records
})
}

//[patch]  /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {

  try {
    const permissions = JSON.parse(req.body.permissions);
    
    for (const item of permissions) {
      await Role.updateOne({ _id: item.id }, { permissions: item.permissions });
    }
   req.flash("success", "cập nhật phân quyền thành công");
    res.redirect("back");
  } catch (error) {
    req.flash ("error", "cập nhật phân quyền thất bại!");
    res.status(500).send('Internal Server Error');
  }
}