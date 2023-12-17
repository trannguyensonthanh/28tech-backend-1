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

 const newProductsFeatured = productsHelper.priceNewProducts(productsFeatured);
   // end lấy ra sp nổi bật

   // hiển thị danh sách sản phẩm mới nhất

const productsNew = await Product.find({
  deleted: false,
  status: "active"
}).sort({position: "desc"}).limit(6);
const newProductsNew = productsHelper.priceNewProducts(productsNew);
   // hết hiển thị danh sách sản phẩm mới nhất


    res.render("client/pages/home/index.pug", {
        pageTitle : "Trang chủ",
        productsFeatured: newProductsFeatured,
        productsNew: newProductsNew
    });
}