const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helpers/createTree");
const ProductCategory = require("../../models/product-category.model");
const Account = require("../../models/account.model");
// [GET] /admin/products
module.exports.index = async (req, res) => {
  // đoạn bộ lọc
  const filterStatus = filterStatusHelper(req);
  const objectSearch = searchHelper(req, req.query.keyword);
  let find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
  }

  // đoạn tìm kiếm
  if (objectSearch.title) {
    find.title = objectSearch.title;
  }

  // pagination
  const countProducts = await Product.countDocuments(find); // sử dụng countDoc.. để đếm só lượng những sản phẩm được phép hiển thị
  let objectPagination = paginationHelper(
    {
      limitItems: 4,
      currentPage: 1,
    },
    req,
    countProducts
  );

  // sort
  let sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = "desc";
  }
  //end sort

  // if (req.query.page ){
  //   objectPagination.currentPage = parseInt(req.query.page);
  // }
  // objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems
  // const countProducts = await Product.countDocuments(find);  // sử dụng countDoc.. để đếm só lượng những sản phẩm được phép hiển thị
  // const totalPage = Math.ceil(countProducts/objectPagination.limitItems)
  // objectPagination.totalPage = totalPage;
  //end pagination

  const products = await Product.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

  for (const product of products) {
    // lấy ra thông tin người tạo
    const user = await Account.findOne({
      _id: product.createdBy.account_id,
    });
    if (user) {
      product.accountFullName = user.fullName;
    }

    // lấy ra thông tin người cập nhật
    const sizeProducts = product.updatedBy.length - 1
   const updatedBy = product.updatedBy[sizeProducts]
    if (updatedBy){
        const userUpdated = await Account.findOne({
      _id: updatedBy.account_id,
    });
    updatedBy.accountFullName = userUpdated.fullName;
    }
  }

  // const dataSearch = req.query.keyword; // cách cũ

  // if (dataSearch != undefined) {
  //   var searchProduct = products.filter(item => {
  //   return item.title.toLowerCase().includes(dataSearch.toLowerCase())
  // })
  // }
  // else {
  //   searchProduct = products;
  // }

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    items: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};

//[PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  const updatedBy = {
    account_id: res.locals.user.id,
    updatedAt: new Date()
  } 
  await Product.updateOne({ _id: id }, {
    status: status,
    $push: {updatedBy : updatedBy}
  });
  req.flash("success", "Cập nhật trạng thái thành công");
  res.redirect("back");
};

//[PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");

  const updatedBy = {
    account_id: res.locals.user.id,
    updatedAt: new Date()
  } 

  switch (type) {
    case "active":
      await Product.updateMany({ _id: ids }, { 
        status: "active",
        $push: {updatedBy : updatedBy}
    });
      req.flash(
        "success",
        `Cập nhật trạng thái thành công ${ids.length} sản phẩm`
      );
      break;
    case "inactive":
      await Product.updateMany({ _id: ids }, { 
        status: "inactive", 
        $push: {updatedBy : updatedBy}
      });
      req.flash(
        "success",
        `Cập nhật trạng thái thành công ${ids.length} sản phẩm`
      );
      break;
    case "delete-all":
      await Product.updateMany(
        { _id: ids },
        { deleted: true, 
          deletedBy: {
          account_id: res.locals.user.id,
          deletedAt: new Date()
        }
       },
      );
      break;
    case "change-position":
      console.log(ids);
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await Product.updateOne({ _id: id }, {
          position: position,
          $push: {updatedBy : updatedBy}
        });
      }
      break;
    default:
      break;
  }
  res.redirect("back");
};

//[DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  // await Product.deleteOne({ _id: id });
  await Product.updateOne(
    { _id: id },
    { deleted: true, 
      deletedBy: {
        account_id: res.locals.user.id,
        deletedAt: new Date()
      }
    }
  );
  res.redirect("back");
};

// [get] /admin/products/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };

  const category = await ProductCategory.find(find);
  const newCategory = createTreeHelper.tree(category);
  res.render("admin/pages/products/create", {
    pageTitle: "Thêm mới sản phẩm",
    newCategory: newCategory,
  });
};

// [post] /admin/products/create
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);

  if (req.body.position == "") {
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  req.body.createdBy = {
    account_id: res.locals.user.id,
  };

  const product = new Product(req.body);
  await product.save();
  res.redirect(`${systemConfig.prefixAdmin}/products`);
};

// [get] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const findCate = {
      deleted: false,
    };

    const find = {
      deleted: false,
      _id: req.params.id,
    };

    const category = await ProductCategory.find(findCate);
    const newCategory = createTreeHelper.tree(category);
    const product = await Product.findOne(find);

    res.render("admin/pages/products/edit.pug", {
      pageTitle: "chỉnh sửa sản phẩm",
      product: product,
      newCategory: newCategory,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};

// [patch] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);

  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }
  try {
    const updatedBy = {
      account_id: res.locals.user.id,
      updatedAt: new Date()
    } 

    await Product.updateOne({ _id: req.params.id }, 
      {
        ...req.body,
        $push: {updatedBy : updatedBy}
      });
    req.flash("success", "cập nhật thành công!");
  } catch (error) {
    req.flash("error", "cập nhật thất bại!");
  }
  res.redirect("back");
};

// [get] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };

    const product = await Product.findOne(find);
    res.render("admin/pages/products/detail.pug", {
      pageTitle: "Chi tiết sản phẩm",
      product: product,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};
