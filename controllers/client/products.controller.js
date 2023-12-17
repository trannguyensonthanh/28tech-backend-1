const Product = require("../../models/product.model")
const ProductCategory = require("../../models/product-category.model")
const productsHelper = require("../../helpers/products")
const productsCategoryHelper = require("../../helpers/products-category")

// [get] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false,

    }).sort({position: "desc"});
    const newProducts = productsHelper.priceNewProducts(products);
    // thêm một biến vào từng object sử dụng forEach để thay đổi mảng
    res.render("client/pages/products/index.pug", {
        pageTitle: "danh sách sản phẩm",
        products: newProducts
    })
} 

// [get] /products/:slugProduct
module.exports.detail = async (req, res) => {
  
    try { 
const find = {
    deleted: false,
    slug: req.params.slugProduct,
    status: "active"
}
 const product = await Product.findOne(find);

if(product.product_category_id) {
    const category = await ProductCategory.findOne({
        _id: product.product_category_id,
        status: "active",
        deleted: false
    });
    product.category = category
}

 product.priceNew = productsHelper.priceNewProduct(product);

 
 res.render("client/pages/products/detail", {
    pageTitle: "Chi tiết sản phẩm",
    product: product
})
    } catch(error) {
    
 res.redirect(`/products`);
    }
    
   
}

// [get] /products/:slugCategory

module.exports.category = async (req, res) => {
    try {
         const slug = req.params.slugCategory;
  const category = await ProductCategory.findOne({
    deleted: false,
    status: "active",
    slug: slug
  });
  const category_id = category.id;

 const listSubCategory = await productsCategoryHelper.getSubCategory(category_id);
const listSubCategoryId = listSubCategory.map(sub => {
    return sub.id;
})
  const productsInCategory = await Product.find({
    deleted: false,
    status: "active", 
    product_category_id: { $in: [category_id, ...listSubCategoryId] },
  }).sort({position: "desc"});

  const newProducts = productsHelper.priceNewProducts(productsInCategory);
  res.render("client/pages/products/index", {
    pageTitle: category.title,
    products: newProducts
})
    }
    catch(error){
       res.redirect("back")
    }  
}