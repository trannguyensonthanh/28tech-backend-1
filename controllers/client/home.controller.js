const Product = require("../../models/product.model")
const productsHelper = require("../../helpers/products")
// [get] 
module.exports.index = async (req, res) => {
   // lấy ra sản phẩm nổi bật
 const productsFeatured = await Product.find({
    featured: "1",
    deleted: false,
    status: "active"
 });
   // end lấy ra sp nổi bật
  const newProducts = productsHelper.priceNewProducts(productsFeatured);
   
    res.render("client/pages/home/index.pug", {
        pageTitle : "Trang chủ",
        productsFeatured: newProducts
    });
}