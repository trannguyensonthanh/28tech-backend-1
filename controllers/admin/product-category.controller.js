
// [get] /admin/products-category
const ProductCategory = require("../../models/product-category.model")
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helpers/createTree");
module.exports.index = async (req, res) => {
  let find = {
    deleted : false
  }

  const records = await ProductCategory.find(find);

  const newRecords = createTreeHelper.tree(records);
  
  
   res.render ("admin/pages/products-category/index", {
      pageTitle: "Danh mục sản phẩm",
      records : newRecords,
   });
}

// [get] /admin/products-category/create
module.exports.create = async (req, res) => {
let find = {
  deleted: false
}

const records = await ProductCategory.find(find);

const newRecords = createTreeHelper.tree(records);



  res.render("admin/pages/products-category/create", {
    pageTitle: "Tạo danh mục sản phẩm",
    records: newRecords
  })
}

// [post] /admin/products-category/create
module.exports.createPost = async (req, res) => {
// kiểm tra phân quyền bên backend
const permissions = res.locals.role.permissions;
if (permissions.includes("products-category_create")){
  if (req.body.position == ""){
    const count = await ProductCategory.countDocuments();
    req.body.position = count + 1;
  }
  else {
    req.body.position = parseInt(req.body.position);
  }
  
  const record = new ProductCategory(req.body);
  await record.save();
} else {
 return;
}
res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}

// [get] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
try {
 let find = {
    deleted: false
  }
  let findDetail = {
    deleted: false
  }
  if (req.params) {
    findDetail._id = req.params.id
  }

  const records = await ProductCategory.find(find);
  const newRecords = createTreeHelper.tree(records);
  const recordDetail = await ProductCategory.findOne(findDetail);
    res.render("admin/pages/products-category/edit.pug", {
      pageTitle: "Tạo danh mục sản phẩm",
      records: newRecords,
      recordDetail: recordDetail,
    })
} catch (error){
  res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}
 
  }

// [PATCH] /admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  try {
 req.body.position = parseInt(req.body.position);
  await ProductCategory.updateOne({_id: id }, req.body);
  res.redirect("back")
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
  }
 
  }
  
