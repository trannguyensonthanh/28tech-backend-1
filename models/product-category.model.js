const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productCategorySchema = new mongoose.Schema({
    
title: String,
parent_id: {
  type: String,
  default: ""
},
description: String,
thumbnail: String,
status: String,
position: Number,
slug: { type: String, slug: "title", unique: true },
deleted: {
  type: Boolean,
  default: false
},
deletedAt: Date
}, {
  timestamps: true
});

const ProductCategory = mongoose.model("ProductCategory", productCategorySchema, "products-category"); //ProductCategory là tên của model này, productCategorySchema là tên của định dạng,  products-category là tên trong mongodb

module.exports = ProductCategory;  // chỉ export cái thằng ProductCategory
