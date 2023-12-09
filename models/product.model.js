const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    
title: String,
description: String,
price: Number,
discountPercentage: Number,
stock: Number,
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

const Product = mongoose.model("Product", productSchema, "products"); //Product là tên của model này, productSchema là tên của định dạng,  products là tên trong mongodb

module.exports = Product;  // chỉ export cái thằng Product