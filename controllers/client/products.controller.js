const Product = require("../../models/product.model")
const productsHelper = require("../../helpers/products")
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

// [get] /products/:slug

module.exports.detail = async (req, res) => {
    try {
const find = {
    deleted: false,
    slug: req.params.slug,
    status: "active"
}
 const product = await Product.findOne(find);
 console.log(product);
 res.render("client/pages/products/detail", {
    pageTitle: "Chi tiết sản phẩm",
    product: product
})
    } catch(error) {
 res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
    
   
}