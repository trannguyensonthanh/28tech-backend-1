const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    
title: String,
product_category_id: {
  type: String,
  default: ""
},
description: String,
price: Number,
discountPercentage: Number,
stock: Number,
thumbnail: String,
status: String,
featured: String,
position: Number,
slug: { type: String, slug: "title", unique: true },
createdBy: {
  account_id: String,
  createdAt: {
    type: Date,
    default: Date.now // hàm để lấy ra thời gian hiện tại
  }
},
deleted: {
  type: Boolean,
  default: false
},
deletedBy: {
  account_id: String,
  deletedAt: Date
},
updatedBy: [
  {
    account_id: String,
    updatedAt: Date,
  },
]
}, {
  timestamps: true
});

const Product = mongoose.model("Product", productSchema, "products"); //Product là tên của model này, productSchema là tên của định dạng,  products là tên trong mongodb

module.exports = Product;  // chỉ export cái thằng Product
