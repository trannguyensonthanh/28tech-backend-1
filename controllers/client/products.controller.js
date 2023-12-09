const Product = require("../../models/product.model")

module.exports.index = async (req, res) => {
    const products = await Product.find({
        
    });
    products.forEach(item => {
        item.priceNew = (item.price * ((100 - item.discountPercentage)/100)).toFixed(0);
    })
    // thêm một biến vào từng object sử dụng forEach để thay đổi mảng
    res.render("client/pages/products/index.pug", {
        pageTitle: "danh sách sản phẩm",
        products: products
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