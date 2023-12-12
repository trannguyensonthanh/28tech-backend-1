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