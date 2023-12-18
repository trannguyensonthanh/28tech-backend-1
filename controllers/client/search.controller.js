const Product = require("../../models/product.model")
const productsHelper = require("../../helpers/products")
// [get] /search
module.exports.index = async (req, res) => {
 
const keyword = req.query.keyword;
let newProducts = []
if (keyword){
  const keywordRegex = new RegExp(keyword, "i");
  const products = await Product.find({
    title: keywordRegex,
    deleted: false,
    status: "active"
  })
  newProducts = productsHelper.priceNewProducts(products);

}
res.render("client/pages/search/index.pug", {
  pageTitle : "Kết quả tìm kiếm",
  keyword: keyword,
  newProducts: newProducts
});
}